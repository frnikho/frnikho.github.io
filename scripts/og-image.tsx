import { readFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const WIDTH = 1200;
const HEIGHT = 630;
// Satori dimensionne en content-box : la marge intérieure s'ajoute à la taille.
const PAD_X = 80;
const PAD_Y = 72;
const INNER_WIDTH = WIDTH - 2 * PAD_X;

const font = (weight: number) =>
	readFileSync(
		`node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`,
	);

const fonts = [
	{ name: "Inter", data: font(400), weight: 400 as const, style: "normal" as const },
	{ name: "Inter", data: font(700), weight: 700 as const, style: "normal" as const },
];

type OgInput = {
	title: string;
	category: string;
	/** Couleurs de la catégorie (`src/content/blog.ts`). */
	tone: { ink: string; soft: string };
};

/** Taille du titre selon sa longueur : il doit tenir sur trois lignes environ. */
const titleSize = (title: string) =>
	title.length > 80 ? 54 : title.length > 50 ? 64 : 76;

/** Image de partage (Open Graph) d'un article, aux couleurs du site. */
export async function renderOgImage({ title, category, tone }: OgInput) {
	const svg = await satori(
		<div
			style={{
				width: INNER_WIDTH,
				height: HEIGHT - 2 * PAD_Y,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: `${PAD_Y}px ${PAD_X}px`,
				position: "relative",
				background: "#ffffff",
				fontFamily: "Inter",
				color: "#121826",
			}}
		>
			{/* Formes pastel du site : disque bleu, carré jaune incliné, anneau. */}
			<div
				style={{
					position: "absolute",
					top: -140,
					right: -120,
					width: 460,
					height: 460,
					borderRadius: 999,
					background: "#dfe8ff",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 210,
					right: 120,
					width: 110,
					height: 110,
					borderRadius: 26,
					background: "#ffe9a8",
					transform: "rotate(14deg)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 90,
					right: 330,
					width: 54,
					height: 54,
					borderRadius: 999,
					border: "4px solid #b9ccff",
				}}
			/>
			<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
				<div
					style={{
						display: "flex",
						padding: "8px 20px",
						borderRadius: 999,
						background: tone.soft,
						color: tone.ink,
						fontSize: 26,
						fontWeight: 700,
					}}
				>
					{category}
				</div>
				<div style={{ fontSize: 26, color: "#545d6e" }}>Blog</div>
			</div>
			<div
				style={{
					display: "flex",
					width: INNER_WIDTH,
					fontSize: titleSize(title),
					fontWeight: 700,
					lineHeight: 1.08,
					letterSpacing: "-0.02em",
				}}
			>
				{title}
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: INNER_WIDTH,
					borderTop: "2px solid #e5e7ee",
					paddingTop: 28,
					fontSize: 28,
				}}
			>
				<div style={{ display: "flex", fontWeight: 700 }}>
					<span>nikho</span>
					<span style={{ color: "#2c5be6" }}>.dev</span>
				</div>
				<div style={{ display: "flex", color: "#545d6e" }}>
					Nicolas Sans · DevOps et fullstack
				</div>
			</div>
		</div>,
		{ width: WIDTH, height: HEIGHT, fonts },
	);
	return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
		.render()
		.asPng();
}
