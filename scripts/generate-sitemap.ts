/**
 * Génère public/sitemap.xml à partir des routes (src/lib/seo.ts). `lastmod` = date du dernier commit touchant les
 * fichiers sources de la page, ou aujourd'hui si ces fichiers sont modifiés
 * et non commités. Sans dépôt git (build Docker), la date déjà présente dans
 * le fichier est conservée : le script ne dégrade jamais le sitemap.
 *
 * Usage : bun run sitemap
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { SITE_ROUTES } from "../src/lib/seo";
import { buildSitemapEntries, renderSitemap } from "../src/lib/sitemap";

const OUTPUT = "public/sitemap.xml";

// Date locale, comme `git log --format=%cs` : pas de « futur » entre minuit et 2 h.
const today = () => new Date().toLocaleDateString("en-CA");

function git(args: string[]): string | null {
	try {
		return execFileSync("git", args, {
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"],
		}).trim();
	} catch {
		return null;
	}
}

const hasGit = git(["rev-parse", "--is-inside-work-tree"]) === "true";

const previousDates = new Map<string, string>();
if (existsSync(OUTPUT)) {
	const xml = readFileSync(OUTPUT, "utf8");
	for (const m of xml.matchAll(
		/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g,
	)) {
		previousDates.set(m[1], m[2]);
	}
}

function lastModified(sources: readonly string[]): string | null {
	if (!hasGit) return null;
	const dirty = git(["status", "--porcelain", "--", ...sources]);
	if (dirty) return today();
	const date = git(["log", "-1", "--format=%cs", "--", ...sources]);
	return date || null;
}

const entries = buildSitemapEntries({
	routes: SITE_ROUTES,
	lastmod: (sources, loc) =>
		lastModified(sources) ?? previousDates.get(loc) ?? today(),
});

writeFileSync(OUTPUT, renderSitemap(entries));
console.log(`sitemap : ${entries.length} URL écrites dans ${OUTPUT}`);
