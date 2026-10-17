/** Présentation courte, reprise sur l'accueil et la page À propos. */
export const bio =
	"Formé à l'administration systèmes et réseaux puis au développement logiciel, j'interviens à la jonction des deux : concevoir des applications, les mettre en production et en assurer l'exploitation dans la durée. J'accompagne startups, PME et équipes techniques avec la même exigence de fiabilité, quelle que soit la taille du projet.";

export type CareerEntry = {
	period: string;
	title: string;
	company: string;
	desc: string;
	highlight?: boolean;
};

export const career: CareerEntry[] = [
	{
		period: "Depuis 2021",
		title: "Freelance Fullstack et DevOps",
		company: "Indépendant · startups et PME",
		desc: "Conception, mise en production et exploitation d'applications web. Activité menée en parallèle de mon poste salarié : disponible pour de nouvelles missions.",
		highlight: true,
	},
	{
		period: "Depuis janv. 2026",
		title: "Développeur Fullstack et DevOps",
		company: "CDI · Privio",
		desc: "Développement applicatif et exploitation de la plateforme qui héberge l'ensemble des projets de l'entreprise, conçue pour la haute disponibilité.",
		highlight: true,
	},
	{
		period: "2022 → 2025",
		title: "Consultant Salesforce",
		company: "CDI · Capgemini",
		desc: "Conception et évolution d'applications métiers sur Salesforce.",
	},
	{
		period: "2020 → 2021",
		title: "Administrateur réseau et systèmes",
		company: "Alternance · Angers",
		desc: "Administration Linux, virtualisation (Proxmox, VMware), Active Directory et réseau Cisco.",
	},
	{
		period: "2019 → 2024",
		title: "Epitech Nantes",
		company: "RNCP 35075 · Expert en Technologies de l'Information",
		desc: "Formation d'ingénieur par projets, en équipe, fondée sur l'autonomie et la rigueur.",
	},
];

export type Testimonial = { quote: string; author: string; role: string };

export const testimonials: Testimonial[] = [
	{
		quote:
			"Son travail est irréprochable, soigné et toujours orienté utilisateur. Nous le recommandons vivement.",
		author: "Pierre D.",
		role: "Co-fondateur, Everyloc",
	},
	{
		quote:
			"Très attentif et toujours investi, même face à nos changements de dernière minute. La qualité de son travail reflète son sérieux.",
		author: "Antoine H.",
		role: "Co-fondateur, Everyloc",
	},
	{
		quote:
			"Un réel sens du besoin client et une technique maîtrisée qui donnent des productions robustes et sans accroc.",
		author: "Denis S.",
		role: "Designer graphique",
	},
];

export const credentials = [
	"5+ ans en production",
	"RNCP 35075 · Epitech",
	"Développement et infrastructure",
	"Hébergement UE · RGPD",
	"100 % à distance, France entière",
] as const;

export type Principle = { title: string; text: string };

/** Principes de conduite, repris sur l'accueil et la page À propos. */
export const principles: Principle[] = [
	{
		title: "Simplicité",
		text: "Je privilégie la solution la plus simple qui réponde au besoin : un système que votre équipe comprend est un système qu'elle peut maintenir.",
	},
	{
		title: "Transparence",
		text: "Chaque élément livré est documenté. Vous gardez la maîtrise de votre infrastructure et restez libre de changer de prestataire.",
	},
	{
		title: "Vérification",
		text: "Chaque changement peut être annulé, chaque sauvegarde est validée par une restauration réelle, chaque exposition réseau est contrôlée depuis l'extérieur.",
	},
];
