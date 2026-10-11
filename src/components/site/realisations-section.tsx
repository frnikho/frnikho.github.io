import { SchemaDiagram } from "@/components/diagrams/schema-diagram";
import { clusterOverview } from "@/components/diagrams/specs";
import { RouteButton } from "@/components/site/button";
import {
	ClientProjectCard,
	ClientResults,
} from "@/components/site/client-project";
import { ClusterMetrics } from "@/components/site/cluster-showcase";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { clientProjects } from "@/content/projects";

export function RealisationsSection() {
	return (
		<Section tone="alt" id="realisations" labelledBy="realisations-title">
			<SectionHead
				kicker="Réalisations"
				titleId="realisations-title"
				title={
					<>
						Des projets menés <Accent>de A à Z.</Accent>
					</>
				}
			/>

			<div className="mt-10 grid gap-6">
				<ClientResults />
				<ul className="grid gap-6 md:grid-cols-2">
					{clientProjects.map((p) => (
						<li key={p.id} className="flex">
							<ClientProjectCard project={p} />
						</li>
					))}
				</ul>

				<article className="surface p-5 sm:p-8">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div className="max-w-[60ch]">
							<h3 className="text-[1.35rem] font-semibold">
								Cluster Kubernetes haute disponibilité
							</h3>
							<p className="mt-2 text-ink-soft">
								Exploitation de l'infrastructure d'une entreprise qui héberge
								l'ensemble de ses projets sur Kubernetes, sur serveurs dédiés.
								En cas de défaillance d'une machine, les applications restent
								disponibles.
							</p>
						</div>
						<RouteButton to="/realisations" variant="ghost">
							Étude de cas
						</RouteButton>
					</div>
					<div className="mt-6">
						<SchemaDiagram spec={clusterOverview} />
					</div>
					<div className="mt-6">
						<ClusterMetrics />
					</div>
				</article>
			</div>
		</Section>
	);
}
