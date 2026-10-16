import { describe, expect, it } from "vitest";
import { blogCategories } from "@/content/blog";
import {
	MAX_DESCRIPTION,
	parisTimeToIso,
	postFrontmatterSchema,
} from "./schema";

const valid = {
	title: "Mettre une application en production",
	description:
		"Les étapes pour passer d'un projet qui tourne en local à une application en ligne, fiable et supervisée.",
	publishedAt: "2026-10-17",
	category: "dev",
};

const parse = (data: object) => postFrontmatterSchema.safeParse(data);

describe("frontmatter des articles", () => {
	it("accepte un article minimal et applique les valeurs par défaut", () => {
		const result = parse(valid);
		expect(result.success).toBe(true);
		expect(result.data).toMatchObject({
			tags: [],
			aliases: [],
			draft: false,
		});
	});

	it("interprète les dates à l'heure de Paris", () => {
		// Le 17 octobre à minuit à Paris = le 16 à 22 h UTC (heure d'été).
		expect(parse(valid).data?.publishedAt).toBe("2026-10-16T22:00:00.000Z");
		expect(
			parse({ ...valid, publishedAt: "2026-12-01T09:30" }).data?.publishedAt,
		).toBe("2026-12-01T08:30:00.000Z");
	});

	it("accepte une date déjà convertie par le parseur YAML", () => {
		const result = parse({
			...valid,
			publishedAt: new Date("2026-10-17T00:00:00Z"),
		});
		expect(result.data?.publishedAt).toBe("2026-10-16T22:00:00.000Z");
	});

	it.each([
		["une catégorie inconnue", { category: "crypto" }],
		["un service inconnu", { service: "inexistant" }],
		["une date mal formée", { publishedAt: "17/10/2026" }],
		["une date impossible", { publishedAt: "2026-02-31" }],
		["un tag hors format", { tags: ["Mon Tag"] }],
		["une description trop courte", { description: "Trop court." }],
		[
			"une description trop longue",
			{ description: "x".repeat(MAX_DESCRIPTION + 1) },
		],
		["un titre long sans seoTitle", { title: "x".repeat(70) }],
		["une couverture sans texte alternatif", { cover: "./cover.png" }],
		[
			"une mise à jour antérieure à la publication",
			{ updatedAt: "2026-10-01" },
		],
	])("refuse %s", (_, override) => {
		expect(parse({ ...valid, ...override }).success).toBe(false);
	});

	it("accepte un titre long accompagné d'un seoTitle court", () => {
		expect(
			parse({ ...valid, title: "x".repeat(70), seoTitle: "Titre court" })
				.success,
		).toBe(true);
	});
});

describe("parisTimeToIso", () => {
	it("tient compte de l'heure d'hiver", () => {
		expect(parisTimeToIso("2026-01-15", "10:00")).toBe(
			"2026-01-15T09:00:00.000Z",
		);
	});
});

describe("catégories du blog", () => {
	it("ont des slugs uniques et des textes lisibles dans Google", () => {
		const slugs = blogCategories.map((c) => c.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const c of blogCategories) {
			expect(`${c.headline} | Blog`.length, c.slug).toBeLessThanOrEqual(65);
			expect(c.intro.length, c.slug).toBeLessThanOrEqual(160);
		}
	});
});
