import { SERVICE_PAGE, SITE_URL, type SiteRoute } from "@/lib/seo";

export type SitemapEntry = { loc: string; lastmod: string; priority: string };

type BuildOptions = {
	routes: readonly SiteRoute[];
	serviceSlugs: readonly string[];
	/** Date (AAAA-MM-JJ) de dernière modification des fichiers sources d'une page. */
	lastmod: (sources: readonly string[], loc: string) => string;
};

export function buildSitemapEntries({
	routes,
	serviceSlugs,
	lastmod,
}: BuildOptions): SitemapEntry[] {
	const pages = routes.map((r) => {
		const loc = `${SITE_URL}${r.path}`;
		return { loc, lastmod: lastmod(r.sources, loc), priority: r.priority };
	});
	const services = serviceSlugs.map((slug) => {
		const loc = `${SITE_URL}/services/${slug}`;
		return {
			loc,
			lastmod: lastmod(SERVICE_PAGE.sources, loc),
			priority: SERVICE_PAGE.priority,
		};
	});
	return [...pages, ...services];
}

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

export function renderSitemap(entries: readonly SitemapEntry[]): string {
	const urls = entries
		.map(
			(e) =>
				`    <url>\n        <loc>${escapeXml(e.loc)}</loc>\n        <lastmod>${e.lastmod}</lastmod>\n        <priority>${e.priority}</priority>\n    </url>`,
		)
		.join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
