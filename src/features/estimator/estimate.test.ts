import { describe, expect, it } from "vitest";
import {
	DEFAULT_STATE,
	type EstimatorState,
	PRESETS,
	type StackComponent,
	type Workload,
} from "./catalog";
import {
	estimateStack,
	formatEstimate,
	growthCurve,
	loadFactors,
	PLATFORM,
	upgradePoints,
} from "./estimate";

const state = (
	stack: StackComponent[],
	workload: Partial<Workload> = {},
): EstimatorState => ({
	stack,
	workload: { ...DEFAULT_STATE.workload, ...workload },
});

const c = (
	kind: StackComponent["kind"],
	replicas = 1,
	dataGb = 0,
): StackComponent => ({ kind, replicas, dataGb });

describe("loadFactors", () => {
	it("croît avec la fréquentation, sans saut", () => {
		const visits = [500, 5_000, 20_000, 50_000, 200_000, 5_000_000, 9e6];
		const factors = visits.map(loadFactors);
		for (let i = 1; i < factors.length; i++) {
			expect(factors[i].ram).toBeGreaterThanOrEqual(factors[i - 1].ram);
			expect(factors[i].cpu).toBeGreaterThanOrEqual(factors[i - 1].cpu);
		}
		expect(loadFactors(50_000)).toEqual({ ram: 1.25, cpu: 1 });
	});
});

describe("estimateStack", () => {
	it("recommande un petit serveur pour un site vitrine peu visité", () => {
		const r = estimateStack(state([c("static")], { monthlyVisits: 3_000 }));
		expect(r.vcpu).toBe(2);
		expect(r.ramGb).toBe(2);
		expect(r.topology).toBe("single");
		expect(r.verdict).toBe("ok");
		expect(r.offer).toBe("essentiel");
	});

	it("ne descend jamais sous la base de la plateforme de déploiement", () => {
		const r = estimateStack(state([]));
		expect(r.need.ramMb).toBe(PLATFORM.ramMb);
		expect(r.notes.join(" ")).toMatch(/Ajoutez au moins un composant/);
	});

	it("arrondit aux tailles de serveur standard, marge comprise", () => {
		const r = estimateStack(DEFAULT_STATE);
		expect([2, 4, 8, 16, 32]).toContain(r.ramGb);
		expect(r.ramGb * 1024).toBeGreaterThanOrEqual(r.need.ramMb);
		expect(r.vcpu).toBeGreaterThanOrEqual(r.need.cpu);
		expect(r.diskGb).toBeGreaterThanOrEqual(r.need.diskGb);
	});

	it("multiplie la charge par le nombre d'instances", () => {
		const one = estimateStack(state([c("node", 1)]));
		const three = estimateStack(state([c("node", 3)]));
		expect(three.components[0].ramMb).toBe(one.components[0].ramMb * 3);
	});

	it("ignore les instances multiples d'une base de données", () => {
		const r = estimateStack(state([c("postgres", 5, 10)]));
		const single = estimateStack(state([c("postgres", 1, 10)]));
		expect(r.components[0].ramMb).toBe(single.components[0].ramMb);
	});

	it("dimensionne le disque d'après les données et les fichiers", () => {
		const small = estimateStack(state([c("postgres", 1, 1)]));
		const big = estimateStack(state([c("postgres", 1, 100)], { filesGb: 200 }));
		expect(big.diskGb).toBeGreaterThan(small.diskGb);
		expect(big.filesDiskGb).toBe(240);
	});

	it("ajoute la préproduction et oriente vers Pro", () => {
		const without = estimateStack(state([c("node"), c("postgres", 1, 2)]));
		const withPreprod = estimateStack(
			state([c("node"), c("postgres", 1, 2)], { preprod: true }),
		);
		expect(withPreprod.preprod).not.toBeNull();
		expect(withPreprod.need.ramMb).toBeGreaterThan(without.need.ramMb);
		expect(withPreprod.offer).toBe("pro");
	});

	it("passe à deux serveurs pour une activité critique", () => {
		const r = estimateStack(state([c("node")], { critical: true }));
		expect(r.servers).toBe(2);
		expect(r.topology).toBe("ha");
		expect(r.offer).toBe("sur-mesure");
	});

	it("bascule en cluster au-delà de ce qu'un serveur couvre", () => {
		const r = estimateStack(
			state([c("java", 10), c("worker", 10), c("postgres", 1, 300)], {
				monthlyVisits: 5_000_000,
			}),
		);
		expect(r.topology).toBe("cluster");
		expect(r.verdict).toBe("contact");
		expect(r.offer).toBe("sur-mesure");
	});

	it("applique la croissance au trafic et aux données", () => {
		const s = state([c("node"), c("postgres", 1, 10)], { filesGb: 10 });
		const today = estimateStack(s);
		const later = estimateStack(s, 10);
		expect(later.need.ramMb).toBeGreaterThan(today.need.ramMb);
		expect(later.filesDiskGb).toBe(today.filesDiskGb * 10);
		expect(later.peakRps).toBeCloseTo(today.peakRps * 10);
	});

	it("produit une estimation valide pour chaque stack type", () => {
		for (const p of PRESETS) {
			const r = estimateStack(p.state);
			expect(r.components).toHaveLength(p.state.stack.length);
			expect(r.verdict, p.id).toBe("ok");
		}
	});
});

describe("growthCurve", () => {
	it("ne réduit jamais le serveur quand la charge augmente", () => {
		const curve = growthCurve(PRESETS[2].state);
		for (let i = 1; i < curve.length; i++) {
			expect(curve[i].ramNeedGb).toBeGreaterThanOrEqual(curve[i - 1].ramNeedGb);
			expect(curve[i].ramGb).toBeGreaterThanOrEqual(curve[i - 1].ramGb);
		}
	});

	it("signale les paliers où le serveur doit changer", () => {
		const curve = growthCurve(PRESETS[2].state);
		const ups = upgradePoints(curve);
		expect(ups.length).toBeGreaterThan(0);
		for (const u of ups) expect(u.growth).toBeGreaterThan(1);
	});
});

describe("formatEstimate", () => {
	it("résume la stack et tient dans le champ du formulaire de contact", () => {
		const s = state([c("node", 2), c("postgres", 1, 10), c("redis")], {
			preprod: true,
		});
		const text = formatEstimate(s, estimateStack(s));
		expect(text).toMatch(/vCPU/);
		expect(text).toMatch(/Application web ou API ×2/);
		expect(text).toMatch(/PostgreSQL \(10 Go\)/);
		expect(text).toMatch(/préproduction/);
		expect(text.length).toBeLessThanOrEqual(600);
	});
});
