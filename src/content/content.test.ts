import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { clientProjectDiagrams } from "@/components/diagrams/specs";
import { faq } from "./faq";
import { offers } from "./offers";
import { clientProjects, clientResults } from "./projects";
import { servicePoles } from "./service-poles";
import { familyHash, getFamily, serviceFamilies } from "./services";

describe("catalogue de services", () => {
	it("utilise des slugs uniques et résolubles", () => {
		const slugs = serviceFamilies.map((f) => f.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) expect(getFamily(slug)?.slug).toBe(slug);
	});

	it("renseigne chaque famille de quoi remplir son volet dépliable", () => {
		for (const f of serviceFamilies) {
			expect(f.items.length).toBeGreaterThan(0);
			expect(f.deliverables.length).toBeGreaterThan(0);
			expect(f.tools.length).toBeGreaterThan(0);
		}
	});

	it("redirige une ancienne page de détail vers son ancre, et le reste vers la page", () => {
		expect(familyHash("kubernetes")).toBe("kubernetes");
		expect(familyHash("inconnue")).toBeUndefined();
	});

	it("range chaque famille dans un seul pôle de la page Services", () => {
		const slugs = servicePoles.flatMap((p) => p.families);
		expect([...slugs].sort()).toEqual(
			serviceFamilies.map((f) => f.slug).sort(),
		);
	});

	it("ne référence plus de page de détail dans le sitemap", () => {
		const sitemap = readFileSync("public/sitemap.xml", "utf8");
		for (const f of serviceFamilies) {
			expect(sitemap).not.toContain(`https://nikho.dev/services/${f.slug}`);
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

	it("héberge plus d'applications en Pro qu'en Essentiel", () => {
		const apps = (id: string) => offers.find((o) => o.id === id)?.apps ?? 0;
		expect(apps("essentiel")).toBeGreaterThan(0);
		expect(apps("pro")).toBeGreaterThan(apps("essentiel"));
	});

	it("documente chaque projet client avec ses enjeux et un schéma d'architecture", () => {
		for (const p of clientProjects) {
			expect(p.challenge.length).toBeGreaterThan(80);
			expect(clientProjectDiagrams[p.id].label.length).toBeGreaterThan(0);
		}
	});

	it("n'annonce que les chiffres mesurés sur les projets clients", () => {
		const values = clientResults.map((r) => r.value);
		expect(values).toContain("99,99 %");
		expect(values).toContain("~2 000");
	});

	it("ne mentionne aucun hébergeur hors Union européenne dans la FAQ RGPD", () => {
		const text = faq.map((f) => f.a).join(" ");
		expect(text).not.toMatch(/\b(AWS|Google Cloud|Azure)\b/);
	});
});
