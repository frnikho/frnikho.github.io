import { SITE_URL } from "./seo";

export function personJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Nicolas Sans",
		jobTitle: "Développeur Fullstack & DevOps",
		image: `${SITE_URL}/pp.jpg`,
		url: SITE_URL,
		sameAs: [
			"https://github.com/frnikho",
			"https://www.linkedin.com/in/nicolas-sans",
			"https://www.malt.fr/profile/nicolassans",
		],
		knowsAbout: [
			"React",
			"Rust",
			"Kubernetes",
			"Salesforce",
			"TypeScript",
			"NestJS",
			"Docker",
			"Terraform",
			"DevOps",
		],
		address: {
			"@type": "PostalAddress",
			addressLocality: "Nantes",
			addressCountry: "FR",
		},
	};
}

export function websiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Nicolas Sans — Portfolio",
		alternateName: "nikho.dev",
		url: SITE_URL,
		inLanguage: "fr-FR",
		publisher: {
			"@type": "Person",
			name: "Nicolas Sans",
			url: SITE_URL,
		},
	};
}

export function breadcrumbsJsonLd(
	items: Array<{ name: string; item: string }>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((it, idx) => ({
			"@type": "ListItem",
			position: idx + 1,
			name: it.name,
			item: it.item,
		})),
	};
}

export function siteNavigationJsonLd() {
	const nav = [
		{ name: "Services", url: `${SITE_URL}/services` },
		{ name: "Stack", url: `${SITE_URL}/stack` },
		{ name: "Parcours", url: `${SITE_URL}/parcours` },
		{ name: "Projets", url: `${SITE_URL}/projets` },
		{ name: "Recommandations", url: `${SITE_URL}/recommandations` },
		{ name: "Contact", url: `${SITE_URL}/contact` },
	];
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Navigation principale",
		itemListElement: nav.map((n, i) => ({
			"@type": "SiteNavigationElement",
			position: i + 1,
			name: n.name,
			url: n.url,
		})),
	};
}

export function itemListJsonLd(
	name: string,
	description: string,
	items: Array<{ name: string; url?: string }>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name,
		description,
		isPartOf: { "@id": `${SITE_URL}/#website` },
		mainEntity: {
			"@type": "ItemList",
			name,
			itemListElement: items.map((it, idx) => ({
				"@type": "ListItem",
				position: idx + 1,
				name: it.name,
				...(it.url ? { url: it.url } : {}),
			})),
		},
	};
}
