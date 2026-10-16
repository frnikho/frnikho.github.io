import { createFileRoute } from "@tanstack/react-router";
import { blogCategories } from "@/content/blog";
import { buildBlogSitemapEntries } from "@/features/blog/feeds";
import { visibleSummaries } from "@/features/blog/repository.server";
import { renderSitemap } from "@/lib/sitemap";

/**
 * Sitemap du blog, séparé du sitemap statique des pages (`public/sitemap.xml`)
 * et calculé à chaque requête pour suivre les publications programmées.
 */
export const Route = createFileRoute("/sitemap-blog.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(
					renderSitemap(
						buildBlogSitemapEntries(visibleSummaries(), blogCategories),
					),
					{
						headers: {
							"Content-Type": "application/xml; charset=utf-8",
							"Cache-Control": "public, max-age=3600",
						},
					},
				),
		},
	},
});
