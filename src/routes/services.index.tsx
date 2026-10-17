import { createFileRoute, Link } from "@tanstack/react-router";
import { Glyph } from "@/components/services/glyph";
import { ServicePoleSection } from "@/components/services/service-pole";
import { FinalCta } from "@/components/site/final-cta";
import { OffersSection } from "@/components/site/offers-section";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Container } from "@/components/site/section";
import { Testimonials } from "@/components/site/testimonials";
import { servicePoles } from "@/content/service-poles";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
	head: () =>
		buildHead({
			title: "Services DevOps et infrastructure | Nicolas Sans",
			description:
				"Catalogue : mise en production, migration cloud, CI/CD, Kubernetes, sécurité, sauvegardes, monitoring, auto-hébergement, maintenance et conseil.",
			canonical: "/services",
		}),
	component: ServicesPage,
});

const further = [
	{
		to: "/realisations",
		title: "Réalisations",
		text: "Deux projets clients livrés de bout en bout, et une étude de cas d'infrastructure en production.",
	},
	{
		to: "/souverainete",
		title: "Souveraineté et RGPD",
		text: "Hébergement européen, propriété des données et implications concrètes pour votre conformité.",
	},
] as const;

function ServicesPage() {
	return (
		<PageShell>
			<PageHero
				kicker="Services"
				title={
					<>
						Des prestations organisées{" "}
						<Accent>selon le cycle de vie de votre application.</Accent>
					</>
				}
				intro="Dix prestations, regroupées en quatre pôles. Chacune peut être commandée seule ou combinée ; sélectionnez-en une pour afficher son détail."
			>
				<nav aria-label="Pôles de services" className="contents">
					{servicePoles.map((p) => (
						<a
							key={p.id}
							href={`#${p.id}`}
							className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[14px] font-semibold transition-colors hover:border-signal/50 hover:text-signal-deep"
						>
							<Glyph name={p.icon} className="size-4 text-signal" />
							{p.name}
						</a>
					))}
				</nav>
			</PageHero>
			{servicePoles.map((p, i) => (
				<ServicePoleSection key={p.id} pole={p} reversed={i % 2 === 1} />
			))}
			<OffersSection />
			<Testimonials />
			<Container className="py-16 lg:py-20">
				<p className="eyebrow">Pour aller plus loin</p>
				<ul className="mt-6 grid gap-5 md:grid-cols-2">
					{further.map((f) => (
						<li key={f.to} className="flex">
							<article className="surface group relative flex w-full flex-col p-7">
								<h2 className="text-[1.35rem] font-semibold">
									<Link
										to={f.to}
										className="after:absolute after:inset-0 group-hover:text-signal-deep"
									>
										{f.title} <span aria-hidden="true">→</span>
									</Link>
								</h2>
								<p className="mt-2 text-ink-soft">{f.text}</p>
							</article>
						</li>
					))}
				</ul>
			</Container>
			<FinalCta />
		</PageShell>
	);
}
