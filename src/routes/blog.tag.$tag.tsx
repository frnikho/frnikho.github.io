import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogListing } from "@/components/blog/blog-listing";
import { getTagPosts } from "@/features/blog/blog";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/tag/$tag")({
	loader: async ({ params }) => {
		const posts = await getTagPosts({ data: params.tag });
		if (posts.length === 0) throw notFound();
		return posts;
	},
	head: ({ params }) =>
		buildHead({
			title: `Articles « ${params.tag} » | Blog`,
			description: `Articles du blog de Nicolas Sans sur le sujet « ${params.tag} ».`,
			canonical: `/blog/tag/${params.tag}`,
			// Pages de tags : souvent quelques articles, utiles à la navigation mais pas à l'index.
			noindex: true,
			follow: true,
		}),
	component: TagPage,
});

function TagPage() {
	const posts = Route.useLoaderData();
	const { tag } = Route.useParams();
	return (
		<BlogListing
			kicker="Blog · tag"
			title={`#${tag}`}
			intro={`${posts.length} article${posts.length > 1 ? "s" : ""} sur ce sujet.`}
			posts={posts}
		/>
	);
}
