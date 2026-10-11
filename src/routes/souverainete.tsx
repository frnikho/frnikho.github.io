import { createFileRoute } from "@tanstack/react-router";
import { SchemaDiagram } from "@/components/diagrams/schema-diagram";
import { sovereigntyFlow } from "@/components/diagrams/specs";
import { ExternalButton, RouteButton } from "@/components/site/button";
import { FaqList } from "@/components/site/faq-section";
import { FinalCta } from "@/components/site/final-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import {
	Accent,
	Container,
	Section,
	SectionHead,
} from "@/components/site/section";
import { SovereigntyPillars } from "@/components/site/sovereignty-section";
import { sovereigntyNote } from "@/content/sovereignty";
import { buildHead } from "@/lib/seo";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

export const Route = createFileRoute("/souverainete")({
	head: () =>
		buildHead({
			title: "Hébergement souverain et RGPD : données en Europe | Nicolas Sans",
			description:
				"Hébergement en France ou dans l'Union européenne, exposition limitée au Cloud Act, chiffrement, outils libres et traçabilité : une infrastructure pensée pour la souveraineté des données et le RGPD.",
			canonical: "/souverainete",
		}),
	component: SovereigntyPage,
});

const why = [
	{
		title: "Une obligation de transparence",
		text: "Le RGPD impose de savoir où sont vos données, qui y accède et sur quelle base. Une infrastructure documentée rend ces réponses immédiates, en cas de contrôle comme de question client.",
	},
	{
		title: "Une dépendance à maîtriser",
		text: "Un fournisseur soumis au droit américain peut être tenu de communiquer des données, même hébergées en Europe. Un fournisseur européen limite fortement ce risque juridique.",
	},
	{
		title: "Un argument commercial",
		text: "Appels d'offres, grands comptes, secteur public : l'hébergement européen est de plus en plus exigé. L'anticiper évite une migration sous contrainte.",
	},
];

const providers = [
	{ name: "OVHcloud", where: "France et Union européenne · ISO/IEC 27001" },
	{ name: "Hetzner", where: "Allemagne et Finlande · ISO/IEC 27001" },
	{ name: "Scaleway", where: "France et Union européenne" },
];

function SovereigntyPage() {
	return (
		<PageShell>
			<PageHero
				kicker="Souveraineté & RGPD"
				title={
					<>
						Des données hébergées en Europe,{" "}
						<Accent>sous votre maîtrise.</Accent>
					</>
				}
				intro="La conformité d'une infrastructure se décide dès l'architecture : localisation, chiffrement, accès, sous-traitants. Voici la démarche appliquée."
			>
				<ExternalButton href={BOOKING_URL} where="sovereignty">
					{BOOKING_LABEL}
				</ExternalButton>
			</PageHero>

			<Section labelledBy="flow-title">
				<SectionHead
					kicker="Le parcours de vos données"
					titleId="flow-title"
					title={
						<>
							Où transitent vos données,{" "}
							<Accent>et où elles ne vont pas.</Accent>
						</>
					}
				/>
				<div className="surface mx-auto mt-12 max-w-[860px] p-4 sm:p-8">
					<SchemaDiagram spec={sovereigntyFlow} />
				</div>
			</Section>

			<Section tone="alt" labelledBy="why-title">
				<SectionHead
					index="01"
					kicker="Enjeux"
					titleId="why-title"
					title="Pourquoi le choix de l'hébergeur est structurant"
				/>
				<div className="mt-14 grid gap-5 lg:grid-cols-3">
					{why.map((w) => (
						<div key={w.title} className="surface p-8">
							<h3 className="text-[1.4rem] leading-snug font-semibold">
								{w.title}
							</h3>
							<p className="mt-3 text-ink-soft">{w.text}</p>
						</div>
					))}
				</div>
			</Section>

			<Section labelledBy="pillars-title">
				<SectionHead
					index="02"
					kicker="Principes"
					titleId="pillars-title"
					title={
						<>
							Six engagements <Accent>opérationnels.</Accent>
						</>
					}
				/>
				<div className="mt-14">
					<SovereigntyPillars />
				</div>
			</Section>

			<Section labelledBy="providers-title">
				<SectionHead
					index="03"
					kicker="Hébergeurs"
					titleId="providers-title"
					title="Des hébergeurs européens, choisis avec vous"
					intro="Le choix dépend de votre budget, de vos exigences de conformité et du dimensionnement de vos besoins. Une recommandation vous est faite ; vous décidez et réglez directement l'hébergeur."
				/>
				<ul className="mt-12 grid gap-5 sm:grid-cols-3">
					{providers.map((p) => (
						<li key={p.name} className="surface p-7">
							<p className=" text-[1.8rem] font-semibold">{p.name}</p>
							<p className="mt-1 text-[13px] text-ink-soft">{p.where}</p>
						</li>
					))}
				</ul>
			</Section>

			<Section tone="alt" labelledBy="limits-title">
				<Container className="!px-0 max-w-[780px]">
					<h2
						id="limits-title"
						className="text-[length:var(--text-h2)] leading-[1.05] font-semibold"
					>
						Périmètre d'intervention, <Accent>et limites.</Accent>
					</h2>
					<p className="mt-6 text-[1.08rem] text-ink-soft">{sovereigntyNote}</p>
					<div className="mt-8">
						<RouteButton to="/contact" variant="ghost">
							Poser une question
						</RouteButton>
					</div>
				</Container>
			</Section>

			<Section labelledBy="faq-sov-title">
				<SectionHead
					index="04"
					kicker="Questions"
					titleId="faq-sov-title"
					title="Questions fréquentes"
				/>
				<div className="mt-14">
					<FaqList />
				</div>
			</Section>
			<FinalCta />
		</PageShell>
	);
}
