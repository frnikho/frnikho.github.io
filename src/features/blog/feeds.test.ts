import { describe, expect, it } from "vitest";
import { blogCategories } from "@/content/blog";
import { SITE_URL } from "@/lib/seo";
import { buildBlogSitemapEntries, RSS_ITEMS, renderRss } from "./feeds";
import type { PostSummary } from "./posts";

const summary = (slug: string, overrides: Partial<PostSummary> = {}) => ({
	slug,
	title: `Article ${slug}`,
	description: `Description de ${slug}`,
	category: "dev",
	tags: [],
	publishedAt: "2026-10-01T08:00:00.000Z",
	readingTime: 3,
	...overrides,
});

describe("renderRss", () => {
	it("décrit chaque article avec un lien absolu et une date RFC 822", () => {
		const xml = renderRss([summary("premier")]);
		expect(xml).toContain(`<link>${SITE_URL}/blog/premier</link>`);
		expect(xml).toContain('<guid isPermaLink="true">');
		expect(xml).toContain("<pubDate>Thu, 01 Oct 2026 08:00:00 GMT</pubDate>");
		expect(xml).toContain("<category>Développement</category>");
		expect(xml).toContain(`href="${SITE_URL}/blog/rss.xml" rel="self"`);
	});

	it("échappe le XML des titres et descriptions", () => {
		const xml = renderRss([
			summary("a", { title: "Docker & <Kubernetes>", description: `"ok"` }),
		]);
		expect(xml).toContain("Docker &amp; &lt;Kubernetes&gt;");
		expect(xml).toContain("&quot;ok&quot;");
		expect(xml).not.toContain("<Kubernetes>");
	});

	it(`se limite aux ${RSS_ITEMS} derniers articles`, () => {
		const posts = Array.from({ length: RSS_ITEMS + 5 }, (_, i) =>
			summary(`a${i}`),
		);
		expect(renderRss(posts).match(/<item>/g)).toHaveLength(RSS_ITEMS);
	});

	it("reste un flux valide sans aucun article", () => {
		const xml = renderRss([]);
		expect(xml).toContain("<channel>");
		expect(xml).not.toContain("<item>");
	});
});

describe("buildBlogSitemapEntries", () => {
	const posts = [
		summary("recent", {
			category: "ia",
			publishedAt: "2026-10-10T08:00:00.000Z",
			updatedAt: "2026-10-16T23:00:00.000Z",
		}),
		summary("ancien", { publishedAt: "2026-09-01T08:00:00.000Z" }),
	];
	const entries = buildBlogSitemapEntries(posts, blogCategories);
	const byLoc = Object.fromEntries(entries.map((e) => [e.loc, e]));

	it("liste l'accueil du blog, les catégories non vides et les articles", () => {
		expect(Object.keys(byLoc)).toEqual([
			`${SITE_URL}/blog`,
			`${SITE_URL}/blog/categorie/dev`,
			`${SITE_URL}/blog/categorie/ia`,
			`${SITE_URL}/blog/recent`,
			`${SITE_URL}/blog/ancien`,
		]);
	});

	it("date chaque page de sa dernière modification, à l'heure de Paris", () => {
		expect(byLoc[`${SITE_URL}/blog/recent`].lastmod).toBe("2026-10-17");
		expect(byLoc[`${SITE_URL}/blog/ancien`].lastmod).toBe("2026-09-01");
		expect(byLoc[`${SITE_URL}/blog`].lastmod).toBe("2026-10-17");
		expect(byLoc[`${SITE_URL}/blog/categorie/dev`].lastmod).toBe("2026-09-01");
	});

	it("n'expose ni tags ni pagination, et rien quand le blog est vide", () => {
		expect(entries.some((e) => /\/tag\/|\/page\//.test(e.loc))).toBe(false);
		expect(buildBlogSitemapEntries([], blogCategories)).toEqual([]);
	});
});
