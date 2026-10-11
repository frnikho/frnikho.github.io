import { Link } from "@tanstack/react-router";
import { SchemaDiagram } from "@/components/diagrams/schema-diagram";
import { deployFlow } from "@/components/diagrams/specs";
import { RouteButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { domains } from "@/content/domains";

export function ExpertiseSection() {
	return (
		<Section tone="alt" id="expertise" labelledBy="expertise-title">
			<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
				<div className="lg:sticky lg:top-24 lg:self-start">
					<SectionHead
						kicker="Expertise et services"
						titleId="expertise-title"
						title={
							<>
								De l'application au serveur,{" "}
								<Accent>une exploitation de bout en bout.</Accent>
							</>
						}
						intro="Un interlocuteur unique pour la mise en production, l'automatisation, la sécurisation et la maintenance de votre infrastructure."
					/>
					<div className="surface mt-8 p-4 sm:p-5">
						<SchemaDiagram spec={deployFlow} />
					</div>
					<div className="mt-6">
						<RouteButton to="/services" variant="ghost">
							Catalogue complet des prestations
						</RouteButton>
					</div>
				</div>

				<ul className="grid gap-3">
					{domains.map((d) => (
						<li key={d.slug}>
							<Link
								to="/services/$slug"
								params={{ slug: d.slug }}
								className="surface group block p-5 transition-colors hover:border-signal/50"
							>
								<div className="flex items-start justify-between gap-4">
									<h3 className="text-[1.15rem] font-semibold">{d.title}</h3>
									<span
										aria-hidden="true"
										className="text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-signal"
									>
										→
									</span>
								</div>
								<p className="mt-1 text-[0.98rem] text-ink-soft">{d.desc}</p>
								<ul className="mt-3 flex flex-wrap gap-1.5">
									{d.chips.map((c) => (
										<li
											key={c}
											className="rounded-full bg-signal-soft px-2.5 py-0.5 text-[13px] font-medium text-signal-deep"
										>
											{c}
										</li>
									))}
								</ul>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</Section>
	);
}
