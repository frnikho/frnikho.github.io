import { z } from "zod";
import { BLOG_CATEGORY_SLUGS } from "@/content/blog";
import { serviceFamilies } from "@/content/services";
import { BLOG_TIME_ZONE } from "./posts";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const DATE_PATTERN = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}))?$/;

/** Décalage (en minutes) du fuseau `BLOG_TIME_ZONE` par rapport à UTC à l'instant `at`. */
function zoneOffsetMinutes(at: Date): number {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat("en-US", {
			timeZone: BLOG_TIME_ZONE,
			hourCycle: "h23",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		})
			.formatToParts(at)
			.map((p) => [p.type, Number(p.value)]),
	);
	const wall = Date.UTC(
		parts.year,
		parts.month - 1,
		parts.day,
		parts.hour,
		parts.minute,
	);
	return (wall - at.getTime()) / 60_000;
}

/** Heure de Paris (`AAAA-MM-JJ`, `HH:mm`) → instant ISO en UTC. */
export function parisTimeToIso(day: string, time = "00:00"): string {
	const naive = new Date(`${day}T${time}:00Z`);
	// `Date` reporte un 31 février au 3 mars : on exige un aller-retour exact.
	if (
		Number.isNaN(naive.getTime()) ||
		naive.toISOString().slice(0, 16) !== `${day}T${time}`
	) {
		throw new Error(`Date invalide : ${day} ${time}`);
	}
	return new Date(
		naive.getTime() - zoneOffsetMinutes(naive) * 60_000,
	).toISOString();
}

/**
 * Date de frontmatter : `AAAA-MM-JJ` ou `AAAA-MM-JJTHH:mm`, en heure de Paris.
 * Le parseur YAML peut déjà l'avoir convertie en `Date` (lue en UTC) : ses
 * composantes sont alors reprises comme heure de Paris.
 * Sortie : chaîne ISO complète en UTC, sérialisable telle quelle.
 */
const dateField = z.union([z.date(), z.string()]).transform((value, ctx) => {
	const text = value instanceof Date ? value.toISOString().slice(0, 16) : value;
	const match = DATE_PATTERN.exec(text);
	if (!match) {
		ctx.addIssue({
			code: "custom",
			message: "Format attendu : AAAA-MM-JJ ou AAAA-MM-JJTHH:mm",
		});
		return z.NEVER;
	}
	try {
		return parisTimeToIso(match[1], match[2]);
	} catch {
		ctx.addIssue({ code: "custom", message: `Date invalide : ${text}` });
		return z.NEVER;
	}
});

const slugField = z
	.string()
	.regex(SLUG_PATTERN, "Minuscules, chiffres et tirets uniquement");

/** Limites lisibles dans Google, les mêmes que pour les pages du site (`seo.test.ts`). */
export const MAX_SEO_TITLE = 65;
export const MAX_DESCRIPTION = 160;

const serviceSlugs = serviceFamilies.map((f) => f.slug) as [
	string,
	...string[],
];

export const postFrontmatterSchema = z
	.object({
		title: z.string().min(10).max(110),
		/** Titre de la balise `<title>` s'il doit différer du titre affiché. */
		seoTitle: z.string().max(MAX_SEO_TITLE).optional(),
		description: z.string().min(50).max(MAX_DESCRIPTION),
		publishedAt: dateField,
		updatedAt: dateField.optional(),
		category: z.enum(BLOG_CATEGORY_SLUGS),
		tags: z.array(slugField).max(8).default([]),
		draft: z.boolean().default(false),
		/** Service lié : CTA en fin d'article et encart sur la page du service. */
		service: z.enum(serviceSlugs).optional(),
		/** Anciens slugs, redirigés en 301 vers l'article. */
		aliases: z.array(slugField).default([]),
		/** Image de couverture, chemin relatif au dossier de l'article. */
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
	})
	.refine((p) => (p.seoTitle ?? p.title).length <= MAX_SEO_TITLE, {
		message: `Titre de plus de ${MAX_SEO_TITLE} caractères : ajoutez un seoTitle plus court`,
		path: ["seoTitle"],
	})
	.refine((p) => !p.cover || p.coverAlt, {
		message: "coverAlt est obligatoire quand cover est défini",
		path: ["coverAlt"],
	})
	.refine((p) => !p.updatedAt || p.updatedAt >= p.publishedAt, {
		message: "updatedAt doit être postérieur à publishedAt",
		path: ["updatedAt"],
	});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
