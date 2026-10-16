import { describe, expect, it } from "vitest";
import {
	extractToc,
	formatPostDate,
	isPublished,
	paginate,
	parisDay,
	publishedPosts,
	readingTime,
	relatedPosts,
	resolveAlias,
	slugify,
} from "./posts";

const NOW = new Date("2026-10-17T12:00:00Z");

const post = (slug: string, publishedAt: string, extra = {}) => ({
	slug,
	publishedAt,
	draft: false,
	category: "dev",
	tags: [] as string[],
	aliases: [] as string[],
	...extra,
});

describe("isPublished", () => {
	it("publie un article dont la date est passée", () => {
		expect(isPublished(post("a", "2026-10-17T11:59:00Z"), NOW)).toBe(true);
	});

	it("masque un article programmé tant que sa date n'est pas atteinte", () => {
		expect(isPublished(post("a", "2026-10-17T12:01:00Z"), NOW)).toBe(false);
	});

	it("masque un brouillon, même daté du passé", () => {
		expect(
			isPublished(post("a", "2026-01-01T00:00:00Z", { draft: true }), NOW),
		).toBe(false);
	});

	it("montre brouillons et articles programmés en développement", () => {
		const future = post("a", "2027-01-01T00:00:00Z", { draft: true });
		expect(isPublished(future, NOW, true)).toBe(true);
	});
});

describe("publishedPosts", () => {
	it("ne garde que les articles visibles, du plus récent au plus ancien", () => {
		const posts = [
			post("ancien", "2026-01-01T00:00:00Z"),
			post("futur", "2026-12-01T00:00:00Z"),
			post("recent", "2026-10-01T00:00:00Z"),
			post("brouillon", "2026-02-01T00:00:00Z", { draft: true }),
		];
		expect(publishedPosts(posts, NOW).map((p) => p.slug)).toEqual([
			"recent",
			"ancien",
		]);
	});

	it("ne modifie pas la liste reçue", () => {
		const posts = [
			post("a", "2026-01-01T00:00:00Z"),
			post("b", "2026-02-01T00:00:00Z"),
		];
		publishedPosts(posts, NOW);
		expect(posts.map((p) => p.slug)).toEqual(["a", "b"]);
	});
});

describe("paginate", () => {
	const items = Array.from({ length: 25 }, (_, i) => i);

	it("découpe en pages de taille fixe", () => {
		expect(paginate(items, 1, 12)).toMatchObject({
			items: items.slice(0, 12),
			totalPages: 3,
			total: 25,
		});
		expect(paginate(items, 3, 12)?.items).toEqual([24]);
	});

	it("refuse une page hors limites ou non entière", () => {
		for (const page of [0, 4, -1, 1.5, Number.NaN]) {
			expect(paginate(items, page, 12)).toBeNull();
		}
	});

	it("a une page 1 vide quand il n'y a aucun article", () => {
		expect(paginate([], 1)).toEqual({
			items: [],
			page: 1,
			totalPages: 1,
			total: 0,
		});
		expect(paginate([], 2)).toBeNull();
	});
});

describe("relatedPosts", () => {
	const current = post("courant", "2026-10-01T00:00:00Z", {
		category: "ia",
		tags: ["llm"],
	});
	const posts = [
		post("recent-dev", "2026-09-30T00:00:00Z"),
		post("ia-sans-tag", "2026-09-01T00:00:00Z", { category: "ia" }),
		current,
		post("ia-llm", "2026-08-01T00:00:00Z", { category: "ia", tags: ["llm"] }),
		post("dev-llm", "2026-07-01T00:00:00Z", { tags: ["llm"] }),
	];

	it("privilégie la catégorie, puis les tags, puis la date, sans l'article courant", () => {
		expect(relatedPosts(current, posts).map((p) => p.slug)).toEqual([
			"ia-llm",
			"ia-sans-tag",
			"dev-llm",
		]);
	});

	it("complète avec les plus récents quand rien n'est lié", () => {
		const alone = post("seul", "2026-10-01T00:00:00Z", { category: "retex" });
		expect(relatedPosts(alone, posts, 2).map((p) => p.slug)).toEqual([
			"recent-dev",
			"ia-sans-tag",
		]);
	});
});

describe("resolveAlias", () => {
	it("retrouve l'article à partir d'un ancien slug", () => {
		const posts = [post("nouveau", "2026-01-01", { aliases: ["ancien"] })];
		expect(resolveAlias("ancien", posts)).toBe("nouveau");
		expect(resolveAlias("inconnu", posts)).toBeUndefined();
	});
});

describe("readingTime", () => {
	it("compte au moins une minute, arrondie au supérieur", () => {
		expect(readingTime("")).toBe(1);
		expect(readingTime("mot ".repeat(230))).toBe(1);
		expect(readingTime("mot ".repeat(231))).toBe(2);
	});
});

describe("extractToc", () => {
	it("liste les ##/### hors blocs de code, avec les ancres de rehype-slug", () => {
		const md = [
			"# Titre",
			"## Mettre en `production`",
			"```bash",
			"## pas un titre",
			"```",
			"### Avec un [lien](https://exemple.fr) et **gras**",
			"## Mettre en production",
			"#### Trop profond",
		].join("\n");
		expect(extractToc(md)).toEqual([
			{ id: "mettre-en-production", text: "Mettre en production", depth: 2 },
			{
				id: "avec-un-lien-et-gras",
				text: "Avec un lien et gras",
				depth: 3,
			},
			{ id: "mettre-en-production-1", text: "Mettre en production", depth: 2 },
		]);
	});

	it("gère les accents comme github-slugger", () => {
		expect(extractToc("## Sécurité & réseau")[0].id).toBe("sécurité--réseau");
	});
});

describe("dates", () => {
	it("affiche et date le sitemap à l'heure de Paris", () => {
		// 23 h UTC le 16 = 1 h du matin le 17 à Paris (heure d'été).
		expect(formatPostDate("2026-10-16T23:00:00Z")).toBe("17 octobre 2026");
		expect(parisDay("2026-10-16T23:00:00Z")).toBe("2026-10-17");
	});
});

describe("slugify", () => {
	it("produit un slug d'URL sans accents ni ponctuation", () => {
		expect(slugify("L'IA en 2026 : état des lieux !")).toBe(
			"l-ia-en-2026-etat-des-lieux",
		);
	});
});
