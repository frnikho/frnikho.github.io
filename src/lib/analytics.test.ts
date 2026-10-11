import { describe, expect, it } from "vitest";
import { buildAnalyticsScript } from "./analytics";

const valid = {
	UMAMI_SCRIPT_URL: "https://stats.nikho.dev/script.js",
	UMAMI_WEBSITE_ID: "0b5f3c1e-7d2a-4c8e-9f10-2a6b8d4e5c77",
};

describe("buildAnalyticsScript", () => {
	it("ne charge rien tant que la mesure d'audience n'est pas configurée", () => {
		expect(buildAnalyticsScript({})).toBeNull();
		expect(
			buildAnalyticsScript({ UMAMI_SCRIPT_URL: valid.UMAMI_SCRIPT_URL }),
		).toBeNull();
		expect(
			buildAnalyticsScript({ UMAMI_WEBSITE_ID: valid.UMAMI_WEBSITE_ID }),
		).toBeNull();
	});

	it("construit la balise du script avec l'identifiant du site", () => {
		const script = buildAnalyticsScript(valid);
		expect(script?.src).toBe(valid.UMAMI_SCRIPT_URL);
		expect(script?.websiteId).toBe(valid.UMAMI_WEBSITE_ID);
	});

	it("limite la mesure au domaine de production et respecte Do Not Track", () => {
		const script = buildAnalyticsScript(valid);
		expect(script?.domains).toBe("nikho.dev");
		expect(script?.respectDoNotTrack).toBe(true);
	});

	it("refuse une URL qui n'est pas en HTTPS", () => {
		expect(
			buildAnalyticsScript({
				...valid,
				UMAMI_SCRIPT_URL: "http://stats.nikho.dev/script.js",
			}),
		).toBeNull();
		expect(
			buildAnalyticsScript({ ...valid, UMAMI_SCRIPT_URL: "pas une url" }),
		).toBeNull();
	});

	it("refuse un identifiant de site qui n'a pas la forme d'un UUID", () => {
		expect(
			buildAnalyticsScript({ ...valid, UMAMI_WEBSITE_ID: "<script>" }),
		).toBeNull();
	});

	it("ignore les espaces autour des valeurs", () => {
		const script = buildAnalyticsScript({
			UMAMI_SCRIPT_URL: ` ${valid.UMAMI_SCRIPT_URL} `,
			UMAMI_WEBSITE_ID: ` ${valid.UMAMI_WEBSITE_ID} `,
		});
		expect(script?.src).toBe(valid.UMAMI_SCRIPT_URL);
	});
});
