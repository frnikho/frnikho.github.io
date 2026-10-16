export type BlogCategory = {
	slug: string;
	name: string;
	/** Titre de la page catégorie (balise `<title>` et `<h1>`). */
	headline: string;
	/** Introduction rédigée de la page catégorie, aussi utilisée en meta description. */
	intro: string;
};

export const blogCategories = [
	{
		slug: "dev",
		name: "Développement",
		headline: "Développement web, TypeScript et architecture",
		intro:
			"Notes de terrain sur le développement d'applications : TypeScript, React, API, architecture et choix techniques qui tiennent dans la durée.",
	},
	{
		slug: "ia",
		name: "IA",
		headline: "Intelligence artificielle appliquée au développement",
		intro:
			"LLM, agents et outils d'IA testés en conditions réelles : ce qui fait gagner du temps, ce qui n'en fait pas gagner, et comment les intégrer proprement.",
	},
	{
		slug: "selfhost",
		name: "Auto-hébergement",
		headline: "Auto-hébergement, infrastructure et souveraineté",
		intro:
			"Héberger ses services soi-même, en Europe : serveurs, Kubernetes, sauvegardes, supervision et sécurité, avec des outils open source.",
	},
	{
		slug: "outils",
		name: "Outils",
		headline: "Outils et découvertes pour développeurs",
		intro:
			"Applications, CLI et services découverts au fil des projets, testés et présentés sans détour : à quoi ils servent et s'ils valent le détour.",
	},
	{
		slug: "retex",
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
