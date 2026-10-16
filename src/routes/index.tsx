import { createFileRoute } from "@tanstack/react-router";
import { LatestPostsSection } from "@/components/blog/latest-posts";
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

/** Accueil hybride : présentation, puis le blog en premier plan, puis les services. */
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
			<LatestPostsSection posts={posts} />
			<ServicesBrief />
			<ProofSection />
			<FinalCta />
		</PageShell>
	);
}
