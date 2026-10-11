export type CareerEntry = {
	period: string;
	title: string;
	company: string;
	desc: string;
	highlight?: boolean;
};

export const career: CareerEntry[] = [
	{
		period: "Depuis janv. 2026",
		title: "Développeur Fullstack et DevOps",
		company: "CDI · entreprise anonymisée",
		desc: "Exploitation d'un cluster Kubernetes haute disponibilité sur serveurs dédiés (Talos, Hetzner, ArgoCD), qui héberge l'ensemble des projets de l'entreprise.",
		highlight: true,
	},
	{
		period: "2021 → 2025",
		title: "Freelance Fullstack et DevOps",
		company: "Startups et PME",
		desc: "Mise en production et exploitation d'applications avec Docker, Kubernetes et Terraform.",
	},
	{
		period: "2022 → 2025",
		title: "Consultant Salesforce",
		company: "Capgemini",
		desc: "Conception et évolution d'applications métiers.",
	},
	{
		period: "2020 → 2021",
		title: "Administrateur réseau et systèmes",
		company: "Alternance · Angers",
		desc: "Linux, Proxmox, VMware, Active Directory et Cisco : socle de compétences en infrastructure.",
	},
	{
		period: "2019 → 2024",
		title: "Epitech Nantes",
		company: "RNCP 35075 · Expert en Technologies de l'Information",
		desc: "Formation par projets, en équipe, axée sur l'autonomie et la rigueur.",
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
	"Kubernetes en exploitation",
	"Hébergement UE · RGPD",
	"100 % à distance, France entière",
] as const;
