import type { Service } from "@/features/home/types";

export const services: Service[] = [
	{
		n: "01",
		title: "Web & Apps",
		accent: "#FF3E1F",
		icon: "/icons/computer.png",
		desc: "Interfaces propres, perf et accessibilité d’abord.",
		items: [
			{
				t: "Applications",
				d: "Interfaces React / Next.js / Tailwind. Architectures modulaires, scalables, orientées clean code et DDD.",
			},
			{
				t: "APIs performantes & sécurisées",
				d: "APIs Node.js ou Rust pensées pour scalabilité, sécurité et intégration multi-systèmes.",
			},
			{
				t: "Refonte & optimisation",
				d: "Performance, SEO, accessibilité et UX sur sites existants.",
			},
			{
				t: "Fonctionnalités métiers",
				d: "Modules spécifiques : tâches, abonnements, budgets, multi-comptes.",
			},
		],
	},
	{
		n: "02",
		title: "Mobile",
		accent: "#0C2E3D",
		icon: "/icons/smartphones.png",
		desc: "Natif ou cross - une finition qui tient en main.",
		items: [
			{
				t: "Android natif",
				d: "Apps optimisées avec intégration complète aux spécificités Android.",
			},
			{
				t: "Cross-platform",
				d: "React Native - une base, iOS + Android, expérience fluide.",
			},
			{
				t: "Publication & performance",
				d: "Déploiement stores, compatibilité et stabilité au long cours.",
			},
		],
	},
	{
		n: "03",
		title: "DevOps",
		accent: "#2E7D5A",
		icon: "/icons/continous.png",
		desc: "De la CI au run - tout est observable.",
		items: [
			{
				t: "CI/CD & automatisation",
				d: "GitHub Actions / GitLab CI / Jenkins : build, tests, déploiements avec rollback.",
			},
			{
				t: "Containerisation & orchestration",
				d: "Docker & Kubernetes : packaging, orchestration multi-services, montée en charge.",
			},
			{
				t: "Monitoring & observabilité",
				d: "Prometheus, Grafana, ELK, cloud-monitoring : fiabilité et proactivité.",
			},
			{
				t: "Cloud & IaC",
				d: "AWS, Azure, GCP avec Terraform - infra cloud public/privé.",
			},
		],
	},
	{
		n: "04",
		title: "IoT",
		accent: "#C08A1A",
		icon: "/icons/iot.png",
		desc: "Du capteur au dashboard.",
		items: [
			{
				t: "Prototypage & développement",
				d: "Systèmes embarqués Arduino, Raspberry Pi, ESP32.",
			},
			{
				t: "Connectivité & protocoles",
				d: "Capteurs, actionneurs, WiFi / Bluetooth / Zigbee.",
			},
			{
				t: "Applications IoT",
				d: "Collecte, traitement et visualisation des données temps réel.",
			},
			{
				t: "Sécurité & OTA",
				d: "Sécurisation des dispositifs et mises à jour à distance.",
			},
		],
	},
	{
		n: "05",
		title: "Salesforce",
		accent: "#0176D3",
		icon: "/salesforce.png",
		desc: "L’outil s’adapte au métier, pas l’inverse.",
		items: [
			{
				t: "Développement sur mesure",
				d: "Apps internes adaptées à vos besoins spécifiques.",
			},
			{
				t: "Automatisation des workflows",
				d: "Flows, Apex et LWC : processus intelligents qui fiabilisent l’exécution.",
			},
			{
				t: "Intégrations tierces",
				d: "Connexion Salesforce à vos outils via APIs, ERP et CRM.",
			},
		],
	},
];
