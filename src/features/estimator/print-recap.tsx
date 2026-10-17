import { type EstimatorState, KINDS } from "@/features/estimator/catalog";
import {
	type Estimate,
	formatGrowth,
	formatVisits,
	type GrowthPoint,
	upgradePoints,
} from "@/features/estimator/estimate";
import { formatMb } from "@/features/estimator/viz";
import { SITE_URL } from "@/lib/seo";

/**
 * Récapitulatif imprimable (« Exporter en PDF » ouvre l'impression du
 * navigateur). Invisible à l'écran ; à l'impression, seul ce bloc est rendu.
 */
export function PrintRecap({
	state,
	estimate: e,
	curve,
	link,
}: {
	state: EstimatorState;
	estimate: Estimate;
	curve: GrowthPoint[];
	link: string;
}) {
	const w = state.workload;
	const upgrades = upgradePoints(curve);
	const date = new Date().toLocaleDateString("fr-FR", { dateStyle: "long" });
	const cell = "border-b border-line py-1.5 pr-3 text-left";

	return (
		<section className="print-recap hidden text-[11pt] leading-snug text-ink print:block">
			<div className="flex items-end justify-between border-b-2 border-ink pb-3">
				<div>
					<p className="text-[9pt] text-ink-soft">
						Estimation de ressources · {date}
					</p>
					<h2 className="mt-1 text-[18pt] font-bold">
						{e.topology === "cluster"
							? "Au-delà d'un serveur"
							: `${e.vcpu} vCPU · ${e.ramGb} Go de RAM · ${e.diskGb} Go de disque${e.servers > 1 ? " · ×2 serveurs" : ""}`}
					</h2>
				</div>
				<p className="text-right text-[9pt] text-ink-soft">
					Nicolas Sans, DevOps
					<br />
					{SITE_URL.replace("https://", "")}
				</p>
			</div>

			<h3 className="mt-5 font-bold">Stack</h3>
			<table className="mt-1 w-full border-collapse">
				<thead>
					<tr className="text-ink-soft">
						<th className={cell}>Composant</th>
						<th className={cell}>Instances</th>
						<th className={cell}>Données</th>
						<th className={cell}>Mémoire</th>
						<th className={cell}>vCPU</th>
					</tr>
				</thead>
				<tbody>
					{state.stack.map((c, i) => {
						const k = KINDS[c.kind];
						const load = e.components[i];
						return (
							<tr key={i}>
								<td className={cell}>{k.label}</td>
								<td className={cell}>{k.scalable ? c.replicas : 1}</td>
								<td className={cell}>{k.hasData ? `${c.dataGb} Go` : "—"}</td>
								<td className={cell}>{formatMb(load?.ramMb ?? 0)}</td>
								<td className={cell}>{load?.cpu.toLocaleString("fr-FR")}</td>
							</tr>
						);
					})}
					<tr>
						<td className={cell}>Plateforme et système</td>
						<td className={cell}>—</td>
						<td className={cell}>—</td>
						<td className={cell}>{formatMb(e.platform.ramMb)}</td>
						<td className={cell}>{e.platform.cpu.toLocaleString("fr-FR")}</td>
					</tr>
				</tbody>
			</table>

			<h3 className="mt-5 font-bold">Charge</h3>
			<p className="mt-1">
				{formatVisits(w.monthlyVisits)} visites par mois, {w.filesGb} Go de
				fichiers utilisateurs
				{w.preprod && ", préproduction incluse"}
				{w.critical && ", activité critique (deux serveurs)"}.
			</p>

			<h3 className="mt-5 font-bold">Croissance</h3>
			{upgrades.length === 0 ? (
				<p className="mt-1">Aucun changement de serveur jusqu'à ×20.</p>
			) : (
				<ul className="mt-1 list-disc pl-5">
					{upgrades.map((u) => (
						<li key={u.growth}>
							{formatGrowth(u.growth)} ({formatVisits(u.visits)} visites par
							mois) :{" "}
							{u.topology === "cluster"
								? "au-delà d'un serveur"
								: `${u.vcpu} vCPU, ${u.ramGb} Go de RAM`}
						</li>
					))}
				</ul>
			)}

			{e.notes.length > 0 && (
				<>
					<h3 className="mt-5 font-bold">Points d'attention</h3>
					<ul className="mt-1 list-disc pl-5">
						{e.notes.map((n) => (
							<li key={n}>{n}</li>
						))}
					</ul>
				</>
			)}

			<p className="mt-6 border-t border-line pt-3 text-[9pt] text-ink-soft">
				Ordre de grandeur calculé à partir de profils types, marge de 30 %
				comprise ; à confirmer par la mesure sur l'application réelle. Retrouver
				et modifier cette estimation : {link}
			</p>
		</section>
	);
}
