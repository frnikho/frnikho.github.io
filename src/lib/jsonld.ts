import type { FaqItem } from "@/content/faq";
import { serviceFamilies } from "@/content/services";
import { SITE_URL } from "./seo";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "./site";

export function personJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${SITE_URL}/#person`,
		name: "Nicolas Sans",
		jobTitle: "Ingénieur DevOps freelance",
		image: `${SITE_URL}/pp.jpg`,
		url: SITE_URL,
		email: CONTACT_EMAIL,
		sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.malt],
		knowsAbout: [
			"DevOps",
			"Kubernetes",
			"Docker",
			"Terraform",
			"Ansible",
			"ArgoCD",
			"Sécurisation de serveur",
			"Mise en production",
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
		"@id": `${SITE_URL}/#website`,
		name: "Nicolas Sans - DevOps freelance",
		alternateName: "nikho.dev",
		url: SITE_URL,
		inLanguage: "fr-FR",
		publisher: { "@id": `${SITE_URL}/#person` },
	};
}

export function serviceJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name: "Nicolas Sans - DevOps freelance : infrastructure, Kubernetes, sécurité",
		url: SITE_URL,
		provider: { "@id": `${SITE_URL}/#person` },
		areaServed: [{ "@type": "Country", name: "France" }],
		priceRange: "€€",
		knowsAbout: serviceFamilies.map((f) => f.name),
	};
}

export function faqJsonLd(items: FaqItem[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((i) => ({
			"@type": "Question",
			name: i.q,
			acceptedAnswer: { "@type": "Answer", text: i.a },
		})),
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
		{ name: "Blog", url: `${SITE_URL}/blog` },
		{ name: "Services", url: `${SITE_URL}/services` },
		{ name: "À propos", url: `${SITE_URL}/a-propos` },
		{ name: "Réalisations", url: `${SITE_URL}/realisations` },
		{ name: "Souveraineté et RGPD", url: `${SITE_URL}/souverainete` },
		{ name: "Estimer mes ressources", url: `${SITE_URL}/estimation` },
		{ name: "Agences", url: `${SITE_URL}/agences` },
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

type BlogPostingInput = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	image: string;
	section: string;
	tags: readonly string[];
};

export function blogPostingJsonLd(post: BlogPostingInput) {
	const url = `${SITE_URL}/blog/${post.slug}`;
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${url}#article`,
		headline: post.title,
		description: post.description,
		url,
		mainEntityOfPage: url,
		image: post.image,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt ?? post.publishedAt,
		inLanguage: "fr-FR",
		articleSection: post.section,
		keywords: post.tags.join(", "),
		author: { "@id": `${SITE_URL}/#person` },
		publisher: { "@id": `${SITE_URL}/#person` },
		isPartOf: { "@id": `${SITE_URL}/blog#blog` },
	};
}

export function blogJsonLd(
	posts: ReadonlyArray<{ slug: string; title: string; publishedAt: string }>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "Blog",
		"@id": `${SITE_URL}/blog#blog`,
		name: "Blog nikho.dev",
		url: `${SITE_URL}/blog`,
		inLanguage: "fr-FR",
		author: { "@id": `${SITE_URL}/#person` },
		isPartOf: { "@id": `${SITE_URL}/#website` },
		blogPost: posts.map((p) => ({
			"@type": "BlogPosting",
			headline: p.title,
			url: `${SITE_URL}/blog/${p.slug}`,
			datePublished: p.publishedAt,
		})),
	};
}
