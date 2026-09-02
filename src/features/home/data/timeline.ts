import type { TimelineEntry } from "@/features/home/types";

export const timeline: TimelineEntry[] = [
	{
		year: "2025",
		endYear: null,
		start_date: "Jan. 2026",
		end_date: null,
		duration: "1 an",
		title: "Développeur Fullstack",
		company: "Privio",
		type: "CDI",
		accent: "#FF3E1F",
		bg: "#FFF1EB",
		desc: "Développement d’applications web modernes, mise en place de cluster kubernetes HA bare metal et casquette DevOps pour l’ensemble des projets de l’entreprise.",
		mastered: [
			{ k: "Frontend", d: "React, TypeScript, Tailwind CSS" },
			{ k: "Backend", d: "Node.js, Express, PostgreSQL" },
			{ k: "DevOps", d: "Kubernetes, Docker, CI/CD" },
		],
		tech: ["React", "Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
	},
	{
		year: "2022",
		endYear: "2025",
		start_date: "Avr. 2022",
		end_date: "Nov. 2025",
		duration: "3 ans",
		title: "Consultant Salesforce",
		company: "Capgemini",
		type: "CDI",
		accent: "#0176D3",
		bg: "#EFF6FF",
		desc: "J'interviens auprès des client sur la conception, l’évolution et la maintenance d’applications métiers critiques, avec une forte dimension d’automatisation et d’intégration inter-systèmes",
		mastered: [
			{
				k: "Apex / LWC",
				d: "Composants & logique métier Salesforce, Visualforce & Flow",
			},
			{
				k: "Intégrations",
				d: "REST / SOAP, API externes & services tiers robustes",
			},
			{
				k: "Qualité & delivery",
				d: "CI/CD, code review, TU à forte couverture, tests en pré-prod",
			},
		],
		tech: ["Salesforce Apex", "LWC", "Flow", "REST / SOAP", "CI/CD", "Agile"],
	},
	{
		year: "2021",
		endYear: "2025",
		start_date: "Sep. 2021",
		end_date: "Juin 2025",
		duration: "4 ans",
		title: "Fullstack & DevOps",
		company: "Freelance · Remote",
		type: null,
		accent: "#FF3E1F",
		bg: "#FFF1EB",
		desc:
			"Accompagnement de plusieurs clients sur des projets web et mobile, de la conception à la mise en production. J’ai participé à la création et à la maintenance d’applications complètes, tout en assurant l’architecture, le développement fullstack et la mise en place des bonnes pratiques.\n" +
			"\n",
		mastered: [
			{
				k: "Architecture",
				d: "DDD / SOLID, design system, APIs REST documentées (OpenAPI)",
			},
			{
				k: "Fullstack",
				d: "React / Next.js / NestJS / ElysiaJS · TypeScript · Bun/Node",
			},
			{
				k: "Infra & observabilité",
				d: "Docker · K8s · Terraform · GH Actions · Grafana / Loki / Tempo",
			},
		],
		tech: [
			"React",
			"Next.js",
			"NestJS",
			"PostgreSQL",
			"Prisma",
			"Redis",
			"Docker",
			"K8s",
			"Terraform",
			"Stripe",
		],
	},
	{
		year: "2020",
		endYear: "2021",
		start_date: "Août 2020",
		end_date: "Jan. 2021",
		duration: "6 mois",
		title: "Admin. Réseau & Systèmes",
		company: "St-Aubin La Salle · Angers",
		type: "Campus scolaire · support & infra",
		accent: "#C08A1A",
		bg: "#FFFBEB",
		desc:
			"J’ai assuré la gestion et la maintenance des infrastructures informatiques d’un établissement campus scolaire, avec un rôle polyvalent mêlant support utilisateurs, administration réseau et gestion des systèmes. Mon travail a consisté à diagnostiquer les incidents, maintenir la sécurité du parc, gérer les comptes utilisateurs, et accompagner le personnel dans l’usage des outils numériques.\n" +
			"\n",
		mastered: [
			{
				k: "Systèmes",
				d: "Active Directory, Windows Server, Linux - gestion parc & comptes",
			},
			{
				k: "Réseau",
				d: "Cisco, brassage, diagnostic incidents & sécurisation",
			},
			{
				k: "Virtualisation",
				d: "Proxmox / VMware - provision & maintien en conditions opérationnelles",
			},
		],
		tech: [
			"Active Directory",
			"Windows Server",
			"Linux",
			"Cisco",
			"Proxmox",
			"VMware",
		],
	},
	{
		year: "2019",
		endYear: "2024",
		start_date: "Sep. 2019",
		end_date: "Juil. 2024",
		duration: "5 ans",
		title: "Epitech Nantes",
		company: "RNCP 35075 · Expert en Tech. de l’Info",
		type: "Formation par projets · autonomie & agilité",
		accent: "#0C2E3D",
		bg: "#F0FDFA",
		desc:
			"Formation en informatique orientée projets, autonomie et expertise technique, axée sur le développement logiciel, l’architecture système et les méthodes agiles. Obtention du titre RNCP35075\n" +
			"\n",
		mastered: [
			{ k: "Fondamentaux", d: "C / C++ système, structures, perf & rigueur" },
			{
				k: "Web & outillage",
				d: "JS/TS, React, PlatformIO, Docker - culture ship",
			},
			{
				k: "Méthodes",
				d: "Projets en équipe, code review, agilité & auto-apprentissage",
			},
		],
		tech: ["C", "C++", "TS", "Docker", "K8s", "React", "Linux", "Git"],
	},
	{
		year: "2018",
		endYear: "2018",
		start_date: "Avr. 2018",
		end_date: "Mai 2018",
		duration: "2 mois",
		title: "Technicien Informatique",
		company: "Camara Education · Dublin",
		type: "ONG · reconditionnement & déploiement",
		accent: "#2E7D5A",
		bg: "#F0FDF4",
		desc:
			"Mission technique au sein d’une organisation à but non lucratif spécialisée dans le reconditionnement et la distribution d’équipements informatiques à des établissements scolaires dans des pays en développement. J’ai participé à l’installation, la configuration et à la remise en état de postes informatiques destinés à être expédiés vers des écoles partenaires.\n" +
			"\n",
		mastered: [
			{
				k: "Hardware",
				d: "Montage PC, diagnostic matériel & remise en état complète",
			},
			{
				k: "Systèmes & réseau",
				d: "Installation OS, config réseau & préparation au déploiement",
			},
			{
				k: "Sens terrain",
				d: "Chaîne logistique matérielle, exigences écoles partenaires",
			},
		],
		tech: ["Montage PC", "Installation OS", "Config Réseau", "Diagnostic"],
	},
];
