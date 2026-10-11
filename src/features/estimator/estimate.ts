export const APP_TYPES = ["vitrine", "cms", "webapp", "java", "autre"] as const;
export type AppType = (typeof APP_TYPES)[number];

export const TRAFFICS = ["faible", "moyen", "eleve", "tres-eleve"] as const;
export type Traffic = (typeof TRAFFICS)[number];

export const DATABASES = ["none", "postgres", "mysql", "mongo"] as const;
export type Database = (typeof DATABASES)[number];

export const DB_SIZES = ["petite", "moyenne", "grande"] as const;
export type DbSize = (typeof DB_SIZES)[number];

export const EXTRAS = ["redis", "worker", "search"] as const;
export type Extra = (typeof EXTRAS)[number];

export type Availability = "standard" | "critique";

export type EstimatorInput = {
	appType: AppType;
	appsCount: number;
	traffic: Traffic;
	database: Database;
	dbSize: DbSize;
	extras: Extra[];
	/** Fichiers envoyés par les utilisateurs (images, documents), en Go. */
	filesGb: number;
	preprod: boolean;
	availability: Availability;
};

export type BreakdownItem = { label: string; ramMb: number };

export type Estimate = {
	vcpu: number;
	ramGb: number;
	/** Mémoire nécessaire avant arrondi à une taille de serveur standard. */
	ramMb: number;
	diskGb: number;
	servers: 1 | 2;
	/** Application d'un autre type : pas d'estimation, un dimensionnement sur mesure. */
	custom: boolean;
	profile: string;
	breakdown: BreakdownItem[];
	notes: string[];
	/** `contact` : au-delà du périmètre d'un serveur, un échange est nécessaire. */
	verdict: "ok" | "contact";
	offer: "essentiel" | "pro" | "sur-mesure";
};

export const DEFAULT_INPUT: EstimatorInput = {
	appType: "webapp",
	appsCount: 1,
	traffic: "moyen",
	database: "postgres",
	dbSize: "petite",
	extras: [],
	filesGb: 0,
	preprod: false,
	availability: "standard",
};

export const APP_TYPE_LABELS: Record<AppType, string> = {
	vitrine: "Site vitrine statique",
	cms: "CMS ou e-commerce (WordPress, PrestaShop…)",
	webapp: "Application web ou API (Node.js, Python, Ruby…)",
	java: "Application Java ou .NET",
	autre: "Autre (application spécifique)",
};

export const TRAFFIC_LABELS: Record<Traffic, string> = {
	faible: "Moins de 5 000 visites par mois",
	moyen: "5 000 à 50 000 visites par mois",
	eleve: "50 000 à 500 000 visites par mois",
	"tres-eleve": "Plus de 500 000 visites par mois",
};

export const DATABASE_LABELS: Record<Database, string> = {
	none: "Aucune",
	postgres: "PostgreSQL",
	mysql: "MySQL ou MariaDB",
	mongo: "MongoDB",
};

export const DB_SIZE_LABELS: Record<DbSize, string> = {
	petite: "Petite (moins de 1 Go)",
	moyenne: "Moyenne (1 à 10 Go)",
	grande: "Grande (plus de 10 Go)",
};

export const EXTRA_LABELS: Record<Extra, string> = {
	redis: "Cache Redis",
	worker: "Workers et files de tâches",
	search: "Moteur de recherche",
};

/** Plateforme de déploiement, reverse proxy, agents de supervision et système. */
const PLATFORM_RAM_MB = 1536;
const HEADROOM = 1.3;
const PREPROD_SHARE = 0.5;

const APP_RAM_MB: Record<AppType, number> = {
	vitrine: 64,
	cms: 512,
	webapp: 512,
	java: 768,
	autre: 512,
};
const APP_CPU: Record<AppType, number> = {
	vitrine: 0.1,
	cms: 0.5,
	webapp: 0.5,
	java: 0.6,
	autre: 0.5,
};
const TRAFFIC_RAM: Record<Traffic, number> = {
	faible: 1,
	moyen: 1.25,
	eleve: 1.75,
	"tres-eleve": 2.5,
};
const TRAFFIC_CPU: Record<Traffic, number> = {
	faible: 0.4,
	moyen: 1,
	eleve: 2.5,
	"tres-eleve": 6,
};
const DB_RAM_MB: Record<DbSize, number> = {
	petite: 256,
	moyenne: 768,
	grande: 2048,
};
const DB_ENGINE_FACTOR: Record<Database, number> = {
	none: 0,
	postgres: 1,
	mysql: 1,
	mongo: 1.5,
};
const DB_DISK_GB: Record<DbSize, number> = {
	petite: 1,
	moyenne: 10,
	grande: 80,
};
const EXTRA_RAM_MB: Record<Extra, number> = {
	redis: 128,
	worker: 256,
	search: 1024,
};

const RAM_SIZES_GB = [2, 4, 8, 16, 32, 64] as const;
const VCPU_SIZES = [2, 4, 8, 16] as const;
const DISK_SIZES_GB = [40, 80, 160, 320, 640, 1280] as const;

const MAX_ONE_SERVER_RAM_GB = 32;

const smallestAtLeast = <T extends number>(sizes: readonly T[], need: number) =>
	sizes.find((s) => s >= need) ?? sizes[sizes.length - 1];

const profileFor = (ramGb: number) =>
	ramGb <= 2
		? "Léger"
		: ramGb <= 4
			? "Standard"
			: ramGb <= 8
				? "Confortable"
				: ramGb <= 16
					? "Puissant"
					: "Gros volume";

function ramBreakdown(input: EstimatorInput): BreakdownItem[] {
	const apps = Math.round(
		APP_RAM_MB[input.appType] * TRAFFIC_RAM[input.traffic] * input.appsCount,
	);
	const dbTrafficFactor =
		input.traffic === "eleve" || input.traffic === "tres-eleve" ? 1.5 : 1;
	const db = Math.round(
		DB_RAM_MB[input.dbSize] *
			DB_ENGINE_FACTOR[input.database] *
			dbTrafficFactor,
	);

	const items: BreakdownItem[] = [
		{ label: "Plateforme et système", ramMb: PLATFORM_RAM_MB },
		{ label: "Application(s)", ramMb: apps },
	];
	if (db > 0) items.push({ label: "Base de données", ramMb: db });
	for (const extra of input.extras) {
		items.push({ label: EXTRA_LABELS[extra], ramMb: EXTRA_RAM_MB[extra] });
	}
	if (input.preprod) {
		items.push({
			label: "Préproduction",
			ramMb: Math.round((apps + db) * PREPROD_SHARE),
		});
	}
	return items;
}

function diskGb(input: EstimatorInput): number {
	const db = input.database === "none" ? 0 : DB_DISK_GB[input.dbSize] * 2.5;
	const raw = 20 + 5 * input.appsCount + db + input.filesGb * 1.2;
	return smallestAtLeast(DISK_SIZES_GB, raw * 1.25);
}

function notesFor(
	input: EstimatorInput,
	verdict: Estimate["verdict"],
): string[] {
	const notes: string[] = [];
	if (input.availability === "critique") {
		notes.push(
			"Une activité critique demande de la haute disponibilité : deux serveurs et un répartiteur de charge, à valider ensemble.",
		);
	}
	if (input.traffic === "tres-eleve") {
		notes.push(
			"Au-delà de 500 000 visites par mois, un test de charge est recommandé avant de fixer la taille du serveur.",
		);
	}
	if (input.database !== "none" && input.dbSize === "grande") {
		notes.push(
			"Une grande base de données justifie un stockage NVMe et des sauvegardes incrémentales.",
		);
	}
	if (input.preprod) {
		notes.push("La préproduction est incluse dans ce dimensionnement.");
	}
	if (input.appType === "autre") {
		notes.push(
			"Une application spécifique se dimensionne avec vous, à partir de son fonctionnement réel.",
		);
	} else if (verdict === "contact") {
		notes.push(
			"Ce volume dépasse ce qu'un seul serveur couvre sereinement : un échange permet de définir l'architecture.",
		);
	}
	return notes;
}

function offerFor(
	input: EstimatorInput,
	verdict: Estimate["verdict"],
): Estimate["offer"] {
	if (
		input.availability === "critique" ||
		verdict === "contact" ||
		input.appsCount >= 4
	) {
		return "sur-mesure";
	}
	return input.appsCount >= 2 || input.preprod ? "pro" : "essentiel";
}

/** Estimation indicative : à confirmer par la mesure sur l'application réelle. */
export function estimateResources(input: EstimatorInput): Estimate {
	const breakdown = ramBreakdown(input);
	const [platform, ...workload] = breakdown;
	const workloadMb = workload.reduce((n, b) => n + b.ramMb, 0);
	const ramMb = Math.round(platform.ramMb + workloadMb * HEADROOM);
	const ramGb = smallestAtLeast(RAM_SIZES_GB, ramMb / 1024);

	const cpuNeed =
		0.5 + input.appsCount * APP_CPU[input.appType] * TRAFFIC_CPU[input.traffic];
	const vcpu = smallestAtLeast(VCPU_SIZES, cpuNeed);

	const custom = input.appType === "autre";
	const verdict: Estimate["verdict"] =
		custom ||
		input.traffic === "tres-eleve" ||
		ramGb > MAX_ONE_SERVER_RAM_GB ||
		(input.dbSize === "grande" &&
			input.database !== "none" &&
			input.traffic === "eleve")
			? "contact"
			: "ok";

	return {
		vcpu,
		ramGb,
		ramMb,
		diskGb: diskGb(input),
		servers: input.availability === "critique" ? 2 : 1,
		custom,
		profile: profileFor(ramGb),
		breakdown,
		notes: notesFor(input, verdict),
		verdict,
		offer: offerFor(input, verdict),
	};
}

/** Résumé en une phrase, utilisé pour préremplir le formulaire de contact. */
export function formatEstimate(input: EstimatorInput, e: Estimate): string {
	if (e.custom) {
		return "Mon application est d'un autre type : j'ai besoin d'un dimensionnement sur mesure.";
	}
	const apps = `${input.appsCount} application${input.appsCount > 1 ? "s" : ""}`;
	const servers = e.servers > 1 ? ` (×${e.servers} serveurs)` : "";
	return [
		`Estimation de ressources : ${e.vcpu} vCPU, ${e.ramGb} Go de RAM, ${e.diskGb} Go de disque${servers}.`,
		`Contexte : ${apps} (${APP_TYPE_LABELS[input.appType]}), ${TRAFFIC_LABELS[input.traffic].toLowerCase()}, base de données : ${DATABASE_LABELS[input.database]}.`,
	].join(" ");
}
