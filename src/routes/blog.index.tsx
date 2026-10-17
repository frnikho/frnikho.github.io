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
			title: "Blog tech : tutos et retours d'expérience | Nicolas Sans",
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
					Tutos, trouvailles et <Accent>retours d'expérience.</Accent>
				</>
			}
			intro="Petits tutos, retours d'expérience, infos insolites et découvertes : ce qui m'a appris quelque chose dans la tech, le dev et l'informatique."
			posts={posts}
			page={page ?? undefined}
			featureFirst
			jsonLd={blogJsonLd(posts)}
		/>
	);
}
