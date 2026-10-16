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

type OgInput = { title: string; category: string };

/** Taille du titre selon sa longueur : il doit tenir sur trois lignes environ. */
const titleSize = (title: string) =>
	title.length > 80 ? 54 : title.length > 50 ? 64 : 76;

/** Image de partage (Open Graph) d'un article, aux couleurs du site. */
export async function renderOgImage({ title, category }: OgInput) {
	const svg = await satori(
		<div
			style={{
				width: INNER_WIDTH,
				height: HEIGHT - 2 * PAD_Y,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: `${PAD_Y}px ${PAD_X}px`,
				background: "#ffffff",
				backgroundImage:
					"radial-gradient(circle at 100% 0%, #e8efff 0%, #ffffff 55%)",
				fontFamily: "Inter",
				color: "#0f172a",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
				<div
					style={{
						display: "flex",
						padding: "8px 20px",
						borderRadius: 999,
						background: "#2563eb",
						color: "#ffffff",
						fontSize: 26,
						fontWeight: 700,
					}}
				>
					{category}
				</div>
				<div style={{ fontSize: 26, color: "#475569" }}>Blog</div>
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
					borderTop: "2px solid #e2e8f0",
					paddingTop: 28,
					fontSize: 28,
				}}
			>
				<div style={{ display: "flex", fontWeight: 700 }}>
					<span>nikho</span>
					<span style={{ color: "#2563eb" }}>.dev</span>
				</div>
				<div style={{ display: "flex", color: "#475569" }}>
					Nicolas Sans · DevOps freelance
				</div>
			</div>
		</div>,
		{ width: WIDTH, height: HEIGHT, fonts },
	);
	return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
		.render()
		.asPng();
}
