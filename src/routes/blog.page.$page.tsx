import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { BlogListing } from "@/components/blog/blog-listing";
import { getBlogPage } from "@/features/blog/blog";
import { BLOG_DESCRIPTION } from "@/features/blog/feeds";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/page/$page")({
	beforeLoad: ({ params }) => {
		// La page 1 a une seule adresse : /blog.
		if (params.page === "1") throw redirect({ to: "/blog", statusCode: 301 });
	},
	loader: async ({ params }) => {
		const page = /^\d+$/.test(params.page)
			? await getBlogPage({ data: Number(params.page) })
			: null;
		if (!page) throw notFound();
		return page;
	},
	head: ({ params }) =>
		buildHead({
			title: `Blog, page ${params.page} | Nicolas Sans`,
			description: BLOG_DESCRIPTION,
			canonical: `/blog/page/${params.page}`,
		}),
	component: BlogPage,
});

function BlogPage() {
	const page = Route.useLoaderData();
	return (
		<BlogListing
			kicker={`Blog · page ${page.page} sur ${page.totalPages}`}
			title="Tous les articles"
			intro="Tutos, retours d'expérience, infos insolites et découvertes tech, du plus récent au plus ancien."
			posts={page.items}
			page={page}
		/>
	);
}
