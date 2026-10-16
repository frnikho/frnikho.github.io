import { createFileRoute } from "@tanstack/react-router";
import { BlogListing } from "@/components/blog/blog-listing";
import { Accent } from "@/components/site/section";
import { getBlogPage } from "@/features/blog/blog";
import { BLOG_DESCRIPTION } from "@/features/blog/feeds";
import { blogJsonLd } from "@/lib/jsonld";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
	loader: () => getBlogPage({ data: 1 }),
	head: () =>
		buildHead({
			title: "Blog dev, IA et auto-hébergement | Nicolas Sans",
			description: BLOG_DESCRIPTION,
			canonical: "/blog",
		}),
	component: BlogHome,
});

function BlogHome() {
	const page = Route.useLoaderData();
	const posts = page?.items ?? [];
	return (
		<BlogListing
			kicker="Blog"
			title={
				<>
					Notes de terrain, <Accent>du code au serveur.</Accent>
				</>
			}
			intro="Développement, IA, auto-hébergement et retours d'expérience : ce que j'apprends en mission, testé avant d'être écrit."
			posts={posts}
			page={page ?? undefined}
			featureFirst
			jsonLd={blogJsonLd(posts)}
		/>
	);
}
