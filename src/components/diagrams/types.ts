export type Tone = "default" | "primary" | "ok" | "danger" | "night";

export type IconName =
	| "git"
	| "pr"
	| "sync"
	| "zap"
	| "box"
	| "layers"
	| "server"
	| "database"
	| "disk"
	| "archive"
	| "lock"
	| "shield"
	| "activity"
	| "eye"
	| "bell"
	| "users"
	| "globe"
	| "network"
	| "cpu"
	| "file"
	| "check"
	| "ban";

export type DNode = {
	id: string;
	x: number;
	y: number;
	w: number;
	h: number;
	title: string | string[];
	sub?: string;
	tone?: Tone;
	/** Pictogramme dans une pastille. Sans icône, le texte est centré. */
	icon?: IconName;
	/** Numéro d'étape affiché sur l'angle du nœud. */
	step?: number;
	/** `row` : icône à gauche. `stack` : icône au-dessus du texte, centré. */
	layout?: "row" | "stack";
};

export type DZone = {
	x: number;
	y: number;
	w: number;
	h: number;
	label: string;
	/** Couronne d'étoiles européennes dans l'angle. */
	eu?: boolean;
	/** Position de l'intitulé, en haut par défaut. */
	labelAt?: "top" | "bottom";
};

export type DEdge = {
	id: string;
	d: string;
	/** Pointillés animés avec pointe de flèche. */
	flow?: boolean;
	/** Lien interdit : rouge, statique. */
	blocked?: boolean;
	/** Trajet invisible, réservé aux paquets animés. */
	hidden?: boolean;
	/** Étiquette posée sur le lien, centrée sur (x, y). */
	label?: { text: string; x: number; y: number };
};

export type DPacket = {
	edge: string;
	dur: number;
	delay?: number;
	gap?: number;
	tone?: "primary" | "danger";
};

export type DMark = { x: number; y: number; text: string };

export type DVariant = {
	size: readonly [number, number];
	zones?: DZone[];
	nodes: DNode[];
	edges: DEdge[];
	packets?: DPacket[];
	marks?: DMark[];
};

export type LegendKind = "flow" | "blocked" | "zone" | "step";

export type DiagramSpec = {
	/** Description lue par les lecteurs d'écran. */
	label: string;
	wide: DVariant;
	tall: DVariant;
	legend?: { kind: LegendKind; text: string }[];
};
