import { useState } from "react";
import { Glyph } from "@/components/services/glyph";
import {
	CATEGORIES,
	CATEGORY_LABELS,
	COMPONENT_KINDS,
	type ComponentKind,
	KINDS,
	LIMITS,
	nearestIndex,
	type StackComponent,
} from "@/features/estimator/catalog";
import type { ComponentLoad } from "@/features/estimator/estimate";
import { formatMb, SEGMENT_COLORS } from "@/features/estimator/viz";
import { cn } from "@/lib/cn";

const DATA_STEPS = [0, 1, 2, 5, 10, 20, 50, 100, 200, 500] as const;

function Stepper({
	value,
	label,
	onChange,
}: {
	value: number;
	label: string;
	onChange: (n: number) => void;
}) {
	const btn =
		"grid size-8 place-items-center rounded-lg border border-line bg-card text-[1.05rem] leading-none transition-colors hover:border-signal hover:text-signal disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink";
	return (
		<div className="flex items-center gap-1.5">
			<button
				type="button"
				aria-label={`Retirer une instance : ${label}`}
				disabled={value <= 1}
				onClick={() => onChange(value - 1)}
				className={btn}
			>
				−
			</button>
			<output
				aria-label={`Instances : ${label}`}
				className="tabular w-8 text-center font-semibold"
			>
				×{value}
			</output>
			<button
				type="button"
				aria-label={`Ajouter une instance : ${label}`}
				disabled={value >= LIMITS.replicas}
				onClick={() => onChange(value + 1)}
				className={btn}
			>
				+
			</button>
		</div>
	);
}

function ComponentRow({
	component: c,
	load,
	onChange,
	onRemove,
}: {
	component: StackComponent;
	load?: ComponentLoad;
	onChange: (next: StackComponent) => void;
	onRemove: () => void;
}) {
	const spec = KINDS[c.kind];
	return (
		<li className="rise-in rounded-xl border border-line bg-card p-3.5 sm:p-4">
			<div className="flex items-center gap-3">
				<span
					className="grid size-10 shrink-0 place-items-center rounded-xl text-white"
					style={{ backgroundColor: SEGMENT_COLORS[spec.category] }}
				>
					<Glyph name={spec.icon} />
				</span>
				<div className="min-w-0 flex-1">
					<p className="leading-tight font-semibold">{spec.label}</p>
					<p className="truncate text-[0.85rem] text-ink-soft">
						{spec.hint}
						{load && (
							<span className="tabular">
								{" "}
								· {formatMb(load.ramMb)}, {load.cpu.toLocaleString("fr-FR")}{" "}
								vCPU
							</span>
						)}
					</p>
				</div>
				{spec.scalable && (
					<Stepper
						value={c.replicas}
						label={spec.label}
						onChange={(replicas) => onChange({ ...c, replicas })}
					/>
				)}
				<button
					type="button"
					onClick={onRemove}
					aria-label={`Supprimer ${spec.label}`}
					className="grid size-8 shrink-0 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-[#fff4ed] hover:text-alert"
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 16 16"
						className="size-3.5"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
					>
						<path d="M4 4l8 8M12 4l-8 8" />
					</svg>
				</button>
			</div>
			{spec.hasData && (
				<label className="mt-3 flex items-center gap-3 text-[0.88rem]">
					<span className="w-20 shrink-0 text-ink-soft">Données</span>
					<input
						type="range"
						min={0}
						max={DATA_STEPS.length - 1}
						value={nearestIndex(DATA_STEPS, c.dataGb)}
						onChange={(e) =>
							onChange({ ...c, dataGb: DATA_STEPS[Number(e.target.value)] })
						}
						aria-valuetext={`${c.dataGb} Go`}
						className="flex-1 accent-[var(--color-signal)]"
					/>
					<span className="tabular w-16 text-right font-semibold">
						{c.dataGb} Go
					</span>
				</label>
			)}
		</li>
	);
}

function AddMenu({ onAdd }: { onAdd: (kind: ComponentKind) => void }) {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<button
				type="button"
				aria-expanded={open}
				onClick={() => setOpen((o) => !o)}
				className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line p-3.5 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:border-signal hover:text-signal"
			>
				<span aria-hidden="true" className="text-[1.2rem] leading-none">
					{open ? "−" : "+"}
				</span>
				Ajouter un composant
			</button>
			{open && (
				<div className="rise-in mt-3 grid gap-4 rounded-xl bg-paper-2 p-4">
					{CATEGORIES.map((cat) => (
						<div key={cat}>
							<p className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft">
								<span
									aria-hidden="true"
									className="size-2.5 rounded-full"
									style={{ backgroundColor: SEGMENT_COLORS[cat] }}
								/>
								{CATEGORY_LABELS[cat]}
							</p>
							<div className="mt-2 flex flex-wrap gap-2">
								{COMPONENT_KINDS.filter((k) => KINDS[k].category === cat).map(
									(k) => (
										<button
											key={k}
											type="button"
											onClick={() => {
												onAdd(k);
												setOpen(false);
											}}
											className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-[0.88rem] font-medium transition-colors hover:border-signal hover:text-signal-deep"
										>
											<Glyph
												name={KINDS[k].icon}
												className="size-4 text-signal"
											/>
											{KINDS[k].label}
										</button>
									),
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export function StackEditor({
	stack,
	loads,
	onChange,
}: {
	stack: StackComponent[];
	loads: ComponentLoad[];
	onChange: (next: StackComponent[]) => void;
}) {
	const full = stack.length >= LIMITS.components;
	const add = (kind: ComponentKind) =>
		onChange([
			...stack,
			{ kind, replicas: 1, dataGb: KINDS[kind].hasData ? 1 : 0 },
		]);
	return (
		<fieldset className="grid gap-3">
			<legend className="eyebrow mb-3">Votre stack</legend>
			{stack.length === 0 ? (
				<p className="rounded-xl bg-paper-2 p-5 text-center text-[0.95rem] text-ink-soft">
					Aucun composant pour l'instant. Partez d'un modèle ou ajoutez vos
					briques une à une.
				</p>
			) : (
				<ul className="grid gap-2.5">
					{stack.map((c, i) => (
						<ComponentRow
							// Position dans la stack : l'ordre est stable entre deux rendus.
							key={`${i}-${c.kind}`}
							component={c}
							load={loads[i]}
							onChange={(next) =>
								onChange(stack.map((x, j) => (j === i ? next : x)))
							}
							onRemove={() => onChange(stack.filter((_, j) => j !== i))}
						/>
					))}
				</ul>
			)}
			{full ? (
				<p className={cn("text-center text-[0.88rem] text-ink-soft")}>
					{LIMITS.components} composants au maximum : au-delà, parlons-en
					directement.
				</p>
			) : (
				<AddMenu onAdd={add} />
			)}
		</fieldset>
	);
}
