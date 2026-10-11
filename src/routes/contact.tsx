import { createFileRoute } from "@tanstack/react-router";
import { ExternalButton } from "@/components/site/button";
import { FaqSection } from "@/components/site/faq-section";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Container } from "@/components/site/section";
import { faq } from "@/content/faq";
import { ContactForm } from "@/features/contact/contact-form";
import type { ProjectType } from "@/features/contact/validation";
import { faqJsonLd } from "@/lib/jsonld";
import { buildHead } from "@/lib/seo";
import {
	BOOKING_LABEL,
	BOOKING_URL,
	CONTACT_EMAIL,
	SOCIAL_LINKS,
} from "@/lib/site";

type ContactSearch = { offre?: string };

export const Route = createFileRoute("/contact")({
	validateSearch: (search: Record<string, unknown>): ContactSearch => ({
		offre: typeof search.offre === "string" ? search.offre : undefined,
	}),
	head: () =>
		buildHead({
			title: "Contact : échangeons sur votre infrastructure | Nicolas Sans",
			description:
				"Décrivez votre projet : mise en production, migration, Kubernetes, sécurité ou maintenance. Réponse sous 24 h ouvrées, à distance partout en France.",
			canonical: "/contact",
		}),
	component: ContactPage,
});

function ContactPage() {
	const { offre } = Route.useSearch();
	const defaultProjectType: ProjectType =
		offre === "agence" ? "agence" : "startup";
	return (
		<PageShell>
			<Container className="grid gap-14 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-24">
				<div>
					<p className="eyebrow">Contact</p>
					<h1 className="mt-5 text-[clamp(2.3rem,1.4rem+3.6vw,4.2rem)] leading-[1] font-semibold">
						Échangeons sur <Accent>votre projet.</Accent>
					</h1>
					<p className="mt-6 max-w-[56ch] text-ink-soft">
						Décrivez votre besoin en quelques lignes. Réponse sous 24 h ouvrées,
						avec des questions de cadrage et une première estimation. Le premier
						échange est gratuit et sans engagement.
					</p>
					{offre && offre !== "agence" && (
						<p className="mt-4 inline-block border border-signal/40 px-3 py-1 text-[13px] text-signal-deep">
							Offre sélectionnée : {offre}
						</p>
					)}
					<div className="mt-10">
						<ContactForm defaultProjectType={defaultProjectType} />
					</div>
				</div>

				<aside className="grid content-start gap-8">
					<div className="rounded-2xl bg-signal-soft p-8">
						<p className="eyebrow">Plus direct</p>
						<p className="mt-4 text-[1.6rem] leading-snug">
							Réservez 30 minutes dans mon agenda.
						</p>
						<div className="mt-6">
							<ExternalButton href={BOOKING_URL}>
								{BOOKING_LABEL}
							</ExternalButton>
						</div>
					</div>
					<div className="text-[0.95rem] text-ink-soft">
						<p className="eyebrow mb-3">Ou directement</p>
						<p>
							<a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
								{CONTACT_EMAIL}
							</a>
						</p>
						<p className="mt-1">
							<a className="underline" href={SOCIAL_LINKS.linkedin}>
								LinkedIn
							</a>
							{" · "}
							<a className="underline" href={SOCIAL_LINKS.malt}>
								Malt
							</a>
						</p>
					</div>
					<p className="border-t border-line pt-6 text-[13px] leading-relaxed text-ink-soft">
						Vos données ne servent qu'à vous répondre. Aucun traceur, aucune
						police externe, aucun script tiers sur ce site.
					</p>
				</aside>
			</Container>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
			/>
			<FaqSection />
		</PageShell>
	);
}
