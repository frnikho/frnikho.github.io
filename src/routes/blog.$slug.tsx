import {
	createFileRoute,
	Link,
	notFound,
	redirect,
} from "@tanstack/react-router";
import {
	ArticleBody,
	AuthorBox,
	PostCta,
	ServicesAside,
	TableOfContents,
} from "@/components/blog/article";
import { PostCard, PostMeta } from "@/components/blog/post-card";
import { Decor } from "@/components/site/decor";
import { PageShell } from "@/components/site/page-shell";
import { Container } from "@/components/site/section";
import { getBlogCategory } from "@/content/blog";
import { ogImagePath } from "@/features/blog/assets";
import { getPost } from "@/features/blog/blog";
import { formatPostDate, TOC_MIN_HEADINGS } from "@/features/blog/posts";
import { blogPostingJsonLd, breadcrumbsJsonLd } from "@/lib/jsonld";
import { buildHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		const result = await getPost({ data: params.slug });
		if (result.kind === "redirect") {
			throw redirect({
				to: "/blog/$slug",
				params: { slug: result.slug },
				statusCode: 301,
			});
		}
		if (result.kind === "missing") throw notFound();
		return result;
	},
	head: ({ loaderData }) => {
		if (!loaderData) {
			return buildHead({
				title: "Article introuvable | Blog",
				description: "Cet article n'existe pas ou n'est plus en ligne.",
				canonical: "/blog",
				noindex: true,
			});
		}
		const { post } = loaderData;
		return buildHead({
			title: post.seoTitle ?? post.title,
			description: post.description,
			canonical: `/blog/${post.slug}`,
			ogType: "article",
			ogImage: `${SITE_URL}${ogImagePath(post.slug)}`,
			ogImageAlt: post.title,
			ogImageType: "image/png",
			article: {
				publishedTime: post.publishedAt,
				modifiedTime: post.updatedAt,
				section: getBlogCategory(post.category)?.name ?? post.category,
				tags: post.tags,
			},
		});
	},
	component: PostPage,
	notFoundComponent: () => (
		<PageShell>
			<Container className="py-32">
				<h1 className="text-4xl font-semibold">Article introuvable</h1>
				<p className="mt-4">
					<Link to="/blog" className="underline">
						Retour au blog
					</Link>
				</p>
			</Container>
		</PageShell>
	),
});

function PostPage() {
	const { post, related } = Route.useLoaderData();
	const category = getBlogCategory(post.category);
	const showToc =
		post.toc.filter((e) => e.depth === 2).length >= TOC_MIN_HEADINGS;
	const url = `${SITE_URL}/blog/${post.slug}`;
	const jsonLd = [
		blogPostingJsonLd({
			...post,
			image: `${SITE_URL}${ogImagePath(post.slug)}`,
			section: category?.name ?? post.category,
		}),
		breadcrumbsJsonLd([
			{ name: "Accueil", item: SITE_URL },
			{ name: "Blog", item: `${SITE_URL}/blog` },
			...(category
				? [
						{
							name: category.name,
							item: `${SITE_URL}/blog/categorie/${category.slug}`,
						},
					]
				: []),
			{ name: post.title, item: url },
		]),
	];

	return (
		<PageShell>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<article>
				<header className="under-nav relative overflow-clip border-b border-line bg-paper-2">
					<Decor variant="hero" />
					<Container className="py-14 lg:py-20">
						<nav aria-label="Fil d'Ariane" className="eyebrow">
							<Link to="/blog" className="hover:text-ink">
								Blog
							</Link>
							{category && (
								<>
									{" "}
									<span aria-hidden="true">/</span>{" "}
									<Link
										to="/blog/categorie/$category"
										params={{ category: category.slug }}
										className="hover:text-ink"
									>
										{category.name}
									</Link>
								</>
							)}
						</nav>
						<h1 className="mt-6 max-w-[34ch] text-[clamp(1.85rem,1.4rem+1.6vw,2.6rem)] leading-[1.15] font-semibold">
							{post.title}
						</h1>
						<p className="mt-6 max-w-[62ch] text-[1.15rem] leading-relaxed text-ink-soft">
							{post.description}
						</p>
						<PostMeta post={post} className="mt-7" />
						{post.updatedAt && (
							<p className="mt-2 text-[0.88rem] text-ink-soft">
								Mis à jour le{" "}
								<time dateTime={post.updatedAt}>
									{formatPostDate(post.updatedAt)}
								</time>
							</p>
						)}
					</Container>
				</header>

				<Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,68ch)_minmax(16rem,22rem)] lg:justify-between lg:gap-16 lg:py-16">
					<div className="min-w-0 max-w-[68ch]">
						{post.cover && (
							<img
								src={post.cover}
								alt={post.coverAlt ?? ""}
								width={1200}
								height={630}
								fetchPriority="high"
								className="mb-10 w-full rounded-2xl border border-line"
							/>
						)}
						{showToc && (
							<TableOfContents
								entries={post.toc}
								className="surface mb-10 p-6 lg:hidden"
							/>
						)}
						<ArticleBody html={post.html} />

						{post.tags.length > 0 && (
							<ul aria-label="Tags" className="mt-12 flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<li key={tag}>
										<Link
											to="/blog/tag/$tag"
											params={{ tag }}
											className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-soft hover:border-ink/30 hover:text-ink"
										>
											#{tag}
										</Link>
									</li>
								))}
							</ul>
						)}

						<div className="mt-12 grid gap-6">
							<PostCta service={post.service} />
							<AuthorBox />
						</div>
					</div>

					{/* Colonne latérale, ordinateur uniquement : sommaire éventuel et encart services. */}
					<aside className="hidden lg:block">
						<div className="sticky top-24 grid gap-8">
							{showToc && <TableOfContents entries={post.toc} />}
							<ServicesAside service={post.service} />
						</div>
					</aside>
				</Container>
			</article>

			{related.length > 0 && (
				<section
					aria-labelledby="related-title"
					className="border-t border-line bg-paper-2"
				>
					<Container className="py-14 lg:py-20">
						<h2 id="related-title" className="text-[length:var(--text-h2)]">
							À lire ensuite
						</h2>
						<ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
							{related.map((p) => (
								<li key={p.slug} className="flex">
									<PostCard post={p} headingLevel="h3" />
								</li>
							))}
						</ul>
					</Container>
				</section>
			)}
		</PageShell>
	);
}
