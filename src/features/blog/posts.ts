import GithubSlugger from "github-slugger";

export const POSTS_PER_PAGE = 12;
export const RELATED_POSTS = 3;
/** Vitesse de lecture moyenne retenue pour le temps de lecture affiché. */
const WORDS_PER_MINUTE = 230;
/** Nombre minimal d'intertitres pour afficher une table des matières. */
export const TOC_MIN_HEADINGS = 3;

/** Métadonnées d'un article, sans son contenu : ce qu'affichent listes, RSS et sitemap. */
export type PostSummary = {
	slug: string;
	title: string;
	/** Titre de la balise `<title>` s'il diffère du titre affiché. */
	seoTitle?: string;
	description: string;
	category: string;
	tags: string[];
	publishedAt: string;
	updatedAt?: string;
	readingTime: number;
	service?: string;
	cover?: string;
	coverAlt?: string;
};

type Publishable = { draft: boolean; publishedAt: string };

/**
 * Un article est visible s'il n'est pas en brouillon et que sa date de
 * publication est passée. Filtré à chaque requête : un article daté du futur
 * apparaît le jour venu, sans nouveau build.
 */
export function isPublished(
	post: Publishable,
	now: Date,
	includeDrafts = false,
): boolean {
	if (post.draft && !includeDrafts) return false;
	return includeDrafts || new Date(post.publishedAt) <= now;
}

/** Articles visibles, du plus récent au plus ancien. */
export function publishedPosts<T extends Publishable>(
	posts: readonly T[],
	now: Date,
	includeDrafts = false,
): T[] {
	return posts
		.filter((p) => isPublished(p, now, includeDrafts))
		.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export type Page<T> = {
	items: T[];
	page: number;
	totalPages: number;
	total: number;
};

/** Page `page` (à partir de 1), ou `null` si elle n'existe pas. Une liste vide a une page 1. */
export function paginate<T>(
	items: readonly T[],
	page: number,
	perPage = POSTS_PER_PAGE,
): Page<T> | null {
	const totalPages = Math.max(1, Math.ceil(items.length / perPage));
	if (!Number.isInteger(page) || page < 1 || page > totalPages) return null;
	const start = (page - 1) * perPage;
	return {
		items: items.slice(start, start + perPage),
		page,
		totalPages,
		total: items.length,
	};
}

/**
 * Articles liés : même catégorie d'abord, puis tags communs, puis les plus
 * récents pour compléter. `posts` est supposé trié du plus récent au plus ancien.
 */
export function relatedPosts<
	T extends { slug: string; category: string; tags: string[] },
>(current: T, posts: readonly T[], limit = RELATED_POSTS): T[] {
	const score = (p: T) =>
		(p.category === current.category ? 10 : 0) +
		p.tags.filter((t) => current.tags.includes(t)).length;
	return posts
		.filter((p) => p.slug !== current.slug)
		.map((p, index) => ({ p, index, score: score(p) }))
		.sort((a, b) => b.score - a.score || a.index - b.index)
		.slice(0, limit)
		.map(({ p }) => p);
}

/** Slug canonique si `slug` est un ancien slug (alias) d'un article. */
export function resolveAlias<T extends { slug: string; aliases: string[] }>(
	slug: string,
	posts: readonly T[],
): string | undefined {
	return posts.find((p) => p.aliases.includes(slug))?.slug;
}

/** Temps de lecture en minutes, arrondi au supérieur, minimum 1. */
export function readingTime(markdown: string): number {
	const words = markdown.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export type TocEntry = { id: string; text: string; depth: 2 | 3 };

/** Texte brut d'un titre Markdown : sans code, liens ni emphase. */
function headingText(raw: string): string {
	return raw
		.replace(/`([^`]*)`/g, "$1")
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/(\*\*|__|\*|_)(.+?)\1/g, "$2")
		.trim();
}

/**
 * Intertitres `##` et `###` hors blocs de code. Les identifiants suivent
 * l'algorithme de `rehype-slug` (github-slugger) pour pointer sur les ancres
 * réellement générées.
 */
export function extractToc(markdown: string): TocEntry[] {
	const slugger = new GithubSlugger();
	const entries: TocEntry[] = [];
	let inFence = false;
	for (const line of markdown.split("\n")) {
		if (/^\s*(```|~~~)/.test(line)) {
			inFence = !inFence;
			continue;
		}
		if (inFence) continue;
		const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
		if (!match) continue;
		const text = headingText(match[2]);
		// Le slugger voit tous les titres, comme rehype-slug, pour numéroter les doublons à l'identique.
		const id = slugger.slug(text);
		const depth = match[1].length;
		if (depth === 2 || depth === 3) entries.push({ id, text, depth });
	}
	return entries;
}

/** Fuseau de référence du blog : dates du frontmatter, affichage et sitemap. */
export const BLOG_TIME_ZONE = "Europe/Paris";

/** Date affichée en français, à l'heure de Paris : « 17 octobre 2026 ». */
export function formatPostDate(iso: string): string {
	return new Intl.DateTimeFormat("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: BLOG_TIME_ZONE,
	}).format(new Date(iso));
}

/** Jour (`AAAA-MM-JJ`) à l'heure de Paris, pour le `lastmod` du sitemap. */
export function parisDay(iso: string): string {
	return new Intl.DateTimeFormat("en-CA", { timeZone: BLOG_TIME_ZONE }).format(
		new Date(iso),
	);
}

/** « L'IA en 2026 : état des lieux » → « l-ia-en-2026-etat-des-lieux ». */
export function slugify(title: string): string {
	return title
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
