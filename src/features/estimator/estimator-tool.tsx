import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { buttonClass } from "@/components/site/button";
import { offers } from "@/content/offers";
import {
	APP_TYPE_LABELS,
	APP_TYPES,
	DATABASE_LABELS,
	DATABASES,
	DB_SIZE_LABELS,
	DB_SIZES,
	DEFAULT_INPUT,
	type EstimatorInput,
	EXTRA_LABELS,
	EXTRAS,
	estimateResources,
	formatEstimate,
	TRAFFIC_LABELS,
	TRAFFICS,
} from "@/features/estimator/estimate";
import { useAnimatedNumber } from "@/features/estimator/use-animated-number";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const fieldClass =
	"w-full rounded-lg border border-line bg-card px-3.5 py-3 text-[0.95rem] outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/25";
const labelClass = "eyebrow";

/** Un seul événement « estimateur utilisé » par visite. */
let usedReported = false;
function trackOnce(name: string) {
	if (usedReported) return;
	usedReported = true;
	trackEvent(name);
}

const MAX_APPS = 10;
const MAX_FILES_GB = 2000;

function Select<T extends string>({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: T;
	options: Record<T, string>;
	onChange: (v: T) => void;
}) {
	return (
		<label className="flex flex-col gap-1.5">
			<span className={labelClass}>{label}</span>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value as T)}
				className={fieldClass}
			>
				{(Object.keys(options) as T[]).map((k) => (
					<option key={k} value={k}>
						{options[k]}
					</option>
				))}
			</select>
		</label>
	);
}

const pick = <T extends string>(
	keys: readonly T[],
	labels: Record<T, string>,
) => Object.fromEntries(keys.map((k) => [k, labels[k]])) as Record<T, string>;

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

export function EstimatorTool() {
	const [input, setInput] = useState<EstimatorInput>(DEFAULT_INPUT);
	const result = useMemo(() => estimateResources(input), [input]);
	const set = <K extends keyof EstimatorInput>(
		key: K,
		value: EstimatorInput[K],
	) => setInput((prev) => ({ ...prev, [key]: value }));

	const toggleExtra = (extra: (typeof EXTRAS)[number]) =>
		set(
			"extras",
			input.extras.includes(extra)
				? input.extras.filter((e) => e !== extra)
				: [...input.extras, extra],
		);

	const offer = offers.find((o) => o.id === result.offer);
	const maxRam = Math.max(...result.breakdown.map((b) => b.ramMb));

	// Éclat bref du panneau à chaque modification (pas au premier affichage).
	const [flash, setFlash] = useState(0);
	const first = useRef(true);
	useEffect(() => {
		if (first.current) {
			first.current = false;
			return;
		}
		setFlash((n) => n + 1);
		trackOnce("estimator-used");
	}, [input]);

	return (
		<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
			<form
				className="surface grid gap-6 p-6 sm:p-8"
				onSubmit={(e) => e.preventDefault()}
				aria-label="Paramètres de l'application"
			>
				<Select
					label="Type d'application"
					value={input.appType}
					options={pick(APP_TYPES, APP_TYPE_LABELS)}
					onChange={(v) => set("appType", v)}
				/>
				{result.custom ? (
					<div key="custom" className="rise-in rounded-xl bg-signal-soft p-5">
						<p className="text-[1.1rem] font-semibold">Sur mesure</p>
						<p className="mt-1.5 text-[0.95rem] text-ink-soft">
							Une application spécifique ne se dimensionne pas avec des profils
							types : nous partons de son fonctionnement réel, en 30 minutes
							d'échange.
						</p>
					</div>
				) : (
					<div key="fields" className="rise-in grid gap-6">
						<div className="grid gap-6 sm:grid-cols-2">
							<label className="flex flex-col gap-1.5">
								<span className={labelClass}>Nombre d'applications</span>
								<input
									type="number"
									min={1}
									max={MAX_APPS}
									value={input.appsCount}
									onChange={(e) =>
										set(
											"appsCount",
											Math.min(
												MAX_APPS,
												Math.max(1, Number(e.target.value) || 1),
											),
										)
									}
									className={fieldClass}
								/>
							</label>
							<Select
								label="Fréquentation"
								value={input.traffic}
								options={pick(TRAFFICS, TRAFFIC_LABELS)}
								onChange={(v) => set("traffic", v)}
							/>
						</div>
						<div className="grid gap-6 sm:grid-cols-2">
							<Select
								label="Base de données"
								value={input.database}
								options={pick(DATABASES, DATABASE_LABELS)}
								onChange={(v) => set("database", v)}
							/>
							{input.database !== "none" && (
								<Select
									label="Taille de la base"
									value={input.dbSize}
									options={pick(DB_SIZES, DB_SIZE_LABELS)}
									onChange={(v) => set("dbSize", v)}
								/>
							)}
						</div>

						<fieldset className="grid gap-3">
							<legend className={cn(labelClass, "mb-1")}>
								Composants associés
							</legend>
							{EXTRAS.map((extra) => (
								<label
									key={extra}
									className="flex items-center gap-3 text-[0.95rem]"
								>
									<input
										type="checkbox"
										checked={input.extras.includes(extra)}
										onChange={() => toggleExtra(extra)}
										className="size-4 accent-[var(--color-signal)]"
									/>
									{EXTRA_LABELS[extra]}
								</label>
							))}
						</fieldset>

						<label className="flex flex-col gap-1.5">
							<span className={labelClass}>
								Fichiers envoyés par les utilisateurs (Go)
							</span>
							<input
								type="number"
								min={0}
								max={MAX_FILES_GB}
								value={input.filesGb}
								onChange={(e) =>
									set(
										"filesGb",
										Math.min(
											MAX_FILES_GB,
											Math.max(0, Number(e.target.value) || 0),
										),
									)
								}
								className={fieldClass}
							/>
						</label>

						<fieldset className="grid gap-3">
							<legend className={cn(labelClass, "mb-1")}>Exigences</legend>
							<label className="flex items-center gap-3 text-[0.95rem]">
								<input
									type="checkbox"
									checked={input.preprod}
									onChange={(e) => set("preprod", e.target.checked)}
									className="size-4 accent-[var(--color-signal)]"
								/>
								Environnement de préproduction
							</label>
							<label className="flex items-center gap-3 text-[0.95rem]">
								<input
									type="checkbox"
									checked={input.availability === "critique"}
									onChange={(e) =>
										set(
											"availability",
											e.target.checked ? "critique" : "standard",
										)
									}
									className="size-4 accent-[var(--color-signal)]"
								/>
								Activité critique (aucune interruption tolérée)
							</label>
						</fieldset>
					</div>
				)}
			</form>

			<aside
				aria-live="polite"
				className="relative h-fit overflow-hidden rounded-2xl bg-night p-6 text-night-ink shadow-[var(--shadow-card)] sm:p-8 lg:sticky lg:top-24"
			>
				{flash > 0 && (
					<span
						key={flash}
						aria-hidden="true"
						className="estimator-flash pointer-events-none absolute inset-0 rounded-2xl"
					/>
				)}
				{result.custom ? (
					<div className="rise-in">
						<p className="eyebrow !text-signal-glow">Dimensionnement</p>
						<p className="mt-2 text-[clamp(2rem,1.5rem+1.8vw,2.8rem)] leading-none font-bold">
							Sur mesure
						</p>
						<p className="mt-4 text-[0.95rem] text-night-soft">
							Votre application demande une analyse dédiée : fonctionnement,
							dépendances, volumétrie, exigences de disponibilité.
						</p>
						<ul className="mt-5 grid gap-2 text-[0.9rem] text-night-soft">
							{result.notes.map((n) => (
								<li key={n} className="flex gap-2">
									<span aria-hidden="true" className="text-signal-glow">
										→
									</span>
									{n}
								</li>
							))}
						</ul>
					</div>
				) : (
					<div>
						<p className="eyebrow !text-signal-glow">Estimation indicative</p>
						<p
							key={result.profile}
							className="rise-in mt-2 text-[1.35rem] font-semibold"
						>
							Profil {result.profile.toLowerCase()}
							{result.servers > 1 && ` · ${result.servers} serveurs`}
						</p>

						<div className="mt-6 grid grid-cols-3 gap-4 border-b border-night-line pb-6">
							<Metric value={result.vcpu} unit="vCPU" />
							<Metric value={result.ramGb} unit="Go de RAM" />
							<Metric value={result.diskGb} unit="Go de disque" />
						</div>

						<h3 className="mt-6 text-[0.95rem] font-semibold">
							Répartition de la mémoire
						</h3>
						<ul className="mt-3 grid gap-3">
							{result.breakdown.map((b) => (
								<li key={b.label} className="rise-in">
									<div className="flex justify-between text-[0.88rem] text-night-soft">
										<span>{b.label}</span>
										<span className="tabular">{b.ramMb} Mo</span>
									</div>
									<div className="mt-1 h-1.5 rounded-full bg-night-line">
										<div
											className="h-full rounded-full bg-signal transition-[width] duration-500 ease-out"
											style={{
												width: `${Math.max(4, (b.ramMb / maxRam) * 100)}%`,
											}}
										/>
									</div>
								</li>
							))}
						</ul>

						{result.notes.length > 0 && (
							<ul className="mt-6 grid gap-2 text-[0.9rem] text-night-soft">
								{result.notes.map((n) => (
									<li key={n} className="flex gap-2">
										<span aria-hidden="true" className="text-signal-glow">
											→
										</span>
										{n}
									</li>
								))}
							</ul>
						)}

						<p className="mt-6 text-[0.92rem] text-night-soft">
							Formule adaptée :{" "}
							<strong className="text-night-ink">{offer?.name}</strong>
							{offer && !offer.quote && ` (${offer.prefix} ${offer.price})`}.
						</p>
					</div>
				)}

				<Link
					to="/contact"
					search={{
						offre: result.offer,
						estimation: formatEstimate(input, result),
					}}
					data-umami-event="estimator-cta"
					data-umami-event-offer={result.offer}
					className={cn(buttonClass("light"), "mt-6 w-full")}
				>
					{result.verdict === "contact"
						? "Parler à un expert"
						: "Faire valider cette estimation"}{" "}
					<span aria-hidden="true">→</span>
				</Link>
				{!result.custom && (
					<p className="mt-4 text-[12.5px] leading-relaxed text-night-soft">
						Ordre de grandeur calculé à partir de profils types, hors pics
						exceptionnels. La taille définitive se confirme en mesurant votre
						application réelle.
					</p>
				)}
			</aside>
		</div>
	);
}
