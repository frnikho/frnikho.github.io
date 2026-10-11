import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { serviceFamilies } from "@/content/services";
import { buildHead, HOME_DESCRIPTION, HOME_TITLE } from "./seo";

const MAX_TITLE = 65;
const MAX_DESCRIPTION = 160;

const routeMeta = readdirSync("src/routes")
	.filter((f) => f.endsWith(".tsx"))
	.flatMap((file) => {
		const source = readFileSync(`src/routes/${file}`, "utf8");
		const title = source.match(/\btitle:\s*"([^"]+)"/)?.[1];
		const description = source.match(/\bdescription:\s*"([^"]+)"/)?.[1];
		return title && description ? [{ file, title, description }] : [];
	});

describe("balises SEO", () => {
	it("garde le titre et la description de l'accueil lisibles dans Google", () => {
		expect(HOME_TITLE.length).toBeLessThanOrEqual(MAX_TITLE);
		expect(HOME_DESCRIPTION.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
	});

	it("contrôle chaque page déclarée dans les routes", () => {
		expect(routeMeta.length).toBeGreaterThanOrEqual(8);
		for (const m of routeMeta) {
			expect(m.title.length, `${m.file} : titre`).toBeLessThanOrEqual(
				MAX_TITLE,
			);
			expect(
				m.description.length,
				`${m.file} : description`,
			).toBeLessThanOrEqual(MAX_DESCRIPTION);
		}
	});

	it("contrôle chaque page de service", () => {
		for (const f of serviceFamilies) {
			expect(f.metaTitle.length, `${f.slug} : titre`).toBeLessThanOrEqual(
				MAX_TITLE,
			);
			expect(
				f.metaDescription.length,
				`${f.slug} : description`,
			).toBeLessThanOrEqual(MAX_DESCRIPTION);
		}
	});

	it("n'utilise pas deux titres ni deux descriptions identiques", () => {
		const titles = routeMeta.map((m) => m.title);
		const descriptions = routeMeta.map((m) => m.description);
		expect(new Set(titles).size).toBe(titles.length);
		expect(new Set(descriptions).size).toBe(descriptions.length);
	});

	it("peut exclure une page de l'index", () => {
		const head = buildHead({
			title: "Introuvable",
			description: "Page introuvable.",
			canonical: "/introuvable",
			noindex: true,
		});
		const robots = head.meta.find((m) => "name" in m && m.name === "robots");
		expect(robots && "content" in robots && robots.content).toBe(
			"noindex, nofollow",
		);
	});
});
