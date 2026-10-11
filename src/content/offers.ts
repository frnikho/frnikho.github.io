export type Offer = {
	id: "essentiel" | "pro" | "maintenance";
	name: string;
	price: string;
	priceNote: string;
	tagline: string;
	highlighted?: boolean;
	features: string[];
	footnote?: string;
};

export const offers: Offer[] = [
	{
		id: "essentiel",
		name: "Essentiel",
		price: "300 €",
		priceNote: "à partir de, paiement unique",
		tagline:
			"Votre application en production, sécurisée, sur une infrastructure dont vous restez propriétaire.",
		features: [
			"Serveur durci, provisionné sur votre compte chez l'hébergeur",
			"Plateforme de déploiement Dokploy",
			"Mise en production d'1 application conteneurisée",
			"HTTPS avec renouvellement automatique des certificats",
			"Sauvegarde chiffrée de la base de données, stockée dans l'Union européenne",
			"Supervision de disponibilité avec alerte",
			"Documentation d'exploitation et de passation",
		],
	},
	{
		id: "pro",
		name: "Pro",
		price: "600 €",
		priceNote: "à partir de, paiement unique",
		tagline:
			"L'offre Essentiel, renforcée pour les activités à forte exigence de continuité.",
		highlighted: true,
		features: [
			"Jusqu'à 3 applications sur le serveur",
			"Sauvegardes complètes (bases et fichiers), chiffrées",
			"Test de restauration réalisé et documenté",
			"Supervision des ressources avec alertes (mémoire, disque, processeur)",
			"Déploiement continu à chaque mise à jour du dépôt GitHub",
			"Environnement de préproduction pour valider avant publication",
		],
	},
	{
		id: "maintenance",
		name: "Maintenance",
		price: "49 € ou 99 €",
		priceNote: "par mois, engagement annuel : 2 mois offerts",
		tagline:
			"Un suivi mensuel de votre infrastructure, par un interlocuteur unique.",
		features: [
			"Application régulière des mises à jour de sécurité",
			"Surveillance continue du serveur et des applications",
			"Contrôle mensuel de l'exploitabilité des sauvegardes",
			"Intervention en cas d'incident serveur",
			"Rapport mensuel de synthèse",
		],
		footnote:
			"Interventions en soirée et le week-end, sans astreinte 24h/24 garantie.",
	},
];
