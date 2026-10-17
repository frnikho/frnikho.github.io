/** Couleurs d'une catégorie : texte, fond de pastille, bordure. */
export type CategoryTone = { ink: string; soft: string; line: string };

export type BlogCategory = {
	slug: string;
	name: string;
	tone: CategoryTone;
	/** Titre de la page catégorie (balise `<title>` et `<h1>`). */
	headline: string;
	/** Introduction rédigée de la page catégorie, aussi utilisée en meta description. */
	intro: string;
};

export const blogCategories = [
	{
		slug: "dev",
		tone: { ink: "#2c5be6", soft: "#eaf0ff", line: "#cfdcff" },
		name: "Développement",
		headline: "Développement web, TypeScript et architecture",
		intro:
			"Notes de terrain sur le développement d'applications : TypeScript, React, API, architecture et choix techniques qui tiennent dans la durée.",
	},
	{
		slug: "ia",
		tone: { ink: "#6d28d9", soft: "#f5f0ff", line: "#e2d6fb" },
		name: "IA",
		headline: "Intelligence artificielle appliquée au développement",
		intro:
			"LLM, agents et outils d'IA testés en conditions réelles : ce qui fait gagner du temps, ce qui n'en fait pas gagner, et comment les intégrer proprement.",
	},
	{
		slug: "selfhost",
		tone: { ink: "#0f7a54", soft: "#ecfaf3", line: "#cdeedd" },
		name: "Auto-hébergement",
		headline: "Auto-hébergement, infrastructure et souveraineté",
		intro:
			"Héberger ses services soi-même, en Europe : serveurs, Kubernetes, sauvegardes, supervision et sécurité, avec des outils open source.",
	},
	{
		slug: "outils",
		tone: { ink: "#9a4a07", soft: "#fff6e5", line: "#f6e0b8" },
		name: "Outils",
		headline: "Outils et découvertes pour développeurs",
		intro:
			"Applications, CLI et services découverts au fil des projets, testés et présentés sans détour : à quoi ils servent et s'ils valent le détour.",
	},
	{
		slug: "retex",
		tone: { ink: "#a3154f", soft: "#fff0f6", line: "#f6d0e1" },
		name: "Retours d'expérience",
		headline: "Retours d'expérience de projets en production",
		intro:
			"Ce qui s'est passé sur de vrais projets : migrations, incidents, mises en production et décisions techniques, avec leurs résultats.",
	},
] as const satisfies readonly BlogCategory[];

export type BlogCategorySlug = (typeof blogCategories)[number]["slug"];

export const BLOG_CATEGORY_SLUGS = blogCategories.map((c) => c.slug) as [
	BlogCategorySlug,
	...BlogCategorySlug[],
];

export const getBlogCategory = (slug: string): BlogCategory | undefined =>
	blogCategories.find((c) => c.slug === slug);
