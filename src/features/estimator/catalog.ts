import type { IconName } from "@/components/diagrams/types";

/** Familles de composants : elles portent la couleur dans les graphiques. */
export const CATEGORIES = ["app", "data", "service"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
	app: "Applications",
	data: "Données",
	service: "Services",
};

export const COMPONENT_KINDS = [
	"static",
	"php",
	"node",
	"java",
	"worker",
	"postgres",
	"mysql",
	"mongo",
	"redis",
	"search",
] as const;
export type ComponentKind = (typeof COMPONENT_KINDS)[number];

export type KindSpec = {
	label: string;
	hint: string;
	category: Category;
	icon: IconName;
	/** Mémoire au repos, en Mo, pour une instance. */
	ramMb: number;
	/** Mémoire ajoutée par Go de données (bases, index de recherche). */
	ramPerGbMb?: number;
	/** Plafond de la mémoire liée aux données : le cache utile ne suit pas tout le volume. */
	dataRamCapMb?: number;
	/** vCPU consommés par instance, à charge de référence. */
	cpu: number;
	/** Part de la charge qui pèse sur ce composant (0 : insensible au trafic). */
	loadShare: number;
	/** Disque de l'image et des journaux, en Go. */
	diskGb: number;
	/** Multiplicateur disque appliqué aux données (index, WAL, copies locales). */
	dataDiskFactor?: number;
	/** `true` : le composant porte un volume de données réglable. */
	hasData: boolean;
	/** `true` : plusieurs instances possibles. */
	scalable: boolean;
};

export const KINDS: Record<ComponentKind, KindSpec> = {
	static: {
		label: "Site statique",
		hint: "HTML, Astro, Hugo, SPA",
		category: "app",
		icon: "globe",
		ramMb: 64,
		cpu: 0.1,
		loadShare: 0.3,
		diskGb: 1,
		hasData: false,
		scalable: true,
	},
	php: {
		label: "PHP",
		hint: "WordPress, Laravel, PrestaShop",
		category: "app",
		icon: "layers",
		ramMb: 512,
		cpu: 0.5,
		loadShare: 1,
		diskGb: 5,
		hasData: false,
		scalable: true,
	},
	node: {
		label: "Application web ou API",
		hint: "Node.js, Python, Ruby, Go",
		category: "app",
		icon: "box",
		ramMb: 512,
		cpu: 0.5,
		loadShare: 1,
		diskGb: 5,
		hasData: false,
		scalable: true,
	},
	java: {
		label: "Java ou .NET",
		hint: "Spring, Quarkus, ASP.NET",
		category: "app",
		icon: "cpu",
		ramMb: 768,
		cpu: 0.6,
		loadShare: 1,
		diskGb: 5,
		hasData: false,
		scalable: true,
	},
	worker: {
		label: "Worker",
		hint: "Tâches de fond, files, cron",
		category: "service",
		icon: "sync",
		ramMb: 256,
		cpu: 0.4,
		loadShare: 0.5,
		diskGb: 2,
		hasData: false,
		scalable: true,
	},
	postgres: {
		label: "PostgreSQL",
		hint: "Base relationnelle",
		category: "data",
		icon: "database",
		ramMb: 256,
		ramPerGbMb: 80,
		dataRamCapMb: 4096,
		cpu: 0.2,
		loadShare: 0.6,
		diskGb: 1,
		dataDiskFactor: 2.5,
		hasData: true,
		scalable: false,
	},
	mysql: {
		label: "MySQL ou MariaDB",
		hint: "Base relationnelle",
		category: "data",
		icon: "database",
		ramMb: 256,
		ramPerGbMb: 80,
		dataRamCapMb: 4096,
		cpu: 0.2,
		loadShare: 0.6,
		diskGb: 1,
		dataDiskFactor: 2.5,
		hasData: true,
		scalable: false,
	},
	mongo: {
		label: "MongoDB",
		hint: "Base documents",
		category: "data",
		icon: "database",
		ramMb: 384,
		ramPerGbMb: 120,
		dataRamCapMb: 6144,
		cpu: 0.25,
		loadShare: 0.6,
		diskGb: 1,
		dataDiskFactor: 2.5,
		hasData: true,
		scalable: false,
	},
	redis: {
		label: "Redis",
		hint: "Cache, sessions, files",
		category: "service",
		icon: "zap",
		ramMb: 128,
		cpu: 0.1,
		loadShare: 0.3,
		diskGb: 1,
		hasData: false,
		scalable: false,
	},
	search: {
		label: "Moteur de recherche",
		hint: "Meilisearch, OpenSearch",
		category: "data",
		icon: "eye",
		ramMb: 1024,
		ramPerGbMb: 100,
		dataRamCapMb: 4096,
		cpu: 0.3,
		loadShare: 0.4,
		diskGb: 2,
		dataDiskFactor: 1.5,
		hasData: true,
		scalable: false,
	},
};

export type StackComponent = {
	kind: ComponentKind;
	/** Nombre d'instances (applications et workers). */
	replicas: number;
	/** Volume de données, en Go (bases et index). */
	dataGb: number;
};

export type Workload = {
	monthlyVisits: number;
	/** Fichiers envoyés par les utilisateurs (images, documents), en Go. */
	filesGb: number;
	preprod: boolean;
	critical: boolean;
	/** Multiplicateur de croissance simulé (×1 : aujourd'hui). */
	growth: number;
};

export type EstimatorState = { stack: StackComponent[]; workload: Workload };

/** Paliers de croissance simulés. */
export const GROWTH_STEPS = [1, 1.5, 2, 3, 5, 7, 10, 15, 20] as const;

/** Index de la valeur de `steps` la plus proche de `value`. */
export function nearestIndex(steps: readonly number[], value: number): number {
	let best = 0;
	for (let i = 1; i < steps.length; i++) {
		if (Math.abs(steps[i] - value) < Math.abs(steps[best] - value)) best = i;
	}
	return best;
}

/** Palier le plus proche d'un multiplicateur quelconque. */
export const snapGrowth = (g: number) =>
	GROWTH_STEPS[nearestIndex(GROWTH_STEPS, g)];

export const LIMITS = {
	components: 12,
	replicas: 10,
	dataGb: 500,
	filesGb: 2000,
	visits: { min: 500, max: 5_000_000 },
	growth: { min: 1, max: 20 },
} as const;

export type Preset = {
	id: string;
	label: string;
	icon: IconName;
	state: EstimatorState;
};

const workload = (monthlyVisits: number, filesGb = 0): Workload => ({
	monthlyVisits,
	filesGb,
	preprod: false,
	critical: false,
	growth: 1,
});

const c = (kind: ComponentKind, replicas = 1, dataGb = 0): StackComponent => ({
	kind,
	replicas,
	dataGb,
});

/** Stacks types pour démarrer en un clic. */
export const PRESETS: Preset[] = [
	{
		id: "vitrine",
		label: "Site vitrine",
		icon: "globe",
		state: { stack: [c("static")], workload: workload(3_000) },
	},
	{
		id: "wordpress",
		label: "WordPress ou e-commerce",
		icon: "layers",
		state: {
			stack: [c("php"), c("mysql", 1, 3), c("redis")],
			workload: workload(20_000, 20),
		},
	},
	{
		id: "saas",
		label: "SaaS",
		icon: "box",
		state: {
			stack: [c("node", 2), c("worker"), c("postgres", 1, 10), c("redis")],
			workload: workload(50_000, 10),
		},
	},
	{
		id: "api",
		label: "API et traitements",
		icon: "sync",
		state: {
			stack: [c("node"), c("worker", 3), c("postgres", 1, 20), c("redis")],
			workload: workload(30_000),
		},
	},
	{
		id: "metier",
		label: "Application métier Java",
		icon: "cpu",
		state: {
			stack: [c("java"), c("postgres", 1, 15), c("search", 1, 2)],
			workload: workload(10_000, 50),
		},
	},
];

export const DEFAULT_STATE: EstimatorState = {
	stack: [c("node"), c("postgres", 1, 1)],
	workload: workload(20_000),
};
