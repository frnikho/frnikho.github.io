import type { Category } from "@/features/estimator/catalog";

/**
 * Couleurs des graphiques, dans un ordre fixe : la couleur suit la famille de
 * composant, jamais son rang. Palette validée (bande de clarté, séparation
 * daltonisme, contraste ≥ 3:1) sur le fond sombre du panneau de résultat.
 */
export type Segment = "platform" | Category;

export const SEGMENT_COLORS: Record<Segment, string> = {
	platform: "#3987e5",
	app: "#d95926",
	data: "#199e70",
	service: "#c98500",
};

export const SEGMENT_LABELS: Record<Segment, string> = {
	platform: "Plateforme et système",
	app: "Applications",
	data: "Données",
	service: "Services",
};

/** Préproduction : texture plutôt qu'une cinquième teinte. */
export const PREPROD_FILL =
	"repeating-linear-gradient(135deg, #6b7590 0 2px, transparent 2px 6px)";
/** Marge pour les pics : neutre, sans teinte. */
export const HEADROOM_FILL = "#3a4458";

/** Graphique de croissance, sur fond clair : besoin et capacité du serveur. */
export const GROWTH_COLORS = { need: "#2a78d6", capacity: "#eb6834" } as const;

export const formatMb = (mb: number) =>
	mb >= 1024
		? `${(mb / 1024).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Go`
		: `${Math.round(mb)} Mo`;
