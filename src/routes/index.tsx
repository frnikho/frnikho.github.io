import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/site/contact-section";
import { ExpertiseSection } from "@/components/site/expertise-section";
import { Hero } from "@/components/site/hero";
import { OffersSection } from "@/components/site/offers-section";
import { PageShell } from "@/components/site/page-shell";
import { RealisationsSection } from "@/components/site/realisations-section";
import { SovereigntySection } from "@/components/site/sovereignty-section";
import { Testimonials } from "@/components/site/testimonials";
import { serviceJsonLd } from "@/lib/jsonld";
import { buildHead, HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";

export const Route = createFileRoute("/")({
	head: () =>
		buildHead({
			title: HOME_TITLE,
			description: HOME_DESCRIPTION,
			canonical: "/",
		}),
	component: HomePage,
});

function HomePage() {
	return (
		<PageShell>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }}
			/>
			<Hero />
			<ExpertiseSection />
			<SovereigntySection />
			<RealisationsSection />
			<OffersSection />
			<Testimonials />
			<ContactSection />
		</PageShell>
	);
}
