import { useMemo, useState } from "react";
import { GROWTH_STEPS, nearestIndex } from "@/features/estimator/catalog";
import {
	formatGrowth,
	formatVisits,
	type GrowthPoint,
	upgradePoints,
} from "@/features/estimator/estimate";
import { GROWTH_COLORS } from "@/features/estimator/viz";
import { cn } from "@/lib/cn";

const W = 560;
const H = 240;
const M = { top: 16, right: 16, bottom: 30, left: 46 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;

const serverLabel = (p: GrowthPoint) =>
	p.topology === "cluster"
		? "au-delà d'un serveur"
		: `${p.vcpu} vCPU, ${p.ramGb} Go${p.topology === "ha" ? " ×2" : ""}`;

function GrowthChart({
	curve,
	selected,
}: {
	curve: GrowthPoint[];
	selected: number;
}) {
	const [hover, setHover] = useState<number | null>(null);
	const maxNeed = Math.max(...curve.map((p) => p.ramNeedGb));
	const top = 2 ** Math.max(5, Math.ceil(Math.log2(maxNeed)));
	const ticks = Array.from({ length: Math.log2(top) + 1 }, (_, i) => 2 ** i);

	const x = (i: number) => M.left + (i / (curve.length - 1)) * PLOT_W;
	const y = (gb: number) =>
		M.top + PLOT_H - (Math.log2(Math.max(1, gb)) / Math.log2(top)) * PLOT_H;

	const needPath = curve
		.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.ramNeedGb)}`)
		.join(" ");
	const singleCount = curve.filter((p) => p.topology !== "cluster").length;
	const capacityPath = curve
		.slice(0, singleCount)
		.map((p, i) =>
			i === 0 ? `M${x(0)},${y(p.ramGb)}` : `H${x(i)} V${y(p.ramGb)}`,
		)
		.join(" ");
	const clusterFrom = singleCount < curve.length ? x(singleCount - 0.5) : null;

	const focus = hover ?? selected;
	const point = curve[focus];
	const tipLeft = (x(focus) / W) * 100;

	return (
		<div className="relative">
			<svg
				viewBox={`0 0 ${W} ${H}`}
				className="w-full overflow-visible"
				role="img"
				aria-label="Mémoire nécessaire et taille du serveur selon la croissance du trafic, de ×1 à ×20, en échelle logarithmique."
				onMouseLeave={() => setHover(null)}
			>
				{ticks.map((t) => (
					<g key={t}>
						<line
							x1={M.left}
							x2={W - M.right}
							y1={y(t)}
							y2={y(t)}
							className="stroke-line"
							strokeWidth={1}
						/>
						<text
							x={M.left - 8}
							y={y(t)}
							textAnchor="end"
							dominantBaseline="central"
							className="fill-ink-soft text-[11px]"
						>
							{t} Go
						</text>
					</g>
				))}
				{curve.map((p, i) => (
					<text
						key={p.growth}
						x={x(i)}
						y={H - 8}
						textAnchor="middle"
						className={cn(
							"text-[11px]",
							i === selected ? "fill-ink font-bold" : "fill-ink-soft",
						)}
					>
						{formatGrowth(p.growth)}
					</text>
				))}
				{clusterFrom !== null && (
					<g>
						<rect
							x={clusterFrom}
							y={M.top}
							width={W - M.right - clusterFrom}
							height={PLOT_H}
							className="fill-paper-2"
						/>
						<text
							x={(clusterFrom + W - M.right) / 2}
							y={M.top + 14}
							textAnchor="middle"
							className="fill-ink-soft text-[11px] font-semibold"
						>
							plusieurs serveurs
						</text>
					</g>
				)}
				<line
					x1={x(selected)}
					x2={x(selected)}
					y1={M.top}
					y2={M.top + PLOT_H}
					className="stroke-ink/25"
					strokeWidth={1}
					strokeDasharray="3 4"
				/>
				<path
					d={capacityPath}
					fill="none"
					stroke={GROWTH_COLORS.capacity}
					strokeWidth={2}
					strokeLinejoin="round"
				/>
				<path
					d={needPath}
					fill="none"
					stroke={GROWTH_COLORS.need}
					strokeWidth={2}
					strokeLinejoin="round"
					strokeLinecap="round"
				/>
				{point && (
					<g>
						<line
							x1={x(focus)}
							x2={x(focus)}
							y1={M.top}
							y2={M.top + PLOT_H}
							className="stroke-ink/40"
							strokeWidth={1}
						/>
						<circle
							cx={x(focus)}
							cy={y(point.ramNeedGb)}
							r={5}
							fill={GROWTH_COLORS.need}
							className="stroke-white"
							strokeWidth={2}
						/>
						{point.topology !== "cluster" && (
							<circle
								cx={x(focus)}
								cy={y(point.ramGb)}
								r={5}
								fill={GROWTH_COLORS.capacity}
								className="stroke-white"
								strokeWidth={2}
							/>
						)}
					</g>
				)}
				{curve.map((p, i) => (
					<rect
						key={p.growth}
						x={x(i) - PLOT_W / (curve.length - 1) / 2}
						y={M.top}
						width={PLOT_W / (curve.length - 1)}
						height={PLOT_H}
						fill="transparent"
						onMouseEnter={() => setHover(i)}
					/>
				))}
			</svg>
			{point && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute top-0 z-10 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-line bg-card px-3 py-2 text-[12px] shadow-[var(--shadow-card)]"
					style={{
						left: `clamp(110px, ${tipLeft}%, calc(100% - 110px))`,
					}}
				>
					<p className="font-semibold">
						{formatGrowth(point.growth)} · {formatVisits(point.visits)} visites
					</p>
					<p className="mt-0.5 flex items-center gap-1.5 text-ink-soft">
						<span
							className="size-2 rounded-full"
							style={{ backgroundColor: GROWTH_COLORS.need }}
						/>
						Besoin : {point.ramNeedGb.toLocaleString("fr-FR")} Go
					</p>
					<p className="flex items-center gap-1.5 text-ink-soft">
						<span
							className="size-2 rounded-full"
							style={{ backgroundColor: GROWTH_COLORS.capacity }}
						/>
						Serveur : {serverLabel(point)}
					</p>
				</div>
			)}
		</div>
	);
}

export function GrowthPanel({
	curve,
	growth,
	onGrowthChange,
}: {
	curve: GrowthPoint[];
	growth: number;
	onGrowthChange: (g: number) => void;
}) {
	const index = nearestIndex(GROWTH_STEPS, growth);
	const upgrades = useMemo(() => upgradePoints(curve), [curve]);
	const current = curve[index];

	return (
		<div className="grid gap-6">
			<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem]">
				<span className="flex items-center gap-2">
					<span
						aria-hidden="true"
						className="h-0.5 w-5 rounded-full"
						style={{ backgroundColor: GROWTH_COLORS.need }}
					/>
					Mémoire nécessaire
				</span>
				<span className="flex items-center gap-2">
					<span
						aria-hidden="true"
						className="h-0.5 w-5 rounded-full"
						style={{ backgroundColor: GROWTH_COLORS.capacity }}
					/>
					Taille du serveur
				</span>
				<span className="text-ink-soft">Échelle logarithmique</span>
			</div>

			<GrowthChart curve={curve} selected={index} />

			<label className="grid gap-2">
				<span className="flex flex-wrap items-baseline justify-between gap-x-4">
					<span className="font-semibold">Croissance simulée</span>
					<span className="tabular text-[1.15rem] font-bold">
						{formatGrowth(growth)}{" "}
						<span className="text-[0.88rem] font-normal text-ink-soft">
							soit {formatVisits(current.visits)} visites / mois
						</span>
					</span>
				</span>
				<input
					type="range"
					min={0}
					max={GROWTH_STEPS.length - 1}
					value={index}
					onChange={(e) => onGrowthChange(GROWTH_STEPS[Number(e.target.value)])}
					aria-valuetext={`${formatGrowth(growth)}, ${formatVisits(current.visits)} visites par mois`}
					className="accent-[var(--color-signal)]"
				/>
			</label>

			<p className="rounded-xl bg-signal-soft p-4 text-[0.95rem]">
				À {formatGrowth(growth)}, avec le trafic, les données et les fichiers
				multipliés d'autant : <strong>{serverLabel(current)}</strong>.
			</p>

			<div>
				<h3 className="text-[0.95rem] font-semibold">Paliers à anticiper</h3>
				{upgrades.length === 0 ? (
					<p className="mt-2 text-[0.92rem] text-ink-soft">
						Le serveur actuel tient jusqu'à ×20 : aucun changement de taille à
						prévoir.
					</p>
				) : (
					<ol className="mt-3 grid gap-2">
						{upgrades.map((u) => (
							<li key={u.growth}>
								<button
									type="button"
									onClick={() => onGrowthChange(u.growth)}
									className={cn(
										"flex w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[0.9rem] transition-colors",
										u.growth === growth
											? "border-signal bg-signal-soft"
											: "border-line hover:border-signal/50",
									)}
								>
									<span className="tabular w-12 shrink-0 font-bold text-signal-deep">
										{formatGrowth(u.growth)}
									</span>
									<span className="flex-1 text-ink-soft">
										{formatVisits(u.visits)} visites / mois
									</span>
									<span className="font-semibold">{serverLabel(u)}</span>
								</button>
							</li>
						))}
					</ol>
				)}
			</div>

			<details className="text-[0.88rem]">
				<summary className="cursor-pointer font-semibold text-signal-deep">
					Voir le tableau complet
				</summary>
				<div className="mt-3 overflow-x-auto">
					<table className="w-full text-left">
						<thead className="text-ink-soft">
							<tr className="border-b border-line">
								<th className="py-2 pr-3 font-medium">Croissance</th>
								<th className="py-2 pr-3 font-medium">Visites / mois</th>
								<th className="py-2 pr-3 font-medium">Mémoire nécessaire</th>
								<th className="py-2 font-medium">Serveur</th>
							</tr>
						</thead>
						<tbody className="tabular">
							{curve.map((p) => (
								<tr key={p.growth} className="border-b border-line">
									<td className="py-2 pr-3 font-semibold">
										{formatGrowth(p.growth)}
									</td>
									<td className="py-2 pr-3">{formatVisits(p.visits)}</td>
									<td className="py-2 pr-3">
										{p.ramNeedGb.toLocaleString("fr-FR")} Go
									</td>
									<td className="py-2">{serverLabel(p)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</details>
		</div>
	);
}
