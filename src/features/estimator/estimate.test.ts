import { describe, expect, it } from "vitest";
import {
	DEFAULT_INPUT,
	type EstimatorInput,
	estimateResources,
	formatEstimate,
} from "./estimate";

const input = (patch: Partial<EstimatorInput> = {}): EstimatorInput => ({
	...DEFAULT_INPUT,
	...patch,
});

describe("estimateResources", () => {
	it("recommande un petit serveur pour un site vitrine peu visité", () => {
		const r = estimateResources(
			input({
				appType: "vitrine",
				traffic: "faible",
				database: "none",
				extras: [],
			}),
		);
		expect(r.vcpu).toBe(2);
		expect(r.ramGb).toBe(2);
		expect(r.servers).toBe(1);
		expect(r.verdict).toBe("ok");
		expect(r.offer).toBe("essentiel");
	});

	it("ne descend jamais sous la base de la plateforme de déploiement", () => {
		const r = estimateResources(
			input({ appType: "vitrine", database: "none" }),
		);
		expect(r.ramMb).toBeGreaterThanOrEqual(1536);
		expect(r.ramGb).toBeGreaterThanOrEqual(2);
	});

	it("arrondit à une taille de serveur standard", () => {
		const r = estimateResources(input());
		expect([2, 4, 8, 16, 32, 64]).toContain(r.ramGb);
		expect([2, 4, 8, 16]).toContain(r.vcpu);
		expect(r.ramGb * 1024).toBeGreaterThanOrEqual(r.ramMb);
	});

	it("augmente les ressources avec le trafic", () => {
		const low = estimateResources(input({ traffic: "faible" }));
		const high = estimateResources(input({ traffic: "eleve" }));
		expect(high.ramMb).toBeGreaterThan(low.ramMb);
		expect(high.vcpu).toBeGreaterThanOrEqual(low.vcpu);
	});

	it("ajoute la base de données et ses extras au détail", () => {
		const r = estimateResources(
			input({ database: "postgres", dbSize: "moyenne", extras: ["redis"] }),
		);
		const labels = r.breakdown.map((b) => b.label);
		expect(labels).toContain("Base de données");
		expect(labels).toContain("Cache Redis");
		expect(r.breakdown.reduce((n, b) => n + b.ramMb, 0)).toBeLessThanOrEqual(
			r.ramMb,
		);
	});

	it("compte une préproduction dans les ressources", () => {
		const without = estimateResources(input({ preprod: false }));
		const withPreprod = estimateResources(input({ preprod: true }));
		expect(withPreprod.ramMb).toBeGreaterThan(without.ramMb);
	});

	it("dimensionne le disque selon la base et les fichiers", () => {
		const small = estimateResources(
			input({ dbSize: "petite", filesGb: 0, database: "postgres" }),
		);
		const big = estimateResources(
			input({ dbSize: "grande", filesGb: 200, database: "postgres" }),
		);
		expect(big.diskGb).toBeGreaterThan(small.diskGb);
		expect(small.diskGb).toBeGreaterThanOrEqual(40);
	});

	it("propose deux serveurs et une offre sur mesure pour une activité critique", () => {
		const r = estimateResources(input({ availability: "critique" }));
		expect(r.servers).toBe(2);
		expect(r.offer).toBe("sur-mesure");
		expect(r.notes.join(" ")).toMatch(/haute disponibilité/i);
	});

	it("oriente vers un échange au-delà du périmètre d'un serveur", () => {
		const r = estimateResources(
			input({ traffic: "tres-eleve", dbSize: "grande", database: "postgres" }),
		);
		expect(r.verdict).toBe("contact");
		expect(r.offer).toBe("sur-mesure");
	});

	it("recommande Pro de 2 à 3 applications, sur mesure au-delà", () => {
		expect(estimateResources(input({ appsCount: 3 })).offer).toBe("pro");
		expect(estimateResources(input({ appsCount: 6 })).offer).toBe("sur-mesure");
	});

	it("oriente directement vers du sur mesure pour une application d'un autre type", () => {
		const r = estimateResources(input({ appType: "autre" }));
		expect(r.custom).toBe(true);
		expect(r.verdict).toBe("contact");
		expect(r.offer).toBe("sur-mesure");
		expect(estimateResources(input({ appType: "webapp" })).custom).toBe(false);
	});

	it("reste déterministe pour une même entrée", () => {
		expect(estimateResources(input())).toEqual(estimateResources(input()));
	});
});

describe("formatEstimate", () => {
	it("indique un dimensionnement sur mesure pour une application d'un autre type", () => {
		const i = input({ appType: "autre" });
		expect(formatEstimate(i, estimateResources(i))).toMatch(/sur mesure/i);
	});

	it("résume l'estimation pour préremplir un message", () => {
		const text = formatEstimate(
			input({ appType: "webapp", appsCount: 2 }),
			estimateResources(input({ appType: "webapp", appsCount: 2 })),
		);
		expect(text).toMatch(/vCPU/);
		expect(text).toMatch(/Go de RAM/);
		expect(text).toMatch(/2 application/);
	});
});
