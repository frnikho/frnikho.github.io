import { createFileRoute } from "@tanstack/react-router";
import { SchemaDiagram } from "@/components/diagrams/schema-diagram";
import { clusterArchitecture } from "@/components/diagrams/specs";
import {
	ClientProjectDetail,
	ClientResults,
} from "@/components/site/client-project";
import {
	ClusterMetrics,
	ClusterWaves,
} from "@/components/site/cluster-showcase";
import { FinalCta } from "@/components/site/final-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { clientProjects } from "@/content/projects";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/realisations")({
	head: () =>
		buildHead({
			title:
				"Réalisations : projets clients et cluster Kubernetes | Nicolas Sans",
			description:
				"Deux projets clients livrés de A à Z (développement fullstack, infrastructure, déploiement automatisé) et l'architecture anonymisée d'un cluster Kubernetes en production.",
			canonical: "/realisations",
		}),
	component: CasePage,
});

const decisions = [
	{
		title: "Pas d'accès SSH sur les nœuds",
		text: "Le système (Talos) est immuable et administré par API. Il n'y a pas de shell à compromettre, et deux nœuds configurés de la même façon sont strictement identiques.",
	},
	{
		title: "Git comme seule porte d'entrée",
		text: "Aucun changement manuel durable : tout passe par une revue, puis ArgoCD applique. L'historique Git est l'historique de l'infrastructure, et un retour arrière est un simple revert.",
	},
	{
		title: "Une gestion des secrets sans exposition",
		text: "Chiffrés dans Git, déverrouillés par un coffre-fort (Vault) lui-même démarré automatiquement, puis injectés dans les applications. Aucun secret en clair dans un dépôt.",
	},
	{
		title: "Un ordre de démarrage maîtrisé",
		text: "Seize vagues de déploiement garantissent que le réseau, le stockage et les secrets existent avant les applications qui en dépendent. Reconstruire le cluster est une procédure maîtrisée.",
	},
];

function CasePage() {
	return (
		<PageShell>
			<PageHero
				kicker="Réalisations"
				title={
					<>
						Des projets menés <Accent>du code au serveur.</Accent>
					</>
				}
				intro="Deux produits livrés de bout en bout, et un cluster Kubernetes exploité en production."
			/>

			<Section labelledBy="clients-title">
				<SectionHead
					kicker="Projets clients"
					titleId="clients-title"
					title={
						<>
							Deux clients, <Accent>de A à Z.</Accent>
						</>
					}
					intro="Sur ces deux projets, j'ai conçu l'application puis mis en place l'infrastructure et le déploiement automatisé. Un interlocuteur unique, du code au serveur."
				/>
				<div className="mt-10 grid gap-8">
					<ClientResults />
					{clientProjects.map((p) => (
						<ClientProjectDetail key={p.id} project={p} />
					))}
				</div>
			</Section>

			<Section tone="alt" labelledBy="decisions-title">
				<SectionHead
					index="01"
					kicker="Étude de cas : cluster Kubernetes"
					titleId="decisions-title"
					intro="Exploitation de l'infrastructure d'une entreprise qui héberge l'ensemble de ses projets sur Kubernetes, sur serveurs dédiés. Description anonymisée : ni noms, ni adresses, ni domaines."
					title={
						<>
							Quatre décisions{" "}
							<Accent>structurantes pour la robustesse.</Accent>
						</>
					}
				/>
				<div className="mt-14 grid gap-5 md:grid-cols-2">
					{decisions.map((d) => (
						<div key={d.title} className="surface p-8">
							<h3 className="text-[1.4rem] leading-snug font-semibold">
								{d.title}
							</h3>
							<p className="mt-3 text-ink-soft">{d.text}</p>
						</div>
					))}
				</div>
			</Section>

			<Section labelledBy="archi-title">
				<SectionHead
					index="02"
					kicker="Architecture"
					titleId="archi-title"
					title={
						<>
							Sept couches, <Accent>du matériel à Git.</Accent>
						</>
					}
					intro="Chaque couche a un rôle défini, des outils standards et une procédure de remplacement. Aucune dépendance propriétaire."
				/>
				<div className="mt-14 grid gap-12">
					<ClusterMetrics />
					<div className="surface p-4 sm:p-8">
						<SchemaDiagram spec={clusterArchitecture} />
					</div>
				</div>
			</Section>

			<Section tone="alt" labelledBy="waves-title">
				<SectionHead
					index="03"
					kicker="Déploiement"
					titleId="waves-title"
					title="L'ordre de démarrage, vague par vague"
					intro="ArgoCD déploie les composants dans un ordre strict pour respecter leurs dépendances."
				/>
				<div className="mt-12">
					<ClusterWaves />
				</div>
			</Section>

			<Section labelledBy="apply-title">
				<SectionHead
					index="04"
					kicker="Pour vous"
					titleId="apply-title"
					title={
						<>
							Ce que ça change <Accent>pour votre projet.</Accent>
						</>
					}
					intro="Un cluster à seize vagues n'est pas nécessaire à votre échelle. Les mêmes principes s'appliquent en revanche, dimensionnés à votre besoin : reproductibilité, maîtrise des secrets, sauvegardes restaurées et traçabilité de chaque changement."
				/>
			</Section>
			<FinalCta />
		</PageShell>
	);
}
