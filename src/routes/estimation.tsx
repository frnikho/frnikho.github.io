import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { FinalCta } from "@/components/site/final-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { EstimatorTool } from "@/features/estimator/estimator-tool";
import {
	decodeState,
	type EstimatorSearch,
	validateEstimatorSearch,
} from "@/features/estimator/share";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/estimation")({
	validateSearch: validateEstimatorSearch,
	head: () =>
		buildHead({
			title: "Calculateur de serveur : vCPU, RAM, disque | Nicolas Sans",
			description:
				"Composez votre stack, réglez le trafic et simulez la croissance : vCPU, RAM, disque et architecture nécessaires, avec un lien à partager ou un PDF.",
			canonical: "/estimation",
		}),
	component: EstimationPage,
});

const assumptions = [
	{
		title: "Une base commune",
		text: "Environ 1,5 Go de mémoire et un demi-vCPU sont réservés à la plateforme de déploiement, au reverse proxy, à la supervision et au système, avant même votre application.",
	},
	{
		title: "Un profil par composant",
		text: "Chaque brique a une consommation au repos, ajustée selon la fréquentation et, pour les bases, le volume de données. Une marge de 30 % absorbe les pics.",
	},
	{
		title: "Des tailles standard",
		text: "Le résultat est arrondi aux tailles proposées par les hébergeurs (2, 4, 8, 16, 32 Go). Au-delà, l'architecture passe à plusieurs serveurs.",
	},
	{
		title: "Une estimation, pas une mesure",
		text: "La croissance multiplie trafic, données et fichiers d'autant. Seul le suivi en conditions réelles donne le chiffre exact.",
	},
];

function EstimationPage() {
	const search = Route.useSearch();
	// L'URL ne sert qu'à l'ouverture : l'outil garde ensuite son propre état.
	const [initial] = useState(() => decodeState(search));
	const navigate = useNavigate({ from: "/estimation" });
	const persist = useCallback(
		(next: EstimatorSearch) =>
			navigate({ search: next, replace: true, resetScroll: false }),
		[navigate],
	);
	return (
		<PageShell>
			<PageHero
				kicker="Calculateur de serveur"
				title={
					<>
						Dimensionnez votre infrastructure{" "}
						<Accent>à partir de votre stack.</Accent>
					</>
				}
				intro="Décrivez vos composants et votre trafic, simulez la croissance : vCPU, mémoire, disque et architecture sont recalculés en temps réel. Le résultat se partage par lien ou s'exporte en PDF."
			/>

			<Section labelledBy="estimator-title">
				<h2 id="estimator-title" className="sr-only">
					Estimateur de ressources
				</h2>
				<EstimatorTool initial={initial} onPersist={persist} />
			</Section>

			<Section tone="alt" labelledBy="method-title">
				<SectionHead
					kicker="Méthode"
					titleId="method-title"
					title={
						<>
							Comment l'estimation est <Accent>calculée.</Accent>
						</>
					}
				/>
				<div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{assumptions.map((a) => (
						<div key={a.title} className="surface p-7">
							<h3 className="text-[1.15rem] leading-snug font-semibold">
								{a.title}
							</h3>
							<p className="mt-3 text-[0.95rem] text-ink-soft">{a.text}</p>
						</div>
					))}
				</div>
			</Section>
			<FinalCta />
		</PageShell>
	);
}
