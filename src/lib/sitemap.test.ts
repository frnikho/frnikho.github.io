import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { serviceFamilies } from "@/content/services";
import { SITE_ROUTES, SITE_URL } from "@/lib/seo";
import { buildSitemapEntries, renderSitemap } from "@/lib/sitemap";

const slugs = serviceFamilies.map((f) => f.slug);
const entries = buildSitemapEntries({
	routes: SITE_ROUTES,
	serviceSlugs: slugs,
	lastmod: () => "2026-01-02",
});

describe("buildSitemapEntries", () => {
	it("contient chaque page et chaque service, sans doublon", () => {
		const locs = entries.map((e) => e.loc);
		expect(new Set(locs).size).toBe(locs.length);
		expect(locs).toContain(`${SITE_URL}/`);
		expect(locs).toContain(`${SITE_URL}/estimation`);
		for (const slug of slugs) {
			expect(locs).toContain(`${SITE_URL}/services/${slug}`);
		}
		expect(locs).toHaveLength(SITE_ROUTES.length + slugs.length);
	});

	it("ne référence jamais une page exclue de l'index", () => {
		const locs = entries.map((e) => e.loc).join(" ");
		expect(locs).not.toMatch(/mentions-legales|confidentialite/);
	});

	it("demande la date de dernière modification des fichiers sources de chaque page", () => {
		const asked: string[][] = [];
		buildSitemapEntries({
			routes: SITE_ROUTES,
			serviceSlugs: slugs,
			lastmod: (sources) => {
				asked.push([...sources]);
				return "2026-01-02";
			},
		});
		expect(asked.every((s) => s.length > 0)).toBe(true);
	});
});

describe("renderSitemap", () => {
	it("produit un XML valide avec loc, lastmod et priority", () => {
		const xml = renderSitemap(entries);
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(xml).toContain(
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		);
		expect((xml.match(/<url>/g) ?? []).length).toBe(entries.length);
		expect(xml).toContain("<lastmod>2026-01-02</lastmod>");
		expect(xml).toContain("<priority>1.0</priority>");
	});

	it("échappe les caractères spéciaux des URL", () => {
		const xml = renderSitemap([
			{
				loc: "https://nikho.dev/a?x=1&y=2",
				lastmod: "2026-01-02",
				priority: "0.5",
			},
		]);
		expect(xml).toContain("a?x=1&amp;y=2");
	});
});

describe("public/sitemap.xml", () => {
	const file = readFileSync("public/sitemap.xml", "utf8");
	const locs = [...file.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
	const dates = [...file.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
		(m) => m[1],
	);

	it("est synchronisé avec les routes (lancer `bun run sitemap` sinon)", () => {
		expect([...locs].sort()).toEqual(entries.map((e) => e.loc).sort());
	});

	it("n'utilise que des dates valides, jamais dans le futur", () => {
		const today = new Date().toISOString().slice(0, 10);
		for (const d of dates) {
			expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(d <= today).toBe(true);
		}
	});
});
