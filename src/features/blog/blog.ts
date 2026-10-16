import { createServerFn } from "@tanstack/react-start";
import {
	type PostSummary,
	paginate,
	relatedPosts,
	resolveAlias,
	type TocEntry,
} from "./posts";
import { renderPostHtml } from "./render.server";
import { toSummary, visiblePosts, visibleSummaries } from "./repository.server";

export const LATEST_POSTS = 3;
/** Articles listés sur l'accueil : un mis en avant, les autres en liste dense. */
export const HOME_POSTS = 8;

/** Entrées des server functions : appelables par n'importe qui, donc vérifiées. */
function asSlug(value: unknown): string {
	if (typeof value !== "string" || value.length > 120) {
		throw new Error("Paramètre invalide");
	}
	return value;
}

function asPage(value: unknown): number {
	if (typeof value !== "number") throw new Error("Paramètre invalide");
	return value;
}

export const getBlogPage = createServerFn({ method: "GET" })
	.validator(asPage)
	.handler(({ data: page }) => paginate(visibleSummaries(), page));

export const getHomePosts = createServerFn({ method: "GET" }).handler(
	(): PostSummary[] => visibleSummaries().slice(0, HOME_POSTS),
);

export const getCategoryPosts = createServerFn({ method: "GET" })
	.validator(asSlug)
	.handler(({ data: category }) =>
		visibleSummaries().filter((p) => p.category === category),
	);

export const getTagPosts = createServerFn({ method: "GET" })
	.validator(asSlug)
	.handler(({ data: tag }) =>
		visibleSummaries().filter((p) => p.tags.includes(tag)),
	);

export const getServicePosts = createServerFn({ method: "GET" })
	.validator(asSlug)
	.handler(({ data: service }) =>
		visibleSummaries()
			.filter((p) => p.service === service)
			.slice(0, LATEST_POSTS),
	);

export type PostPage =
	| {
			kind: "post";
			post: PostSummary & { html: string; toc: TocEntry[] };
			related: PostSummary[];
	  }
	| { kind: "redirect"; slug: string }
	| { kind: "missing" };

export const getPost = createServerFn({ method: "GET" })
	.validator(asSlug)
	.handler(({ data: slug }): PostPage => {
		const posts = visiblePosts();
		const post = posts.find((p) => p.slug === slug);
		if (!post) {
			const target = resolveAlias(slug, posts);
			return target ? { kind: "redirect", slug: target } : { kind: "missing" };
		}
		const summaries = posts.map(toSummary);
		return {
			kind: "post",
			post: {
				...toSummary(post),
				html: renderPostHtml(post.slug, post.mdx),
				toc: post.toc,
			},
			related: relatedPosts(toSummary(post), summaries),
		};
	});
