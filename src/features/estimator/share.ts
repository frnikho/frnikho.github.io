import {
	COMPONENT_KINDS,
	type ComponentKind,
	DEFAULT_STATE,
	type EstimatorState,
	KINDS,
	LIMITS,
	type StackComponent,
	snapGrowth,
} from "@/features/estimator/catalog";

/** Paramètres d'URL de l'estimateur : courts, pour un lien partageable lisible. */
export type EstimatorSearch = {
	/** Stack : `type.instances.donnees` séparés par des virgules. */
	s?: string;
	/** Visites par mois. */
	v?: number;
	/** Fichiers des utilisateurs, en Go. */
	f?: number;
	/** Préproduction (1). */
	p?: number;
	/** Activité critique (1). */
	c?: number;
	/** Croissance simulée. */
	g?: number;
};

const clamp = (n: number, min: number, max: number) =>
	Math.min(max, Math.max(min, n));

const toNumber = (value: unknown): number | undefined => {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? n : undefined;
};

const isKind = (value: string): value is ComponentKind =>
	(COMPONENT_KINDS as readonly string[]).includes(value);

function parseComponent(token: string): StackComponent | null {
	const [kind, replicas, dataGb] = token.split(".");
	if (!kind || !isKind(kind)) return null;
	const spec = KINDS[kind];
	return {
		kind,
		replicas: spec.scalable
			? clamp(Math.round(toNumber(replicas) ?? 1), 1, LIMITS.replicas)
			: 1,
		dataGb: spec.hasData
			? clamp(Math.round(toNumber(dataGb) ?? 1), 0, LIMITS.dataGb)
			: 0,
	};
}

export function parseStack(raw: string): StackComponent[] {
	return raw
		.split(",")
		.map((t) => parseComponent(t.trim()))
		.filter((c): c is StackComponent => c !== null)
		.slice(0, LIMITS.components);
}

/** Valide des paramètres d'URL non fiables, avec repli sur l'état par défaut. */
export function validateEstimatorSearch(
	search: Record<string, unknown>,
): EstimatorSearch {
	const out: EstimatorSearch = {};
	if (typeof search.s === "string") out.s = search.s.slice(0, 400);
	for (const key of ["v", "f", "p", "c", "g"] as const) {
		const n = toNumber(search[key]);
		if (n !== undefined) out[key] = n;
	}
	return out;
}

export function decodeState(search: EstimatorSearch): EstimatorState {
	const d = DEFAULT_STATE.workload;
	return {
		stack: search.s !== undefined ? parseStack(search.s) : DEFAULT_STATE.stack,
		workload: {
			monthlyVisits: Math.round(
				clamp(
					search.v ?? d.monthlyVisits,
					LIMITS.visits.min,
					LIMITS.visits.max,
				),
			),
			filesGb: Math.round(clamp(search.f ?? d.filesGb, 0, LIMITS.filesGb)),
			preprod: search.p === 1,
			critical: search.c === 1,
			growth: snapGrowth(
				clamp(search.g ?? d.growth, LIMITS.growth.min, LIMITS.growth.max),
			),
		},
	};
}

const encodeComponent = (c: StackComponent) => {
	const spec = KINDS[c.kind];
	if (spec.hasData) return `${c.kind}.1.${c.dataGb}`;
	return spec.scalable && c.replicas > 1 ? `${c.kind}.${c.replicas}` : c.kind;
};

export function encodeState(state: EstimatorState): EstimatorSearch {
	const w = state.workload;
	return {
		s: state.stack.map(encodeComponent).join(","),
		v: w.monthlyVisits,
		f: w.filesGb || undefined,
		p: w.preprod ? 1 : undefined,
		c: w.critical ? 1 : undefined,
		g: w.growth > 1 ? w.growth : undefined,
	};
}

/** Chaîne de requête du lien partagé, lisible par le routeur au retour. */
export function toQueryString(search: EstimatorSearch): string {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(search)) {
		if (value !== undefined) params.set(key, String(value));
	}
	return params.toString();
}
