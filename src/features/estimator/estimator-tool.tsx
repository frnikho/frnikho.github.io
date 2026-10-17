import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Glyph } from "@/components/services/glyph";
import { buttonClass } from "@/components/site/button";
import { useToast } from "@/components/ui/toast";
import { offers } from "@/content/offers";
import { type EstimatorState, PRESETS } from "@/features/estimator/catalog";
import {
	estimateStack,
	formatEstimate,
	growthCurve,
} from "@/features/estimator/estimate";
import { GrowthPanel } from "@/features/estimator/growth-panel";
import { PrintRecap } from "@/features/estimator/print-recap";
import { ResultPanel } from "@/features/estimator/result-panel";
import {
	type EstimatorSearch,
	encodeState,
	toQueryString,
} from "@/features/estimator/share";
import { StackEditor } from "@/features/estimator/stack-editor";
import { Topology } from "@/features/estimator/topology";
import { WorkloadPanel } from "@/features/estimator/workload-panel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { SITE_URL } from "@/lib/seo";

/** Délai avant d'inscrire l'état dans l'URL : pas une navigation par cran de curseur. */
const URL_SYNC_DELAY_MS = 350;

/** Un seul événement « estimateur utilisé » par visite. */
let usedReported = false;
function trackOnce(name: string) {
	if (usedReported) return;
	usedReported = true;
	trackEvent(name);
}

const sameState = (a: EstimatorState, b: EstimatorState) =>
	JSON.stringify(a) === JSON.stringify(b);

function Presets({
	state,
	onPick,
}: {
	state: EstimatorState;
	onPick: (s: EstimatorState) => void;
}) {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<span className="mr-1 text-[0.9rem] font-semibold text-ink-soft">
				Partir d'un modèle :
			</span>
			{PRESETS.map((p) => {
				const active = sameState(
					{ ...p.state, workload: { ...p.state.workload, growth: 1 } },
					{ ...state, workload: { ...state.workload, growth: 1 } },
				);
				return (
					<button
						key={p.id}
						type="button"
						aria-pressed={active}
						onClick={() => onPick(p.state)}
						className={cn(
							"inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.88rem] font-semibold transition-colors",
							active
								? "border-signal bg-signal text-white"
								: "border-line bg-card hover:border-signal/50 hover:text-signal-deep",
						)}
					>
						<Glyph
							name={p.icon}
							className={cn("size-4", active ? "text-white" : "text-signal")}
						/>
						{p.label}
					</button>
				);
			})}
		</div>
	);
}

export function EstimatorTool({
	initial,
	onPersist,
}: {
	initial: EstimatorState;
	/** Inscrit l'état dans l'URL (lien partageable). */
	onPersist: (search: EstimatorSearch) => void;
}) {
	const [state, setState] = useState(initial);
	const { success, error } = useToast();
	const result = useMemo(() => estimateStack(state), [state]);
	const curve = useMemo(() => growthCurve(state), [state]);
	const query = toQueryString(encodeState(state));
	const link = `${SITE_URL}/estimation?${query}`;
	const offer = offers.find((o) => o.id === result.offer);

	const persist = useRef(onPersist);
	persist.current = onPersist;

	// Éclat bref du panneau et synchronisation de l'URL, pas au premier rendu.
	const [flash, setFlash] = useState(0);
	const first = useRef(true);
	useEffect(() => {
		if (first.current) {
			first.current = false;
			return;
		}
		setFlash((n) => n + 1);
		trackOnce("estimator-used");
		const timer = window.setTimeout(
			() => persist.current(encodeState(state)),
			URL_SYNC_DELAY_MS,
		);
		return () => window.clearTimeout(timer);
	}, [state]);

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(link);
			trackEvent("estimator-share");
			success("Lien copié", "Il rouvre cette estimation à l'identique.");
		} catch {
			error("Copie impossible", "Copiez l'adresse de la page à la place.");
		}
	};
	const print = () => {
		trackEvent("estimator-print");
		window.print();
	};

	const cta = (
		<Link
			to="/contact"
			search={{
				offre: result.offer,
				estimation: formatEstimate(state, result),
			}}
			data-umami-event="estimator-cta"
			data-umami-event-offer={result.offer}
			className={cn(buttonClass("light"), "w-full")}
		>
			{result.verdict === "contact"
				? "Parler à un expert"
				: "Faire valider cette estimation"}{" "}
			<span aria-hidden="true">→</span>
		</Link>
	);

	return (
		<>
			<div className="grid gap-10 print:hidden">
				<Presets state={state} onPick={setState} />

				<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
					<form
						className="surface grid content-start gap-10 p-5 sm:p-8"
						onSubmit={(e) => e.preventDefault()}
						aria-label="Paramètres de l'application"
					>
						<StackEditor
							stack={state.stack}
							loads={result.components}
							onChange={(stack) => setState((s) => ({ ...s, stack }))}
						/>
						<WorkloadPanel
							workload={state.workload}
							onChange={(workload) => setState((s) => ({ ...s, workload }))}
						/>
					</form>

					<aside
						aria-live="polite"
						aria-label="Résultat de l'estimation"
						className="relative h-fit overflow-hidden rounded-2xl bg-night p-6 text-night-ink shadow-[var(--shadow-card)] sm:p-8 lg:sticky lg:top-24"
					>
						{flash > 0 && (
							<span
								key={flash}
								aria-hidden="true"
								className="estimator-flash pointer-events-none absolute inset-0 rounded-2xl"
							/>
						)}
						<ResultPanel
							estimate={result}
							offerLabel={
								offer &&
								`${offer.name}${offer.quote ? "" : ` (${offer.prefix} ${offer.price})`}`
							}
							onCopyLink={copyLink}
							onPrint={print}
							cta={cta}
						/>
					</aside>
				</div>

				<div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
					<section
						aria-labelledby="topology-title"
						className="surface p-5 sm:p-8"
					>
						<p className="eyebrow">Architecture</p>
						<h3 id="topology-title" className="mt-2 text-[1.3rem] font-bold">
							À quoi ressemblera votre infrastructure
						</h3>
						<div className="mt-6">
							<Topology estimate={result} stack={state.stack} />
						</div>
					</section>
					<section
						aria-labelledby="growth-title"
						className="surface p-5 sm:p-8"
					>
						<p className="eyebrow">Simulateur de croissance</p>
						<h3 id="growth-title" className="mt-2 text-[1.3rem] font-bold">
							Et si votre trafic était multiplié ?
						</h3>
						<div className="mt-6">
							<GrowthPanel
								curve={curve}
								growth={state.workload.growth}
								onGrowthChange={(growth) =>
									setState((s) => ({
										...s,
										workload: { ...s.workload, growth },
									}))
								}
							/>
						</div>
					</section>
				</div>
			</div>
			<PrintRecap state={state} estimate={result} curve={curve} link={link} />
		</>
	);
}
