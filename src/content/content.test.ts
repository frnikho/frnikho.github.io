import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { faq } from "./faq";
import { offers } from "./offers";
import { getFamily, serviceFamilies } from "./services";

describe("catalogue de services", () => {
	it("utilise des slugs uniques et résolubles", () => {
		const slugs = serviceFamilies.map((f) => f.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) expect(getFamily(slug)?.slug).toBe(slug);
	});

	it("renseigne chaque famille de façon exploitable pour le SEO", () => {
		for (const f of serviceFamilies) {
			expect(f.items.length).toBeGreaterThan(0);
			expect(f.deliverables.length).toBeGreaterThan(0);
			expect(f.metaTitle.length).toBeLessThanOrEqual(65);
			expect(f.metaDescription.length).toBeLessThanOrEqual(200);
		}
	});

	it("référence toutes les familles dans le sitemap", () => {
		const sitemap = readFileSync("public/sitemap.xml", "utf8");
		for (const f of serviceFamilies) {
			expect(sitemap).toContain(`https://nikho.dev/services/${f.slug}`);
		}
	});
});

describe("contenus commerciaux", () => {
	it("expose les forfaits attendus, dont une offre sur devis", () => {
		expect(offers.map((o) => o.id)).toEqual([
			"essentiel",
			"pro",
			"maintenance",
			"sur-mesure",
		]);
		expect(offers.filter((o) => o.quote).map((o) => o.id)).toEqual([
			"sur-mesure",
		]);
	});

	it("affiche un tarif de départ croissant sur les formules chiffrées", () => {
		const amount = (price: string) => Number(price.replace(/\D/g, ""));
		const essentiel = offers.find((o) => o.id === "essentiel");
		const pro = offers.find((o) => o.id === "pro");
		expect(amount(essentiel?.price ?? "")).toBeLessThan(
			amount(pro?.price ?? ""),
		);
	});

	it("ne mentionne aucun hébergeur hors Union européenne dans la FAQ RGPD", () => {
		const text = faq.map((f) => f.a).join(" ");
		expect(text).not.toMatch(/\b(AWS|Google Cloud|Azure)\b/);
	});
});
