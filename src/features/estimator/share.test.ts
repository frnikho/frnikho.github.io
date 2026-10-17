import { describe, expect, it } from "vitest";
import { DEFAULT_STATE, LIMITS, PRESETS } from "./catalog";
import {
	decodeState,
	encodeState,
	parseStack,
	toQueryString,
	validateEstimatorSearch,
} from "./share";

describe("partage par URL", () => {
	it("restitue chaque stack type à l'identique après un aller-retour", () => {
		for (const p of PRESETS) {
			const state = {
				...p.state,
				workload: { ...p.state.workload, preprod: true, growth: 3 },
			};
			expect(decodeState(encodeState(state))).toEqual(state);
		}
	});

	it("retombe sur l'état par défaut sans paramètre", () => {
		expect(decodeState({})).toEqual(DEFAULT_STATE);
	});

	it("ignore les composants inconnus et borne les valeurs", () => {
		const stack = parseStack("node.99,inconnu,postgres.4.99999,<script>");
		expect(stack).toEqual([
			{ kind: "node", replicas: LIMITS.replicas, dataGb: 0 },
			{ kind: "postgres", replicas: 1, dataGb: LIMITS.dataGb },
		]);
	});

	it("aligne la croissance sur le palier simulé le plus proche", () => {
		expect(decodeState({ g: 4.5 }).workload.growth).toBe(5);
		expect(decodeState({ g: 1.2 }).workload.growth).toBe(1);
	});

	it("construit un lien court et sans valeur vide", () => {
		const qs = toQueryString(encodeState(DEFAULT_STATE));
		expect(qs).toBe("s=node%2Cpostgres.1.1&v=20000");
	});

	it("limite le nombre de composants", () => {
		const raw = Array.from({ length: 50 }, () => "redis").join(",");
		expect(parseStack(raw)).toHaveLength(LIMITS.components);
	});

	it("rejette les paramètres non numériques", () => {
		const search = validateEstimatorSearch({ v: "abc", g: "5", s: 42 });
		expect(search).toEqual({ g: 5 });
		const state = decodeState({ v: -10, g: 999 });
		expect(state.workload.monthlyVisits).toBe(LIMITS.visits.min);
		expect(state.workload.growth).toBe(LIMITS.growth.max);
	});
});
