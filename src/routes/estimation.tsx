import { createFileRoute } from "@tanstack/react-router";
import { FinalCta } from "@/components/site/final-cta";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { EstimatorTool } from "@/features/estimator/estimator-tool";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/estimation")({
	head: () =>
		buildHead({
			title:
				"Estimer les ressources serveur de votre application | Nicolas Sans",
			description:
				"Quel serveur choisir ? Estimez en quelques clics les vCPU, la RAM et le disque nécessaires à votre application, puis faites valider le dimensionnement.",
			canonical: "/estimation",
		}),
	component: EstimationPage,
});

const assumptions = [
	{
		title: "Une base commune",
		text: "Environ 1,5 Go de mémoire sont réservés à la plateforme de déploiement, au reverse proxy, à la supervision et au système, avant même votre application.",
	},
	{
		title: "Des profils types",
		text: "Chaque type d'application et de base de données a une consommation moyenne, ajustée selon la fréquentation. Une marge de 30 % absorbe les pics.",
	},
	{
		title: "Des tailles standard",
		text: "Le résultat est arrondi aux tailles de serveur proposées par les hébergeurs (2, 4, 8, 16 Go…), pour que vous puissiez comparer des offres réelles.",
	},
	{
		title: "Une estimation, pas une mesure",
		text: "Seul le suivi de votre application en conditions réelles donne le chiffre exact. L'estimation évite de sur ou sous-dimensionner au départ.",
	},
];

function EstimationPage() {
	return (
		<PageShell>
			<PageHero
				kicker="Dimensionnement"
				title={
					<>
						Quel serveur pour votre application ?{" "}
						<Accent>Estimez-le en une minute.</Accent>
					</>
				}
				intro="Vous ne savez pas quelle taille de serveur choisir ni ce que votre application va consommer ? Décrivez-la : vous obtenez un ordre de grandeur en vCPU, mémoire et disque, à valider ensemble."
			/>

			<Section labelledBy="estimator-title">
				<h2 id="estimator-title" className="sr-only">
					Estimateur de ressources
				</h2>
				<EstimatorTool />
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
