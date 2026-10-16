import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { z } from "zod";
import { assetUrl, BLOG_CONTENT_DIR } from "./src/features/blog/assets";
import { extractToc, readingTime } from "./src/features/blog/posts";
import { remarkBlogAssets } from "./src/features/blog/remark-assets";
import { postFrontmatterSchema, SLUG_PATTERN } from "./src/features/blog/schema";

/** Un article par dossier : `content/blog/<slug>/index.mdx`, images à côté. */
const posts = defineCollection({
	name: "posts",
	directory: BLOG_CONTENT_DIR,
	include: "*/index.mdx",
	// Corps MDX déclaré explicitement (content-collections ne l'ajoute plus implicitement).
	schema: z.intersection(
		postFrontmatterSchema,
		z.object({ content: z.string() }),
	),
	transform: async (document, context) => {
		const slug = document._meta.directory;
		if (!SLUG_PATTERN.test(slug)) {
			throw new Error(
				`[blog] dossier « ${slug} » : minuscules, chiffres et tirets uniquement`,
			);
		}
		const mdx = await compileMDX(context, document, {
			remarkPlugins: [[remarkBlogAssets, { slug }]],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypePrettyCode,
					{ theme: "github-dark-dimmed", defaultLang: "plaintext" },
				],
			],
		});
		return {
			...document,
			slug,
			mdx,
			toc: extractToc(document.content),
			readingTime: readingTime(document.content),
			cover: document.cover ? assetUrl(slug, document.cover) : undefined,
		};
	},
	onSuccess: (documents) => {
		// Un slug ou un alias en double rendrait une URL ambiguë : on refuse le build.
		const seen = new Map<string, string>();
		for (const doc of documents) {
			for (const key of [doc.slug, ...doc.aliases]) {
				const owner = seen.get(key);
				if (owner) {
					throw new Error(
						`[blog] « ${key} » est utilisé par « ${owner} » et « ${doc.slug} »`,
					);
				}
				seen.set(key, doc.slug);
			}
		}
	},
});

export default defineConfig({
	content: [posts],
});
