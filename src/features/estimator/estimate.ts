import {
	type Category,
	type EstimatorState,
	GROWTH_STEPS,
	KINDS,
	type StackComponent,
	type Workload,
} from "@/features/estimator/catalog";

/** Plateforme de déploiement, reverse proxy, agents de supervision et système. */
export const PLATFORM = { ramMb: 1536, cpu: 0.5, diskGb: 20 } as const;
/** Marge appliquée à la charge pour absorber les pics. */
export const HEADROOM = 1.3;
const PREPROD_SHARE = 0.5;
const FILES_DISK_FACTOR = 1.2;
const DISK_HEADROOM = 1.25;

/** Requêtes applicatives par visite et rapport pointe / moyenne. */
const REQUESTS_PER_VISIT = 20;
const PEAK_RATIO = 6;
const SECONDS_PER_MONTH = 30 * 24 * 3600;

const RAM_SIZES_GB = [2, 4, 8, 16, 32] as const;
const VCPU_SIZES = [2, 4, 8, 16] as const;
const DISK_SIZES_GB = [40, 80, 160, 320, 640, 1280] as const;

/**
 * Facteurs de charge selon la fréquentation, interpolés sur une échelle
 * logarithmique entre des points de référence mesurés sur des profils types.
 */
const LOAD_ANCHORS = [
	{ visits: 1_000, ram: 1, cpu: 0.3 },
	{ visits: 5_000, ram: 1, cpu: 0.4 },
	{ visits: 50_000, ram: 1.25, cpu: 1 },
	{ visits: 500_000, ram: 1.75, cpu: 2.5 },
	{ visits: 5_000_000, ram: 3, cpu: 8 },
] as const;

export function loadFactors(visits: number): { ram: number; cpu: number } {
	const first = LOAD_ANCHORS[0];
	const last = LOAD_ANCHORS[LOAD_ANCHORS.length - 1];
	if (visits <= first.visits) return { ram: first.ram, cpu: first.cpu };
	if (visits >= last.visits) return { ram: last.ram, cpu: last.cpu };
	const i = LOAD_ANCHORS.findIndex((a) => a.visits >= visits);
	const a = LOAD_ANCHORS[i - 1];
	const b = LOAD_ANCHORS[i];
	const t =
		(Math.log10(visits) - Math.log10(a.visits)) /
		(Math.log10(b.visits) - Math.log10(a.visits));
	return { ram: a.ram + (b.ram - a.ram) * t, cpu: a.cpu + (b.cpu - a.cpu) * t };
}

export const peakRps = (visits: number) =>
	(visits * REQUESTS_PER_VISIT * PEAK_RATIO) / SECONDS_PER_MONTH;

export type Load = { ramMb: number; cpu: number; diskGb: number };

export type ComponentLoad = Load & {
	index: number;
	label: string;
	category: Category;
};

export type Topology = "single" | "ha" | "cluster";

export type Estimate = {
	vcpu: number;
	ramGb: number;
	diskGb: number;
	/** Besoins avant arrondi aux tailles standard, marge comprise. */
	need: Load;
	platform: Load;
	components: ComponentLoad[];
	preprod: Load | null;
	/** Fichiers des utilisateurs, disque seulement. */
	filesDiskGb: number;
	/** Part de la mémoire réservée aux pics. */
	headroomMb: number;
	peakRps: number;
	servers: 1 | 2;
	topology: Topology;
	profile: string;
	notes: string[];
	/** `contact` : au-delà du périmètre d'un serveur, un échange est nécessaire. */
	verdict: "ok" | "contact";
	offer: "essentiel" | "pro" | "sur-mesure";
};

const smallestAtLeast = <T extends number>(sizes: readonly T[], need: number) =>
	sizes.find((s) => s >= need) ?? sizes[sizes.length - 1];

const round1 = (n: number) => Math.round(n * 10) / 10;

const profileFor = (ramGb: number, topology: Topology) =>
	topology === "cluster"
		? "Cluster"
		: ramGb <= 2
			? "Léger"
			: ramGb <= 4
				? "Standard"
				: ramGb <= 8
					? "Confortable"
					: ramGb <= 16
						? "Puissant"
						: "Gros volume";

function componentLoad(
	c: StackComponent,
	index: number,
	w: Workload,
	growth: number,
): ComponentLoad {
	const spec = KINDS[c.kind];
	const f = loadFactors(w.monthlyVisits * growth);
	const share = (factor: number) => 1 + (factor - 1) * spec.loadShare;
	const replicas = spec.scalable ? c.replicas : 1;
	const dataGb = spec.hasData ? c.dataGb * growth : 0;
	const dataRamMb = Math.min(
		(spec.ramPerGbMb ?? 0) * dataGb,
		spec.dataRamCapMb ?? Number.POSITIVE_INFINITY,
	);
	const ramMb = (spec.ramMb + dataRamMb) * share(f.ram) * replicas;
	const cpu = spec.cpu * Math.max(0.3, f.cpu * spec.loadShare) * replicas;
	const diskGb = spec.diskGb * replicas + dataGb * (spec.dataDiskFactor ?? 0);
	return {
		index,
		label: spec.label,
		category: spec.category,
		ramMb: Math.round(ramMb),
		cpu: round1(cpu),
		diskGb: Math.round(diskGb),
	};
}

const sum = (loads: Load[]): Load => ({
	ramMb: loads.reduce((n, l) => n + l.ramMb, 0),
	cpu: loads.reduce((n, l) => n + l.cpu, 0),
	diskGb: loads.reduce((n, l) => n + l.diskGb, 0),
});

const appInstances = (stack: StackComponent[]) =>
	stack
		.filter((c) => KINDS[c.kind].category === "app")
		.reduce((n, c) => n + c.replicas, 0);

function notesFor(state: EstimatorState, e: Omit<Estimate, "notes">) {
	const { workload: w, stack } = state;
	const notes: string[] = [];
	if (stack.length === 0) {
		notes.push("Ajoutez au moins un composant pour estimer votre stack.");
	}
	if (e.topology === "cluster") {
		notes.push(
			"Ce volume dépasse ce qu'un seul serveur couvre sereinement : plusieurs nœuds, voire un cluster Kubernetes, sont à étudier ensemble.",
		);
	} else if (w.critical) {
		notes.push(
			"Activité critique : deux serveurs et un répartiteur de charge, avec réplication de la base de données.",
		);
	}
	if (w.monthlyVisits * w.growth >= 500_000) {
		notes.push(
			"À ce niveau de trafic, un test de charge est recommandé avant de fixer la taille du serveur.",
		);
	}
	if (stack.some((c) => KINDS[c.kind].hasData && c.dataGb * w.growth > 50)) {
		notes.push(
			"Un gros volume de données justifie un stockage NVMe et des sauvegardes incrémentales.",
		);
	}
	if (w.preprod) {
		notes.push("La préproduction est incluse dans ce dimensionnement.");
	}
	return notes;
}

function offerFor(state: EstimatorState, verdict: Estimate["verdict"]) {
	const apps = appInstances(state.stack);
	if (state.workload.critical || verdict === "contact" || apps >= 4) {
		return "sur-mesure" as const;
	}
	return apps >= 2 || state.workload.preprod ? "pro" : "essentiel";
}

/**
 * Estimation indicative d'une stack, à `growth` fois la charge actuelle.
 * À confirmer par la mesure sur l'application réelle.
 */
export function estimateStack(state: EstimatorState, growth = 1): Estimate {
	const w = state.workload;
	const components = state.stack.map((c, i) => componentLoad(c, i, w, growth));
	const work = sum(components);
	const runtime = sum(components.filter((c) => c.category !== "data"));
	const preprod: Load | null = w.preprod
		? {
				ramMb: Math.round(work.ramMb * PREPROD_SHARE),
				cpu: round1(runtime.cpu * PREPROD_SHARE * 0.5),
				diskGb: Math.round(work.diskGb * PREPROD_SHARE),
			}
		: null;
	const loaded = sum(preprod ? [work, preprod] : [work]);
	const filesDiskGb = Math.round(w.filesGb * growth * FILES_DISK_FACTOR);

	const need: Load = {
		ramMb: Math.round(PLATFORM.ramMb + loaded.ramMb * HEADROOM),
		cpu: round1(PLATFORM.cpu + loaded.cpu * HEADROOM),
		diskGb: Math.round(
			(PLATFORM.diskGb + loaded.diskGb + filesDiskGb) * DISK_HEADROOM,
		),
	};
	const cluster =
		need.ramMb / 1024 > RAM_SIZES_GB[RAM_SIZES_GB.length - 1] ||
		need.cpu > VCPU_SIZES[VCPU_SIZES.length - 1];
	const topology: Topology = cluster ? "cluster" : w.critical ? "ha" : "single";
	const ramGb = smallestAtLeast(RAM_SIZES_GB, need.ramMb / 1024);
	const verdict = cluster ? "contact" : "ok";

	const base = {
		vcpu: smallestAtLeast(VCPU_SIZES, need.cpu),
		ramGb,
		diskGb: smallestAtLeast(DISK_SIZES_GB, need.diskGb),
		need,
		platform: { ...PLATFORM },
		components,
		preprod,
		filesDiskGb,
		headroomMb: Math.round(loaded.ramMb * (HEADROOM - 1)),
		peakRps: peakRps(w.monthlyVisits * growth),
		servers: (w.critical ? 2 : 1) as 1 | 2,
		topology,
		profile: profileFor(ramGb, topology),
		verdict,
		offer: offerFor(state, verdict),
	} satisfies Omit<Estimate, "notes">;
	return { ...base, notes: notesFor(state, base) };
}

export type GrowthPoint = {
	growth: number;
	visits: number;
	ramNeedGb: number;
	ramGb: number;
	vcpu: number;
	topology: Topology;
};

/** Besoins à chaque palier de croissance : trafic, données et fichiers suivent. */
export function growthCurve(state: EstimatorState): GrowthPoint[] {
	return GROWTH_STEPS.map((growth) => {
		const e = estimateStack(state, growth);
		return {
			growth,
			visits: state.workload.monthlyVisits * growth,
			ramNeedGb: round1(e.need.ramMb / 1024),
			ramGb: e.ramGb,
			vcpu: e.vcpu,
			topology: e.topology,
		};
	});
}

/** Paliers où le serveur doit changer de taille ou d'architecture. */
export function upgradePoints(curve: GrowthPoint[]): GrowthPoint[] {
	return curve.filter(
		(p, i) =>
			i > 0 &&
			(p.ramGb !== curve[i - 1].ramGb ||
				p.vcpu !== curve[i - 1].vcpu ||
				p.topology !== curve[i - 1].topology),
	);
}

export const formatVisits = (n: number) =>
	new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
		Math.round(n),
	);

export const formatGrowth = (g: number) => `×${String(g).replace(".", ",")}`;

const describeComponent = (c: StackComponent) => {
	const spec = KINDS[c.kind];
	const parts = [spec.label];
	if (spec.scalable && c.replicas > 1) parts.push(`×${c.replicas}`);
	if (spec.hasData && c.dataGb > 0) parts.push(`(${c.dataGb} Go)`);
	return parts.join(" ");
};

/** Résumé en une phrase, utilisé pour préremplir le formulaire de contact. */
export function formatEstimate(state: EstimatorState, e: Estimate): string {
	const servers = e.servers > 1 ? ` (×${e.servers} serveurs)` : "";
	const stack =
		state.stack.length > 0
			? state.stack.map(describeComponent).join(", ")
			: "à définir";
	const extras = [
		state.workload.preprod && "préproduction",
		state.workload.critical && "activité critique",
	].filter(Boolean);
	return [
		e.topology === "cluster"
			? "Estimation : au-delà d'un serveur, architecture à définir."
			: `Estimation : ${e.vcpu} vCPU, ${e.ramGb} Go de RAM, ${e.diskGb} Go de disque${servers}.`,
		`Stack : ${stack}.`,
		`Trafic : ${formatVisits(state.workload.monthlyVisits)} visites par mois.`,
		extras.length > 0 ? `Avec ${extras.join(" et ")}.` : "",
	]
		.filter(Boolean)
		.join(" ");
}
