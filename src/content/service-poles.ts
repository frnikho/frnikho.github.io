import type { IconName } from "@/components/diagrams/types";

export type PoleId = "lancer" | "automatiser" | "proteger" | "durer";

export type ServicePole = {
	id: PoleId;
	index: string;
	name: string;
	title: string;
	desc: string;
	icon: IconName;
	/** Slugs des familles du catalogue rattachées à ce pôle. */
	families: string[];
};

/** Les 10 familles du catalogue, regroupées en 4 étapes de la vie d'une infrastructure. */
export const servicePoles: ServicePole[] = [
	{
		id: "lancer",
		index: "01",
		name: "Mettre en ligne",
		title:
			"Votre application en production, sur un serveur qui vous appartient.",
		desc: "Serveur sécurisé, HTTPS, sauvegardes et alertes dès le premier jour. Si la facture cloud dérive, migration vers un hébergeur européen.",
		icon: "server",
		families: ["mise-en-production", "migration-couts"],
	},
	{
		id: "automatiser",
		index: "02",
		name: "Automatiser",
		title: "Des livraisons automatisées, testées et traçables.",
		desc: "Chaque modification est testée, construite et publiée sans intervention manuelle. Une orchestration plus avancée lorsque l'échelle le justifie.",
		icon: "zap",
		families: ["ci-cd", "kubernetes"],
	},
	{
		id: "proteger",
		index: "03",
		name: "Protéger",
		title: "Sécurité, sauvegardes et supervision vérifiées, pas supposées.",
		desc: "Surface d'attaque réduite, restaurations testées et alertes pertinentes, avant que vos utilisateurs ne voient la panne.",
		icon: "shield",
		families: ["securite", "sauvegardes-continuite", "monitoring"],
	},
	{
		id: "durer",
		index: "04",
		name: "Maintenir",
		title: "Une infrastructure suivie dans le temps, une équipe autonome.",
		desc: "Maintenance mensuelle, outils libres auto-hébergés et transmission de compétences, pour que l'infrastructure survive aux départs.",
		icon: "users",
		families: ["maintenance", "auto-heberge", "accompagnement"],
	},
];

/** Pictogramme de chaque famille dans la liste d'un pôle. */
export const familyIcons: Record<string, IconName> = {
	"mise-en-production": "server",
	"migration-couts": "globe",
	"ci-cd": "git",
	kubernetes: "network",
	securite: "lock",
	"sauvegardes-continuite": "archive",
	monitoring: "activity",
	"auto-heberge": "box",
	maintenance: "sync",
	accompagnement: "users",
};
