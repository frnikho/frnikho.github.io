import type { Service } from "@/features/home/types";

export const services: Service[] = [
	{
		n: "01",
		title: "Web & Apps",
		accent: "#FF3E1F",
		icon: "/icons/computer.png",
		desc: "Des interfaces rapides et accessibles, adossées à des APIs solides",
		items: [
			{
				t: "Interfaces & design systems",
				d: "Des apps React/Next.js modulaires, testées et prêtes à scaler sereinement",
			},
			{
				t: "APIs & backends",
				d: "Conçois des APIs Node.js ou Rust scalables, sécurisées et interopérables entre systèmes",
			},
			{
				t: "Refonte & perf",
				d: "Améliore perf, SEO et accessibilité de tes sites existants sans tout réécrire",
			},
			{
				t: "Fonctionnalités métiers",
				d: "Développe modules métiers sur mesure : tâches, abonnements, budgets, multi-comptes",
			},
		],
	},
	{
		n: "02",
		title: "Mobile",
		accent: "#0C2E3D",
		icon: "/icons/smartphones.png",
		desc: "Du natif Android au cross-platform, sans compromis sur la finition",
		items: [
			{
				t: "Android natif",
				d: "Livre des apps Android optimisées, intégration poussée aux APIs système",
			},
			{
				t: "Cross-platform",
				d: "Mutualise une base React Native pour iOS et Android sans sacrifier la fluidité",
			},
			{
				t: "Publication & performance",
				d: "Publie sur les stores et garantis compatibilité et stabilité au long cours",
			},
		],
	},
	{
		n: "03",
		title: "DevOps",
		accent: "#2E7D5A",
		icon: "/icons/continous.png",
		desc: "De la CI au run - tout est observable",
		items: [
			{
				t: "CI/CD & automatisation",
				d: "Automatise build, tests et déploiements avec rollback via GitHub Actions ou GitLab CI",
			},
			{
				t: "Containerisation & orchestration",
				d: "Package et orchestre tes services avec Docker et Kubernetes pour scaler sereinement",
			},
			{
				t: "Monitoring & observabilité",
				d: "Supervise tes apps avec Prometheus, Grafana et ELK pour anticiper avant la rupture",
			},
			{
				t: "Cloud & IaC",
				d: "Provisionne AWS/GCP/Azure avec Terraform en infra as code reproductible et versionnée",
			},
		],
	},
	{
		n: "04",
		title: "IoT",
		accent: "#C08A1A",
		icon: "/icons/iot.png",
		desc: "Du capteur au dashboard temps réel",
		items: [
			{
				t: "Prototypage & développement",
				d: "Prototype des systèmes embarqués Arduino, Raspberry Pi et ESP32 opérationnels rapidement",
			},
			{
				t: "Connectivité & protocoles",
				d: "Connecte capteurs et actionneurs en WiFi, Bluetooth ou Zigbee sans friction",
			},
			{
				t: "Applications IoT",
				d: "Collecte, traite et visualise tes données IoT en temps réel côté dashboard",
			},
			{
				t: "Sécurité & OTA",
				d: "Sécurise tes dispositifs et déploie les mises à jour OTA sans interruption",
			},
		],
	},
	{
		n: "05",
		title: "Salesforce",
		accent: "#0176D3",
		icon: "/stack/salesforce.png",
		desc: "Le CRM qui s'adapte à ton métier, pas l'inverse",
		items: [
			{
				t: "Développement sur mesure",
				d: "Façonne des apps Salesforce sur mesure parfaitement alignées avec ton métier",
			},
			{
				t: "Automatisation des workflows",
				d: "Flows, Apex et LWC : processus fiables et traçables",
			},
			{
				t: "Intégrations tierces",
				d: "Connecte Salesforce à tes outils via APIs, ERP et CRM sans silos",
			},
		],
	},
];
