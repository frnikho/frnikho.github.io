import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonClass } from "@/components/site/button";
import { FinalCta } from "@/components/site/final-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/agences")({
	head: () =>
		buildHead({
			title: "Infogérance en marque blanche pour agences | Nicolas Sans",
			description:
				"Agences web et freelances : confiez l'hébergement et la maintenance de vos clients en sous-traitance, sous votre marque. DevOps freelance, à distance.",
			canonical: "/agences",
		}),
	component: AgenciesPage,
});

const benefits = [
	{
		t: "Vos clients restent vos clients",
		d: "Intervention en retrait, sous votre marque si vous le souhaitez. Vous facturez selon vos propres conditions.",
	},
	{
		t: "Une expertise infrastructure à la demande",
		d: "Sans recrutement : mise en production et maintenance prises en charge au fil de vos projets.",
	},
	{
		t: "Des déploiements standardisés",
		d: "Chaque projet est livré sur le même socle : sécurité, sauvegardes, alertes, documentation.",
	},
	{
		t: "Un seul interlocuteur",
		d: "Un contact francophone qui connaît vos projets et partage votre langage technique.",
	},
];

const flow = [
	"Vous transmettez le projet et l'hébergeur du client.",
	"Déploiement, sécurisation et documentation, sous votre marque.",
	"Maintenance, supervision et rapport mensuel prêt à être transmis.",
];

function AgenciesPage() {
	return (
		<PageShell>
			<PageHero
				kicker="Agences et freelances"
				title={
					<>
						Vous livrez le site. <Accent>J'assure l'infrastructure.</Accent>
					</>
				}
				intro="Hébergement et maintenance ne relèvent pas de votre cœur de métier : confiez-les en sous-traitance, en marque blanche, avec le même niveau d'exigence sur chaque projet."
			>
				<Link
					to="/contact"
					search={{ offre: "agence" }}
					className={buttonClass()}
				>
					Parlons de votre agence <span aria-hidden="true">→</span>
				</Link>
			</PageHero>

			<Section labelledBy="benefits-title">
				<SectionHead
					index="01"
					kicker="Bénéfices"
					titleId="benefits-title"
					title={
						<>
							Un partenaire, <Accent>au-delà du simple prestataire.</Accent>
						</>
					}
				/>
				<div className="mt-14 grid gap-5 sm:grid-cols-2">
					{benefits.map((b) => (
						<div key={b.t} className="surface p-8">
							<h3 className="text-[1.4rem] leading-snug font-semibold">
								{b.t}
							</h3>
							<p className="mt-3 text-ink-soft">{b.d}</p>
						</div>
					))}
				</div>
			</Section>

			<Section tone="alt" labelledBy="flow-title">
				<SectionHead
					index="02"
					kicker="Fonctionnement"
					titleId="flow-title"
					title="Une intégration simple"
				/>
				<ol className="mt-12 grid gap-5 lg:grid-cols-3">
					{flow.map((f, i) => (
						<li key={f} className="surface p-8">
							<span className=" text-[2.6rem] leading-none text-signal">
								{i + 1}
							</span>
							<p className="mt-4">{f}</p>
						</li>
					))}
				</ol>
			</Section>
			<FinalCta />
		</PageShell>
	);
}
