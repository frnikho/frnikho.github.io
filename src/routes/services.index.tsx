import { createFileRoute, Link } from "@tanstack/react-router";
import { FinalCta } from "@/components/site/final-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Container } from "@/components/site/section";
import { serviceFamilies } from "@/content/services";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
	head: () =>
		buildHead({
			title: "Services DevOps et infrastructure | Nicolas Sans",
			description:
				"Catalogue complet : mise en production, migration et réduction des coûts, CI/CD, Kubernetes, sécurité, sauvegardes, monitoring, outils auto-hébergés, maintenance et conseil.",
			canonical: "/services",
		}),
	component: ServicesPage,
});

function ServicesPage() {
	return (
		<PageShell>
			<PageHero
				kicker="Catalogue"
				title={
					<>
						Catalogue de prestations,{" "}
						<Accent>de l'application à l'infrastructure.</Accent>
					</>
				}
				intro="Dix familles de prestations, commandables seules ou combinées. Chaque famille dispose d'une page de détail."
			/>
			<Container className="py-16 lg:py-24">
				<div className="grid gap-20">
					{serviceFamilies.map((f) => (
						<article
							key={f.slug}
							id={f.slug}
							className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12"
						>
							<div>
								<p className=" text-[2.6rem] leading-none text-signal">
									{f.index}
								</p>
								<p className="eyebrow mt-3">{f.name}</p>
							</div>
							<div>
								<h2 className="text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] leading-tight font-semibold">
									{f.headline}
								</h2>
								<ul className="mt-6 border-t border-line">
									{f.items.map((it) => (
										<li
											key={it.title}
											className="grid gap-1 border-b border-line py-4 lg:grid-cols-[1fr_1.3fr] lg:gap-8"
										>
											<h3 className="font-sans text-[1.02rem] font-semibold">
												{it.title}
											</h3>
											<p className="text-ink-soft">{it.desc}</p>
										</li>
									))}
								</ul>
								<Link
									to="/services/$slug"
									params={{ slug: f.slug }}
									className="mt-5 inline-block text-[13px] text-signal-deep underline underline-offset-4"
								>
									Voir le détail →
								</Link>
							</div>
						</article>
					))}
				</div>
			</Container>
			<FinalCta />
		</PageShell>
	);
}
