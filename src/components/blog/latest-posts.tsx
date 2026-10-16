import { CategoryNav } from "@/components/blog/blog-nav";
import { PostCard, PostFeed } from "@/components/blog/post-card";
import { RouteButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import type { PostSummary } from "@/features/blog/posts";

/** Ancre de la section articles de l'accueil (bouton « Lire le blog » du hero). */
export const HOME_POSTS_ANCHOR = "blog";

/** Derniers articles, au cœur de l'accueil. Rien n'est affiché tant que le blog est vide. */
export function LatestPostsSection({ posts }: { posts: PostSummary[] }) {
	if (posts.length === 0) return null;
	return (
		<Section id={HOME_POSTS_ANCHOR} labelledBy="blog-title" decor="none">
			<SectionHead
				kicker="Blog"
				titleId="blog-title"
				title={
					<>
						Notes de terrain, <Accent>du code au serveur.</Accent>
					</>
				}
				intro="Développement, IA, auto-hébergement et retours d'expérience : ce que j'apprends en mission, testé avant d'être écrit."
			/>
			<div className="mt-8">
				<CategoryNav />
			</div>
			<div className="mt-10">
				<PostFeed posts={posts} featureFirst headingLevel="h3" />
			</div>
			<div className="mt-10">
				<RouteButton to="/blog" variant="ghost">
					Tous les articles
				</RouteButton>
			</div>
		</Section>
	);
}

/** Articles liés à une prestation, sur sa page de service. */
export function ServicePosts({ posts }: { posts: PostSummary[] }) {
	if (posts.length === 0) return null;
	return (
		<section aria-labelledby="service-posts-title">
			<p id="service-posts-title" className="eyebrow">
				Sur le blog
			</p>
			<ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{posts.map((p) => (
					<li key={p.slug} className="flex">
						<PostCard post={p} headingLevel="h3" />
					</li>
				))}
			</ul>
		</section>
	);
}
