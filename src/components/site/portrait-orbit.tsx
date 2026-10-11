import { ICONS } from "@/components/diagrams/icons";
import type { IconName } from "@/components/diagrams/types";

/** Repère : 1 unité = 1 px pour un portrait de 416 × 458, centré en (0, 0). */
const R = 290;
const BADGE_R = 22;
const COLORS = ["#4FABFF", "#B1C5FF", "#FFC99B"] as const;

type Badge = { icon: IconName; angle: number; delay: number };

/** Positions sur le cercle, hors du cadre du portrait (jamais rognées sur les côtés). */
const BADGES: Badge[] = [
	{ icon: "shield", angle: -66, delay: 1.1 },
	{ icon: "database", angle: 66, delay: 1.4 },
	{ icon: "lock", angle: 114, delay: 1.7 },
	{ icon: "activity", angle: -114, delay: 2 },
];

const point = (angle: number) => {
	const a = (angle * Math.PI) / 180;
	return { x: Math.cos(a) * R, y: Math.sin(a) * R };
};

/**
 * Décor autour du portrait : orbites qui se tracent à l'arrivée, une comète qui
 * parcourt le cercle, et quatre pastilles reliées au portrait (sécurité, données,
 * chiffrement, supervision). Purement décoratif, CSS seul.
 * À placer dans un parent `relative`, avant le portrait (qui doit être `relative`).
 */
export function PortraitOrbit() {
	return (
		<svg
			aria-hidden="true"
			viewBox="-340 -380 680 760"
			fill="none"
			className="pointer-events-none absolute top-1/2 left-1/2 h-auto w-[163%] max-w-none -translate-x-1/2 -translate-y-1/2 overflow-visible"
		>
			<defs>
				<linearGradient id="orbit-comet" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0" stopColor={COLORS[0]} />
					<stop offset="1" stopColor={COLORS[2]} />
				</linearGradient>
				<filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
					<feGaussianBlur stdDeviation="6" />
				</filter>
			</defs>

			<circle
				r={R + 62}
				stroke="#2563eb"
				strokeOpacity="0.22"
				strokeWidth="1.25"
				strokeDasharray="2 10"
				strokeLinecap="round"
				className="orbit-march"
			/>
			<circle
				r={R}
				pathLength={1}
				stroke="#2563eb"
				strokeOpacity="0.3"
				strokeWidth="1.5"
				className="orbit-draw"
			/>
			<circle
				r={R - 58}
				pathLength={1}
				stroke="#2563eb"
				strokeOpacity="0.16"
				strokeWidth="1.25"
				className="orbit-draw"
				style={{ animationDelay: "0.25s" }}
			/>

			{/* Comète : arc lumineux qui parcourt le cercle principal. */}
			<g className="orbit-comet">
				<circle
					r={R}
					pathLength={1}
					stroke="url(#orbit-comet)"
					strokeWidth="7"
					strokeLinecap="round"
					filter="url(#orbit-glow)"
					strokeOpacity="0.55"
				/>
				<circle
					r={R}
					pathLength={1}
					stroke="url(#orbit-comet)"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
			</g>

			{BADGES.map((b) => {
				const p = point(b.angle);
				return (
					<g key={b.icon}>
						<path
							d={`M${p.x} ${p.y}L${p.x * 0.55} ${p.y * 0.55}`}
							stroke="#2563eb"
							strokeOpacity="0.4"
							strokeWidth="1.5"
							strokeDasharray="4 6"
							strokeLinecap="round"
							className="flow-line"
						/>
						<g transform={`translate(${p.x} ${p.y})`}>
							<g
								className="orbit-bob"
								style={{ "--d": `${b.delay}s` } as React.CSSProperties}
							>
								<circle
									r={BADGE_R + 8}
									fill="#4FABFF"
									fillOpacity="0.14"
									className="orbit-ping"
									style={{ "--d": `${b.delay}s` } as React.CSSProperties}
								/>
								<circle
									r={BADGE_R}
									fill="#fff"
									stroke="#2563eb"
									strokeOpacity="0.28"
									strokeWidth="1.5"
								/>
								<path
									d={ICONS[b.icon]}
									transform="translate(-11 -11) scale(0.916)"
									stroke="#2563eb"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
						</g>
					</g>
				);
			})}
		</svg>
	);
}
