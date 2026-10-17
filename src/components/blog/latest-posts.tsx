import { CategoryNav } from "@/components/blog/blog-nav";
import { PostFeed } from "@/components/blog/post-card";
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
						Derniers articles <Accent>sur le blog.</Accent>
					</>
				}
				intro="Petits tutos, retours d'expérience, infos insolites et découvertes : ce qui m'a appris quelque chose dans la tech, le dev et l'informatique."
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
