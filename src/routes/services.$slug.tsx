import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SchemaDiagram } from "@/components/diagrams/schema-diagram";
import {
	backupFlow,
	clusterArchitecture,
	deployFlow,
} from "@/components/diagrams/specs";
import type { DiagramSpec } from "@/components/diagrams/types";
import { ExternalButton, RouteButton } from "@/components/site/button";
import { FinalCta } from "@/components/site/final-cta";
import { PageShell } from "@/components/site/page-shell";
import { Container } from "@/components/site/section";
import { getFamily, serviceFamilies } from "@/content/services";
import { breadcrumbsJsonLd } from "@/lib/jsonld";
import { buildHead, SITE_URL } from "@/lib/seo";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

const schemas: Record<string, DiagramSpec> = {
	"mise-en-production": deployFlow,
	"ci-cd": deployFlow,
	kubernetes: clusterArchitecture,
	"sauvegardes-continuite": backupFlow,
};

export const Route = createFileRoute("/services/$slug")({
	loader: ({ params }) => {
		const family = getFamily(params.slug);
		if (!family) throw notFound();
		return family;
	},
	head: ({ loaderData }) =>
		loaderData
			? buildHead({
					title: loaderData.metaTitle,
					description: loaderData.metaDescription,
					canonical: `/services/${loaderData.slug}`,
				})
			: buildHead({
					title: "Prestation introuvable | Nicolas Sans",
					description:
						"Cette prestation n'existe pas. Consultez le catalogue complet.",
					canonical: "/services",
					noindex: true,
				}),
	component: FamilyPage,
	notFoundComponent: () => (
		<PageShell>
			<Container className="py-32">
				<h1 className="text-4xl font-semibold">Prestation introuvable</h1>
				<p className="mt-4">
					<Link to="/services" className="underline">
						Retour au catalogue
					</Link>
				</p>
			</Container>
		</PageShell>
	),
});

function FamilyPage() {
	const family = Route.useLoaderData();
	const position = serviceFamilies.findIndex((f) => f.slug === family.slug);
	const next = serviceFamilies[(position + 1) % serviceFamilies.length];
	const breadcrumbs = breadcrumbsJsonLd([
		{ name: "Accueil", item: SITE_URL },
		{ name: "Services", item: `${SITE_URL}/services` },
		{ name: family.name, item: `${SITE_URL}/services/${family.slug}` },
	]);

	return (
		<PageShell>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
			/>
			<section className=" border-b border-line">
				<Container className="py-16 lg:py-24">
					<nav aria-label="Fil d'Ariane" className="eyebrow">
						<Link to="/services" className="hover:text-ink">
							Services
						</Link>{" "}
						<span aria-hidden="true">/</span> {family.name}
					</nav>
					<p className="mt-8 text-[2.6rem] leading-none font-bold text-signal">
						{family.index}
					</p>
					<h1 className="mt-3 max-w-[22ch] text-[clamp(2.3rem,1.4rem+3.8vw,4.4rem)] leading-[1.02] font-semibold">
						{family.headline}
					</h1>
					<p className="mt-7 max-w-[62ch] text-[1.12rem] leading-relaxed text-ink-soft">
						{family.intro}
					</p>
					<div className="mt-9 flex flex-wrap gap-3">
						<ExternalButton href={BOOKING_URL} where="service">
							{BOOKING_LABEL}
						</ExternalButton>
						<RouteButton to="/contact" variant="ghost">
							Décrire mon besoin
						</RouteButton>
					</div>
				</Container>
			</section>

			{schemas[family.slug] && (
				<Container className="pt-16">
					<div className="surface p-4 sm:p-8">
						<SchemaDiagram spec={schemas[family.slug]} />
					</div>
				</Container>
			)}

			<Container className="grid gap-16 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-24">
				<div>
					<p className="eyebrow">Prestations</p>
					<ul className="mt-5 border-t border-line">
						{family.items.map((it) => (
							<li key={it.title} className="border-b border-line py-7">
								<h2 className="text-[1.5rem] leading-tight font-semibold">
									{it.title}
								</h2>
								<p className="mt-2 max-w-[60ch] text-ink-soft">{it.desc}</p>
							</li>
						))}
					</ul>

					<p className="eyebrow mt-14">Pour qui</p>
					<p className="mt-4 max-w-[60ch] text-[1.1rem]">{family.forWho}</p>
				</div>

				<aside className="grid content-start gap-8">
					<div className="rounded-2xl bg-signal-soft p-7">
						<p className="eyebrow">Vous recevez</p>
						<ul className="mt-5 grid gap-3 text-[0.95rem]">
							{family.deliverables.map((d) => (
								<li key={d} className="flex gap-3">
									<span aria-hidden="true" className="text-signal">
										✓
									</span>
									<span>{d}</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<p className="eyebrow">Outils</p>
						<ul className="mt-4 flex flex-wrap gap-2">
							{family.tools.map((t) => (
								<li
									key={t}
									className="border border-line px-2.5 py-1 text-[13px]"
								>
									{t}
								</li>
							))}
						</ul>
					</div>
				</aside>
			</Container>

			<div className="border-y border-line bg-paper-2">
				<Container className="flex flex-wrap items-center justify-between gap-4 py-6">
					<span className="eyebrow">Famille suivante</span>
					<Link
						to="/services/$slug"
						params={{ slug: next.slug }}
						className=" text-xl underline-offset-4 hover:underline"
					>
						{next.index} · {next.name} →
					</Link>
				</Container>
			</div>
			<FinalCta />
		</PageShell>
	);
}
