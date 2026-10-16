import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogListing } from "@/components/blog/blog-listing";
import { getBlogCategory } from "@/content/blog";
import { getCategoryPosts } from "@/features/blog/blog";
import { breadcrumbsJsonLd } from "@/lib/jsonld";
import { buildHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/categorie/$category")({
	loader: async ({ params }) => {
		const category = getBlogCategory(params.category);
		if (!category) throw notFound();
		const posts = await getCategoryPosts({ data: category.slug });
		return { category, posts };
	},
	head: ({ loaderData }) =>
		loaderData
			? buildHead({
					title: `${loaderData.category.headline} | Blog`,
					description: loaderData.category.intro,
					canonical: `/blog/categorie/${loaderData.category.slug}`,
					// Une catégorie vide est une page sans contenu : hors de l'index.
					noindex: loaderData.posts.length === 0,
					follow: true,
				})
			: {},
	component: CategoryPage,
});

function CategoryPage() {
	const { category, posts } = Route.useLoaderData();
	const breadcrumbs = breadcrumbsJsonLd([
		{ name: "Accueil", item: SITE_URL },
		{ name: "Blog", item: `${SITE_URL}/blog` },
		{
			name: category.name,
			item: `${SITE_URL}/blog/categorie/${category.slug}`,
		},
	]);
	return (
		<BlogListing
			kicker={`Blog · ${category.name}`}
			title={category.headline}
			intro={category.intro}
			posts={posts}
			category={category.slug}
			jsonLd={breadcrumbs}
		/>
	);
}
