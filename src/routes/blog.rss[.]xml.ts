import { createFileRoute } from "@tanstack/react-router";
import { renderRss } from "@/features/blog/feeds";
import { visibleSummaries } from "@/features/blog/repository.server";

/** Calculé à chaque requête : un article programmé y apparaît le jour venu. */
export const Route = createFileRoute("/blog/rss.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(renderRss(visibleSummaries()), {
					headers: {
						"Content-Type": "application/rss+xml; charset=utf-8",
						"Cache-Control": "public, max-age=900",
					},
				}),
		},
	},
});
