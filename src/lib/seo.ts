export const SITE_URL = "https://nikho.dev";
export const SITE_NAME = "Nicolas Sans — Portfolio";
export const DEFAULT_OG_IMAGE = "https://nikho.dev/cover.jpg";
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";
export const OG_IMAGE_ALT =
	"Nicolas Sans — Développeur Fullstack & DevOps à Nantes";

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
			{ name: "theme-color", content: "#0C2E3D" },
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
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous" as const,
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&family=Instrument+Serif:ital@0;1&display=swap",
			},
			{ rel: "canonical", href: canonicalUrl },
			{ rel: "alternate", hrefLang: "fr", href: canonicalUrl },
			{ rel: "alternate", hrefLang: "x-default", href: canonicalUrl },
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
			{ rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
			{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
			{ rel: "manifest", href: "/site.webmanifest" },
		],
	};
}

// Compat: previous getHead() → home defaults
export function getHead() {
	return buildHead({
		title: "Nicolas Sans — Développeur Fullstack & DevOps | Nantes",
		description:
			"Développeur Fullstack & DevOps à Nantes. React, Rust, Kubernetes, Salesforce. J'accompagne startups et PME du design à la prod — perf, sécu, scalabilité.",
		canonical: "/",
	});
}

// Central list for sitemap/prerender
export const SITE_ROUTES = [
	{ path: "/", changefreq: "weekly" as const, priority: "1.0" },
	{ path: "/services", changefreq: "monthly" as const, priority: "0.8" },
	{ path: "/stack", changefreq: "monthly" as const, priority: "0.8" },
	{ path: "/parcours", changefreq: "monthly" as const, priority: "0.8" },
	{ path: "/projets", changefreq: "monthly" as const, priority: "0.8" },
	{ path: "/recommandations", changefreq: "monthly" as const, priority: "0.7" },
	{ path: "/contact", changefreq: "monthly" as const, priority: "0.7" },
] as const;
