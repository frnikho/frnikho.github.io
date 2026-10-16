import { allPosts, type Post } from "content-collections";
import { type PostSummary, publishedPosts } from "./posts";

/**
 * Seul point d'accès au contenu compilé : il reste côté serveur, le bundle
 * client ne grossit pas avec le nombre d'articles. Les brouillons et articles
 * programmés ne sont visibles qu'en développement.
 */
export function visiblePosts(now = new Date()): Post[] {
	return publishedPosts(allPosts, now, import.meta.env.DEV);
}

export function toSummary(post: Post): PostSummary {
	return {
		slug: post.slug,
		title: post.title,
		seoTitle: post.seoTitle,
		description: post.description,
		category: post.category,
		tags: post.tags,
		publishedAt: post.publishedAt,
		updatedAt: post.updatedAt,
		readingTime: post.readingTime,
		service: post.service,
		cover: post.cover,
		coverAlt: post.coverAlt,
	};
}

export const visibleSummaries = (now = new Date()): PostSummary[] =>
	visiblePosts(now).map(toSummary);
