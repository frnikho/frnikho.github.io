/**
 * Génère public/cover.jpg, l'image de partage par défaut du site (accueil et
 * pages sans image dédiée), aux couleurs du site : portrait, nom et métier.
 *
 * Usage : bun run cover
 */
import { readFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT = "public/cover.jpg";

const font = (weight: number) =>
	readFileSync(
		`node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`,
	);

const fonts = [
	{ name: "Inter", data: font(400), weight: 400 as const, style: "normal" as const },
	{ name: "Inter", data: font(700), weight: 700 as const, style: "normal" as const },
];

const dataUri = async (path: string, size: [number, number]) => {
	const buffer = await sharp(path)
		.resize(size[0], size[1], { fit: "cover", position: "top" })
		.png()
		.toBuffer();
	return `data:image/png;base64,${buffer.toString("base64")}`;
};

const PORTRAIT: [number, number] = [340, 400];
const portrait = await dataUri("public/portrait.jpg", PORTRAIT);
const logo = await dataUri("public/android-chrome-192x192.png", [64, 64]);

const svg = await satori(
	<div
		style={{
			width: WIDTH,
			height: HEIGHT,
			display: "flex",
			position: "relative",
			background: "#ffffff",
			fontFamily: "Inter",
			color: "#121826",
		}}
	>
		{/* Formes pastel du site : disque bleu, carré jaune, anneau. */}
		<div
			style={{
				position: "absolute",
				top: -170,
				right: -150,
				width: 620,
				height: 620,
				borderRadius: 999,
				background: "#dfe8ff",
			}}
		/>
		<div
			style={{
				position: "absolute",
				bottom: -90,
				left: -70,
				width: 240,
				height: 240,
				borderRadius: 999,
				background: "#fff8db",
			}}
		/>
		<div
			style={{
				position: "absolute",
				top: 70,
				left: 640,
				width: 46,
				height: 46,
				borderRadius: 999,
				border: "5px solid #b9ccff",
			}}
		/>

		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				position: "relative",
				width: 700,
				padding: "72px 0 72px 80px",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
				<img src={logo} width={52} height={52} alt="" />
				<div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
					<span>nikho</span>
					<span style={{ color: "#2c5be6" }}>.dev</span>
				</div>
			</div>

			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02 }}>
					Nicolas Sans
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 22,
						fontSize: 44,
						fontWeight: 700,
						lineHeight: 1.2,
					}}
				>
					<span style={{ marginRight: 14 }}>Ingénieur</span>
					<span
						style={{
							padding: "0 8px",
							backgroundImage:
								"linear-gradient(transparent 55%, #ffe066 55%, #ffe066 92%, transparent 92%)",
						}}
					>
						DevOps et fullstack
					</span>
				</div>
				<div
					style={{
						marginTop: 26,
						fontSize: 27,
						lineHeight: 1.4,
						color: "#545d6e",
						maxWidth: 600,
					}}
				>
					Développement, mise en production et exploitation d'applications,
					sur une infrastructure européenne.
				</div>
			</div>

			<div style={{ display: "flex", fontSize: 23, color: "#1f43b3", fontWeight: 700 }}>
				Freelance · À distance, partout en France
			</div>
		</div>

		<div
			style={{
				display: "flex",
				position: "absolute",
				top: 115,
				right: 110,
				width: PORTRAIT[0],
				height: PORTRAIT[1],
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 16,
					left: 16,
					width: PORTRAIT[0],
					height: PORTRAIT[1],
					borderRadius: 32,
					background: "#ffe066",
					transform: "rotate(3deg)",
				}}
			/>
			<img
				src={portrait}
				width={PORTRAIT[0]}
				height={PORTRAIT[1]}
				alt=""
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					borderRadius: 32,
					objectFit: "cover",
				}}
			/>
		</div>
	</div>,
	{ width: WIDTH, height: HEIGHT, fonts },
);

const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } })
	.render()
	.asPng();
await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(OUTPUT);
console.log(`cover : ${OUTPUT} généré (${WIDTH}×${HEIGHT})`);
