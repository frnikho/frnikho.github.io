import type { ReactNode } from "react";
import { CategoryNav, Pagination } from "@/components/blog/blog-nav";
import { PostFeed } from "@/components/blog/post-card";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Container } from "@/components/site/section";
import type { Page, PostSummary } from "@/features/blog/posts";

type BlogListingProps = {
	kicker: string;
	title: ReactNode;
	intro: ReactNode;
	posts: PostSummary[];
	/** Catégorie active dans le filtre ; aucune sur l'accueil du blog et les tags. */
	category?: string;
	page?: Page<PostSummary>;
	featureFirst?: boolean;
	jsonLd?: object;
};

export function BlogListing({
	kicker,
	title,
	intro,
	posts,
	category,
	page,
	featureFirst = false,
	jsonLd,
}: BlogListingProps) {
	return (
		<PageShell>
			{jsonLd && (
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<PageHero kicker={kicker} title={title} intro={intro} />
			<Container className="py-12 lg:py-16">
				<CategoryNav active={category} />
				<div className="mt-10">
					{posts.length > 0 ? (
						<PostFeed posts={posts} featureFirst={featureFirst} />
					) : (
						<EmptyState />
					)}
				</div>
				{page && <Pagination page={page} />}
			</Container>
		</PageShell>
	);
}

function EmptyState() {
	return (
		<div className="surface p-10 text-center">
			<p className="text-[1.2rem] font-semibold">
				Aucun article ici pour l'instant.
			</p>
			<p className="mt-2 text-ink-soft">
				Les premiers billets arrivent. Le flux RSS vous préviendra de leur
				sortie.
			</p>
		</div>
	);
}
