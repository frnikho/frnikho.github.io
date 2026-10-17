import type { CSSProperties } from "react";
import { getBlogCategory } from "@/content/blog";

/**
 * Variables CSS de la couleur d'une catégorie (`--cat`, `--cat-soft`,
 * `--cat-line`), à poser en `style` puis à lire avec `text-(--cat)` etc.
 * Les teintes vivent dans `src/content/blog.ts`, partagées avec l'image OG.
 */
export function categoryStyle(slug: string): CSSProperties | undefined {
	const tone = getBlogCategory(slug)?.tone;
	if (!tone) return undefined;
	return {
		"--cat": tone.ink,
		"--cat-soft": tone.soft,
		"--cat-line": tone.line,
	} as CSSProperties;
}
