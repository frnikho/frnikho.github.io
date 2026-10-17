import type { ReactNode } from "react";
import type { IconName } from "@/components/diagrams/types";
import { Glyph } from "@/components/services/glyph";
import {
	LIMITS,
	nearestIndex,
	type Workload,
} from "@/features/estimator/catalog";
import { formatVisits, peakRps } from "@/features/estimator/estimate";
import { cn } from "@/lib/cn";

const SLIDER_STEPS = 100;
const { min: MIN_VISITS, max: MAX_VISITS } = LIMITS.visits;
const FILE_STEPS = [0, 5, 10, 20, 50, 100, 200, 500, 1000, 2000] as const;

/** Curseur logarithmique : chaque cran multiplie la fréquentation. */
const visitsAt = (step: number) => {
	const raw = MIN_VISITS * (MAX_VISITS / MIN_VISITS) ** (step / SLIDER_STEPS);
	const magnitude = 10 ** Math.floor(Math.log10(raw) - 1);
	return Math.round(raw / magnitude) * magnitude;
};
const stepFor = (visits: number) =>
	Math.round(
		(Math.log(visits / MIN_VISITS) / Math.log(MAX_VISITS / MIN_VISITS)) *
			SLIDER_STEPS,
	);

function Toggle({
	checked,
	onChange,
	icon,
	title,
	children,
}: {
	checked: boolean;
	onChange: (v: boolean) => void;
	icon: IconName;
	title: string;
	children: ReactNode;
}) {
	return (
		<label
			className={cn(
				"flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors",
				checked
					? "border-signal bg-signal-soft"
					: "border-line bg-card hover:border-signal/50",
			)}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="peer sr-only"
			/>
			<span
				className={cn(
					"grid size-9 shrink-0 place-items-center rounded-lg transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-signal",
					checked ? "bg-signal text-white" : "bg-paper-2 text-signal",
				)}
			>
				<Glyph name={icon} className="size-4" />
			</span>
			<span className="min-w-0 flex-1">
				<span className="block text-[0.95rem] font-semibold">{title}</span>
				<span className="block text-[0.85rem] leading-snug text-ink-soft">
					{children}
				</span>
			</span>
			<span
				aria-hidden="true"
				className={cn(
					"relative mt-1 h-5 w-9 shrink-0 rounded-full transition-colors",
					checked ? "bg-signal" : "bg-line",
				)}
			>
				<span
					className={cn(
						"absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow transition-transform",
						checked && "translate-x-4",
					)}
				/>
			</span>
		</label>
	);
}

export function WorkloadPanel({
	workload: w,
	onChange,
}: {
	workload: Workload;
	onChange: (next: Workload) => void;
}) {
	const set = <K extends keyof Workload>(key: K, value: Workload[K]) =>
		onChange({ ...w, [key]: value });
	const rps = peakRps(w.monthlyVisits);

	return (
		<fieldset className="grid gap-6">
			<legend className="eyebrow mb-3">Charge et exigences</legend>

			<label className="grid gap-2">
				<span className="flex flex-wrap items-baseline justify-between gap-x-4">
					<span className="font-semibold">Fréquentation</span>
					<span className="tabular text-[1.15rem] font-bold">
						{formatVisits(w.monthlyVisits)}{" "}
						<span className="text-[0.88rem] font-normal text-ink-soft">
							visites / mois
						</span>
					</span>
				</span>
				<input
					type="range"
					min={0}
					max={SLIDER_STEPS}
					value={stepFor(w.monthlyVisits)}
					onChange={(e) =>
						set("monthlyVisits", visitsAt(Number(e.target.value)))
					}
					aria-valuetext={`${formatVisits(w.monthlyVisits)} visites par mois`}
					className="accent-[var(--color-signal)]"
				/>
				<span className="flex justify-between text-[12px] text-ink-soft">
					<span>{formatVisits(MIN_VISITS)}</span>
					<span>
						≈{" "}
						{rps < 1
							? "moins d'une requête"
							: `${Math.round(rps).toLocaleString("fr-FR")} requêtes`}{" "}
						par seconde en pointe
					</span>
					<span>{formatVisits(MAX_VISITS)}</span>
				</span>
			</label>

			<label className="grid gap-2">
				<span className="flex flex-wrap items-baseline justify-between gap-x-4">
					<span className="font-semibold">Fichiers des utilisateurs</span>
					<span className="tabular text-[1.15rem] font-bold">
						{w.filesGb}{" "}
						<span className="text-[0.88rem] font-normal text-ink-soft">Go</span>
					</span>
				</span>
				<input
					type="range"
					min={0}
					max={FILE_STEPS.length - 1}
					value={nearestIndex(FILE_STEPS, w.filesGb)}
					onChange={(e) => set("filesGb", FILE_STEPS[Number(e.target.value)])}
					aria-valuetext={`${w.filesGb} Go`}
					className="accent-[var(--color-signal)]"
				/>
				<span className="text-[12px] text-ink-soft">
					Images, documents, pièces jointes envoyés sur le serveur.
				</span>
			</label>

			<div className="grid gap-2.5 sm:grid-cols-2">
				<Toggle
					checked={w.preprod}
					onChange={(v) => set("preprod", v)}
					icon="layers"
					title="Préproduction"
				>
					Une copie pour valider avant de publier.
				</Toggle>
				<Toggle
					checked={w.critical}
					onChange={(v) => set("critical", v)}
					icon="shield"
					title="Activité critique"
				>
					Aucune interruption tolérée : deux serveurs.
				</Toggle>
			</div>
		</fieldset>
	);
}
