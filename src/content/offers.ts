export type OfferId = "essentiel" | "pro" | "maintenance" | "sur-mesure";

export type Offer = {
	id: OfferId;
	name: string;
	/** Public visé, affiché au-dessus du prix. */
	audience: string;
	/** « à partir de », affiché avant le montant. */
	prefix?: string;
	price: string;
	priceNote: string;
	tagline: string;
	highlighted?: boolean;
	/** Offre sans prix public : bouton « parler à un expert ». */
	quote?: boolean;
	features: string[];
	footnote?: string;
	cta: string;
};

export const offers: Offer[] = [
	{
		id: "essentiel",
		name: "Essentiel",
		audience: "Indépendants, auto-entrepreneurs, premiers projets",
		prefix: "à partir de",
		price: "450 €",
		priceNote: "paiement unique",
		tagline:
			"Votre application en production, sécurisée, sur une infrastructure dont vous restez propriétaire.",
		features: [
			"Serveur sécurisé, provisionné sur votre compte chez l'hébergeur",
			"Plateforme de déploiement Dokploy",
			"Mise en production d'1 application conteneurisée",
			"HTTPS avec renouvellement automatique des certificats",
			"Sauvegarde chiffrée de la base de données, stockée dans l'Union européenne",
			"Supervision de disponibilité avec alerte",
			"Documentation d'exploitation et de passation",
		],
		cta: "Choisir Essentiel",
	},
	{
		id: "pro",
		name: "Pro",
		audience: "TPE, PME, activités qui ne peuvent pas s'arrêter",
		prefix: "à partir de",
		price: "1 200 €",
		priceNote: "paiement unique",
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
		cta: "Choisir Pro",
	},
	{
		id: "maintenance",
		name: "Maintenance",
		audience: "Après la mise en production, par serveur",
		prefix: "à partir de",
		price: "79 €",
		priceNote: "par mois et par serveur, engagement annuel : 2 mois offerts",
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
		cta: "Choisir Maintenance",
	},
	{
		id: "sur-mesure",
		name: "Sur mesure",
		audience: "PME, équipes techniques, agences, plusieurs serveurs",
		price: "Sur devis",
		priceNote: "après un échange de 30 minutes, devis ferme",
		tagline:
			"Quand l'infrastructure dépasse un serveur : un périmètre défini avec vous.",
		quote: true,
		features: [
			"Kubernetes, haute disponibilité, GitOps",
			"Migration depuis Heroku, Vercel, Render ou AWS",
			"Audit de sécurité, de coûts et de conformité RGPD",
			"Plusieurs serveurs et environnements, Infrastructure as Code",
			"Coaching d'équipe et infogérance en marque blanche",
			"Cadre d'astreinte étudié selon vos besoins",
		],
		cta: "Parler à un expert",
	},
];

export const offersNote =
	"Prix en euros, TVA non applicable (art. 293 B du CGI). Frais d'hébergement en sus, facturés directement par l'hébergeur.";
