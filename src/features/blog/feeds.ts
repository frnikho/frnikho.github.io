import { type BlogCategory, getBlogCategory } from "@/content/blog";
import { SITE_URL } from "@/lib/seo";
import type { SitemapEntry } from "@/lib/sitemap";
import { type PostSummary, parisDay } from "./posts";

export const BLOG_TITLE = "Blog nikho.dev";
export const BLOG_DESCRIPTION =
	"Tutos, retours d'expérience, infos insolites et découvertes tech : le blog de Nicolas Sans, développeur et DevOps freelance.";
export const RSS_PATH = "/blog/rss.xml";
export const RSS_ITEMS = 20;

export const postUrl = (slug: string) => `${SITE_URL}/blog/${slug}`;

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

const lastModified = (p: PostSummary) => p.updatedAt ?? p.publishedAt;

/** Flux RSS 2.0 des derniers articles. `posts` : visibles, du plus récent au plus ancien. */
export function renderRss(posts: readonly PostSummary[]): string {
	const items = posts
		.slice(0, RSS_ITEMS)
		.map((p) => {
			const url = postUrl(p.slug);
			const category = getBlogCategory(p.category)?.name ?? p.category;
			return [
				"    <item>",
				`      <title>${escapeXml(p.title)}</title>`,
				`      <link>${url}</link>`,
				`      <guid isPermaLink="true">${url}</guid>`,
				`      <description>${escapeXml(p.description)}</description>`,
				`      <category>${escapeXml(category)}</category>`,
				`      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>`,
				"    </item>",
			].join("\n");
		})
		.join("\n");
	const lastBuild = posts[0]
		? `\n    <lastBuildDate>${new Date(lastModified(posts[0])).toUTCString()}</lastBuildDate>`
		: "";
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>fr-FR</language>
    <atom:link href="${SITE_URL}${RSS_PATH}" rel="self" type="application/rss+xml" />${lastBuild}
${items}
  </channel>
</rss>
`;
}

/**
 * Entrées du sitemap du blog : l'accueil du blog, les catégories non vides et
 * les articles. Les pages de pagination et de tags n'y figurent pas (tags en
 * `noindex`, pagination découverte par les liens).
 */
export function buildBlogSitemapEntries(
	posts: readonly PostSummary[],
	categories: readonly BlogCategory[],
): SitemapEntry[] {
	if (posts.length === 0) return [];
	const latest = (list: readonly PostSummary[]) =>
		parisDay(
			list.map(lastModified).reduce((a, b) => (a > b ? a : b), "0000-00-00"),
		);

	const home = {
		loc: `${SITE_URL}/blog`,
		lastmod: latest(posts),
		priority: "0.8",
	};
	const categoryPages = categories.flatMap((c) => {
		const inCategory = posts.filter((p) => p.category === c.slug);
		return inCategory.length === 0
			? []
			: [
					{
						loc: `${SITE_URL}/blog/categorie/${c.slug}`,
						lastmod: latest(inCategory),
						priority: "0.6",
					},
				];
	});
	const articles = posts.map((p) => ({
		loc: postUrl(p.slug),
		lastmod: parisDay(lastModified(p)),
		priority: "0.7",
	}));
	return [home, ...categoryPages, ...articles];
}
