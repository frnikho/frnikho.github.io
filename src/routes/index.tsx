import { createFileRoute } from "@tanstack/react-router";
import { LatestPostsSection } from "@/components/blog/latest-posts";
import { AboutBrief } from "@/components/site/about-brief";
import { FinalCta } from "@/components/site/final-cta";
import { Hero } from "@/components/site/hero";
import { PageShell } from "@/components/site/page-shell";
import { ProofSection } from "@/components/site/proof-section";
import { ServicesBrief } from "@/components/site/services-brief";
import { getHomePosts } from "@/features/blog/blog";
import { serviceJsonLd } from "@/lib/jsonld";
import { buildHead, HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";

export const Route = createFileRoute("/")({
	loader: () => getHomePosts(),
	head: () =>
		buildHead({
			title: HOME_TITLE,
			description: HOME_DESCRIPTION,
			canonical: "/",
		}),
	component: HomePage,
});

/**
 * Accueil du portfolio, pensé comme un récit pour qui ne me connaît pas :
 * qui je suis, ce que je fais, ce que j'ai fait pour d'autres, puis le blog.
 */
function HomePage() {
	const posts = Route.useLoaderData();
	return (
		<PageShell>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }}
			/>
			<Hero />
			<AboutBrief />
			<ServicesBrief />
			<ProofSection />
			<LatestPostsSection posts={posts} />
			<FinalCta />
		</PageShell>
	);
}
