export type ClientProject = {
	id: "everyloc" | "ocds";
	name: string;
	kind: string;
	url: string;
	host: string;
	since: string;
	summary: string;
	image: string;
	imageAlt: string;
	built: string[];
	infra: string[];
	stack: string[];
};

export const clientProjects: ClientProject[] = [
	{
		id: "everyloc",
		name: "Everyloc",
		kind: "Plateforme de location de matériel événementiel",
		url: "https://angers-location.fr",
		host: "angers-location.fr",
		since: "Depuis mai 2025",
		summary:
			"Catalogue en ligne, réservation par dates, paiement et facturation, espace d'administration et espace prestataires. Application conçue et développée de A à Z, puis déployée et exploitée.",
		image: "/projects/everyloc-site.webp",
		imageAlt:
			"Page d'accueil du site Everyloc, location de matériel événementiel",
		built: [
			"Catalogue, panier et réservation par dates",
			"Paiement en ligne et factures générées automatiquement",
			"Back-office d'administration et espace prestataires",
			"Référencement : métadonnées, données structurées, sitemap",
		],
		infra: [
			"Hébergé chez OVHcloud, déployé avec Dokploy",
			"Application conteneurisée (Docker, build en plusieurs étapes)",
			"Base PostgreSQL, stockage objet S3 et serveur mail",
			"Intégration continue : lint, typage, tests et build à chaque push",
			"Image Docker publiée automatiquement à chaque version",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Prisma",
			"PostgreSQL",
			"Stripe",
			"Docker",
			"GitHub Actions",
		],
	},
	{
		id: "ocds",
		name: "O Cœur du Soi",
		kind: "Site et blog d'une praticienne en accompagnement holistique",
		url: "https://ocoeurdusoi.com",
		host: "ocoeurdusoi.com",
		since: "Depuis octobre 2025",
		summary:
			"Site vitrine que la cliente modifie elle-même : éditeur de pages visuel, blog, newsletter et espace d'administration. Développé de A à Z, puis déployé de façon automatisée.",
		image: "/projects/ocds-site.webp",
		imageAlt: "Page d'accueil du site O Cœur du Soi, accompagnement holistique",
		built: [
			"Éditeur de pages visuel : modifier le site sans développeur",
			"Blog avec éditeur de texte riche et images",
			"Newsletter avec confirmation d'inscription et désinscription",
			"Authentification et espace d'administration",
		],
		infra: [
			"Hébergé chez OVHcloud, déployé avec Dokploy",
			"Rendu serveur conteneurisé (Docker)",
			"Base MongoDB, cache et stockage objet S3 pour les images",
			"Build vérifié à chaque push (GitHub Actions)",
			"Image Docker publiée automatiquement à chaque version",
		],
		stack: [
			"TanStack Start",
			"TypeScript",
			"MongoDB",
			"S3",
			"Docker",
			"GitHub Actions",
		],
	},
];

export type ResultStat = { value: string; label: string };

/** Résultats communs aux deux projets clients. */
export const clientResults: ResultStat[] = [
	{ value: "1 semaine", label: "pour la mise en ligne" },
	{ value: "99,9 %", label: "d'objectif de disponibilité" },
	{ value: "2", label: "projets clients exploités en production" },
];
