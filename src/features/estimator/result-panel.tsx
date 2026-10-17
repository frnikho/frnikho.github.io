import { type CSSProperties, useState } from "react";
import { Glyph } from "@/components/services/glyph";
import { CATEGORIES } from "@/features/estimator/catalog";
import type { Estimate } from "@/features/estimator/estimate";
import { useAnimatedNumber } from "@/features/estimator/use-animated-number";
import {
	formatMb,
	HEADROOM_FILL,
	PREPROD_FILL,
	SEGMENT_COLORS,
	SEGMENT_LABELS,
} from "@/features/estimator/viz";
import { cn } from "@/lib/cn";

function Metric({ value, unit }: { value: number; unit: string }) {
	const shown = useAnimatedNumber(value);
	return (
		<div>
			<p className="tabular text-[clamp(2.2rem,1.6rem+2vw,3.2rem)] leading-none font-bold">
				{Math.round(shown)}
			</p>
			<p className="mt-1.5 text-[0.9rem] text-night-soft">{unit}</p>
		</div>
	);
}

type Part = { key: string; label: string; mb: number; fill: CSSProperties };

function memoryParts(e: Estimate): Part[] {
	const parts: Part[] = [
		{
			key: "platform",
			label: SEGMENT_LABELS.platform,
			mb: e.platform.ramMb,
			fill: { backgroundColor: SEGMENT_COLORS.platform },
		},
	];
	for (const cat of CATEGORIES) {
		const mb = e.components
			.filter((c) => c.category === cat)
			.reduce((n, c) => n + c.ramMb, 0);
		if (mb > 0) {
			parts.push({
				key: cat,
				label: SEGMENT_LABELS[cat],
				mb,
				fill: { backgroundColor: SEGMENT_COLORS[cat] },
			});
		}
	}
	if (e.preprod) {
		parts.push({
			key: "preprod",
			label: "Préproduction",
			mb: e.preprod.ramMb,
			fill: { backgroundImage: PREPROD_FILL },
		});
	}
	parts.push({
		key: "headroom",
		label: "Marge pour les pics",
		mb: e.need.ramMb - parts.reduce((n, p) => n + p.mb, 0),
		fill: { backgroundColor: HEADROOM_FILL },
	});
	return parts.filter((p) => p.mb > 0);
}

/** Barre empilée de la mémoire, avec lecture au survol ou au clavier. */
function MemoryBar({ estimate: e }: { estimate: Estimate }) {
	const parts = memoryParts(e);
	const capacityMb = e.ramGb * 1024;
	const [active, setActive] = useState<string | null>(null);
	const focused = parts.find((p) => p.key === active);
	const used = Math.round((e.need.ramMb / capacityMb) * 100);

	return (
		<div>
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="text-[0.95rem] font-semibold">Mémoire</h3>
				<p
					className="tabular text-[0.85rem] text-night-soft"
					aria-live="polite"
				>
					{focused
						? `${focused.label} · ${formatMb(focused.mb)}`
						: `${formatMb(e.need.ramMb)} sur ${e.ramGb} Go · ${Math.min(used, 999)} %`}
				</p>
			</div>
			<ul
				className="mt-3 flex h-4 gap-[2px] overflow-hidden rounded-[4px] bg-night-2"
				onMouseLeave={() => setActive(null)}
			>
				{parts.map((p) => (
					<li
						key={p.key}
						// biome-ignore lint/a11y/noNoninteractiveTabindex: lecture clavier de la valeur
						tabIndex={0}
						aria-label={`${p.label} : ${formatMb(p.mb)}`}
						onMouseEnter={() => setActive(p.key)}
						onFocus={() => setActive(p.key)}
						onBlur={() => setActive(null)}
						className={cn(
							"h-full transition-[flex-grow,opacity] duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-white",
							active && active !== p.key && "opacity-50",
						)}
						style={{ ...p.fill, flexGrow: p.mb, flexBasis: 0 }}
					/>
				))}
				{capacityMb > e.need.ramMb && (
					<li
						aria-label={`Libre : ${formatMb(capacityMb - e.need.ramMb)}`}
						className="h-full"
						style={{ flexGrow: capacityMb - e.need.ramMb, flexBasis: 0 }}
					/>
				)}
			</ul>
			<ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.82rem]">
				{parts.map((p) => (
					<li key={p.key} className="flex items-center gap-2">
						<span
							aria-hidden="true"
							className="size-2.5 shrink-0 rounded-[3px]"
							style={p.fill}
						/>
						<span className="flex-1 truncate text-night-soft">{p.label}</span>
						<span className="tabular text-night-ink">{formatMb(p.mb)}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function Gauge({
	label,
	need,
	capacity,
	unit,
}: {
	label: string;
	need: number;
	capacity: number;
	unit: string;
}) {
	const ratio = Math.min(1, need / capacity);
	return (
		<div>
			<div className="flex items-baseline justify-between gap-4 text-[0.85rem]">
				<span className="font-semibold">{label}</span>
				<span className="tabular text-night-soft">
					{need.toLocaleString("fr-FR")} / {capacity} {unit}
				</span>
			</div>
			<div className="mt-2 h-2 rounded-[4px] bg-night-2">
				<div
					className="h-full rounded-[4px] bg-signal-glow transition-[width] duration-500 ease-out"
					style={{ width: `${Math.max(3, ratio * 100)}%` }}
				/>
			</div>
		</div>
	);
}

export function ResultPanel({
	estimate: e,
	offerLabel,
	onCopyLink,
	onPrint,
	cta,
}: {
	estimate: Estimate;
	offerLabel?: string;
	onCopyLink: () => void;
	onPrint: () => void;
	cta: React.ReactNode;
}) {
	const cluster = e.topology === "cluster";
	return (
		<div>
			<p className="eyebrow !text-signal-glow">Estimation indicative</p>
			<p key={e.profile} className="rise-in mt-2 text-[1.35rem] font-semibold">
				{cluster ? "Au-delà d'un serveur" : `Profil ${e.profile.toLowerCase()}`}
				{e.servers > 1 && !cluster && " · 2 serveurs"}
			</p>

			<div className="mt-6 grid grid-cols-3 gap-4 border-b border-night-line pb-6">
				<Metric value={e.vcpu} unit="vCPU" />
				<Metric value={e.ramGb} unit="Go de RAM" />
				<Metric value={e.diskGb} unit="Go de disque" />
			</div>

			<div className="mt-6 grid gap-5">
				<MemoryBar estimate={e} />
				<Gauge
					label="Processeur"
					need={e.need.cpu}
					capacity={e.vcpu}
					unit="vCPU"
				/>
				<Gauge
					label="Disque"
					need={e.need.diskGb}
					capacity={e.diskGb}
					unit="Go"
				/>
			</div>

			{e.notes.length > 0 && (
				<ul className="mt-6 grid gap-2 text-[0.9rem] text-night-soft">
					{e.notes.map((n) => (
						<li key={n} className="flex gap-2">
							<span aria-hidden="true" className="text-signal-glow">
								→
							</span>
							{n}
						</li>
					))}
				</ul>
			)}

			{offerLabel && (
				<p className="mt-6 text-[0.92rem] text-night-soft">
					Formule adaptée :{" "}
					<strong className="text-night-ink">{offerLabel}</strong>.
				</p>
			)}

			<div className="mt-6">{cta}</div>
			<div className="mt-3 grid grid-cols-2 gap-2">
				<button
					type="button"
					onClick={onCopyLink}
					className="inline-flex items-center justify-center gap-2 rounded-lg border border-night-line px-3 py-2.5 text-[14px] font-semibold transition-colors hover:border-signal-glow hover:text-signal-glow"
				>
					<Glyph name="network" className="size-4" />
					Copier le lien
				</button>
				<button
					type="button"
					onClick={onPrint}
					className="inline-flex items-center justify-center gap-2 rounded-lg border border-night-line px-3 py-2.5 text-[14px] font-semibold transition-colors hover:border-signal-glow hover:text-signal-glow"
				>
					<Glyph name="file" className="size-4" />
					Exporter en PDF
				</button>
			</div>
			<p className="mt-4 text-[12.5px] leading-relaxed text-night-soft">
				Ordre de grandeur calculé à partir de profils types, marge de 30 %
				comprise. La taille définitive se confirme en mesurant votre application
				réelle.
			</p>
		</div>
	);
}
