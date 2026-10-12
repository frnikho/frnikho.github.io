export const SITE_URL = "https://nikho.dev";
export const SITE_NAME = "Nicolas Sans - DevOps freelance";
export const HOME_TITLE =
	"Nicolas Sans, DevOps freelance | Infrastructure souveraine";
export const HOME_DESCRIPTION =
	"DevOps freelance à distance, partout en France : mise en production, Kubernetes, sécurité, sauvegardes et supervision. Hébergement européen et RGPD.";
export const DEFAULT_OG_IMAGE = "https://nikho.dev/cover.jpg";
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";
export const OG_IMAGE_ALT = "Nicolas Sans, ingénieur DevOps freelance";

export type SeoProps = {
	title: string;
	description: string;
	canonical: string;
	ogImage?: string;
	noindex?: boolean;
	ogType?: string;
};

export function buildHead({
	title,
	description,
	canonical,
	ogImage = DEFAULT_OG_IMAGE,
	noindex = false,
	ogType = "website",
}: SeoProps) {
	const canonicalUrl = `${SITE_URL}${canonical}`;
	const robots = noindex ? "noindex, nofollow" : "index, follow";

	return {
		meta: [
			{ charSet: "utf-8" as const },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title },
			{ name: "description", content: description },
			{ name: "robots", content: robots },
			{ name: "author", content: "Nicolas SANS" },
			{ name: "theme-color", content: "#ffffff" },
			{ property: "og:type", content: ogType },
			{ property: "og:locale", content: "fr_FR" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: canonicalUrl },
			{ property: "og:image", content: ogImage },
			{ property: "og:image:width", content: OG_IMAGE_WIDTH },
			{ property: "og:image:height", content: OG_IMAGE_HEIGHT },
			{ property: "og:image:alt", content: OG_IMAGE_ALT },
			{ property: "og:image:type", content: "image/jpeg" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: "@frnikho" },
			{ name: "twitter:creator", content: "@frnikho" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: ogImage },
			{ name: "twitter:image:alt", content: OG_IMAGE_ALT },
		],
		links: [
			{ rel: "canonical", href: canonicalUrl },
			{ rel: "alternate", hrefLang: "fr", href: canonicalUrl },
			{ rel: "alternate", hrefLang: "x-default", href: canonicalUrl },
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{ rel: "manifest", href: "/site.webmanifest" },
		],
	};
}

export type SiteRoute = {
	path: string;
	priority: string;
	/** Fichiers ou dossiers dont la dernière modification date la page (`lastmod`). */
	sources: readonly string[];
};

/** Pages indexables, source unique du sitemap (voir `scripts/generate-sitemap.ts`). */
export const SITE_ROUTES: readonly SiteRoute[] = [
	{
		path: "/",
		priority: "1.0",
		sources: [
			"src/routes/index.tsx",
			"src/components/site",
			"src/content",
			"src/lib/seo.ts",
		],
	},
	{
		path: "/services",
		priority: "0.9",
		sources: ["src/routes/services.index.tsx", "src/content/services.ts"],
	},
	{
		path: "/souverainete",
		priority: "0.9",
		sources: [
			"src/routes/souverainete.tsx",
			"src/content/sovereignty.ts",
			"src/components/diagrams",
		],
	},
	{
		path: "/realisations",
		priority: "0.8",
		sources: [
			"src/routes/realisations.tsx",
			"src/content/projects.ts",
			"src/content/cluster.ts",
		],
	},
	{
		path: "/estimation",
		priority: "0.8",
		sources: ["src/routes/estimation.tsx", "src/features/estimator"],
	},
	{ path: "/agences", priority: "0.7", sources: ["src/routes/agences.tsx"] },
	{
		path: "/a-propos",
		priority: "0.6",
		sources: ["src/routes/a-propos.tsx", "src/content/profile.ts"],
	},
	{
		path: "/contact",
		priority: "0.8",
		sources: [
			"src/routes/contact.tsx",
			"src/content/faq.ts",
			"src/features/contact",
		],
	},
];

/** Pages de détail des services : même priorité, mêmes fichiers sources. */
export const SERVICE_PAGE = {
	priority: "0.8",
	sources: ["src/routes/services.$slug.tsx", "src/content/services.ts"],
} as const;
