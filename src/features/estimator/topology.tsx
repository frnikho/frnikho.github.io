import type { IconName } from "@/components/diagrams/types";
import { Glyph } from "@/components/services/glyph";
import { KINDS, type StackComponent } from "@/features/estimator/catalog";
import type { Estimate } from "@/features/estimator/estimate";
import { SEGMENT_COLORS } from "@/features/estimator/viz";
import { cn } from "@/lib/cn";

function Pill({ icon, label }: { icon: IconName; label: string }) {
	return (
		<span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[0.85rem] font-semibold shadow-[var(--shadow-card)]">
			<Glyph name={icon} className="size-4 text-signal" />
			{label}
		</span>
	);
}

/** Lien vertical animé entre deux étages du schéma. */
function Link({ label }: { label?: string }) {
	return (
		<div aria-hidden="true" className="flex flex-col items-center">
			<svg
				aria-hidden="true"
				viewBox="0 0 2 40"
				className="h-8 w-0.5 overflow-visible"
			>
				<line
					x1="1"
					y1="0"
					x2="1"
					y2="40"
					strokeWidth={2}
					className="flow-line stroke-signal"
				/>
			</svg>
			{label && <span className="text-[11px] text-ink-soft">{label}</span>}
		</div>
	);
}

function ServerBox({
	title,
	spec,
	stack,
	standby,
}: {
	title: string;
	spec: string;
	stack: StackComponent[];
	standby?: boolean;
}) {
	return (
		<div
			className={cn(
				"min-w-0 flex-1 rounded-2xl border-2 bg-card p-4",
				standby ? "border-dashed border-line" : "border-signal/60",
			)}
		>
			<div className="flex items-center gap-2.5">
				<span className="grid size-8 place-items-center rounded-lg bg-signal-soft text-signal">
					<Glyph name="server" className="size-4" />
				</span>
				<div className="min-w-0">
					<p className="text-[0.9rem] leading-tight font-semibold">{title}</p>
					<p className="tabular text-[12px] text-ink-soft">{spec}</p>
				</div>
				<span
					aria-hidden="true"
					className="ml-auto size-2 rounded-full bg-ok shadow-[0_0_0_3px_rgba(15,122,84,0.15)]"
				/>
			</div>
			<ul className="mt-3 flex flex-wrap gap-1.5">
				<li className="rounded-md bg-paper-2 px-2 py-1 text-[11.5px] font-medium text-ink-soft">
					Proxy · HTTPS
				</li>
				{stack.map((c, i) => {
					const k = KINDS[c.kind];
					return (
						<li
							key={i}
							className="inline-flex items-center gap-1.5 rounded-md bg-paper-2 px-2 py-1 text-[11.5px] font-medium"
						>
							<span
								aria-hidden="true"
								className="size-2 rounded-full"
								style={{ backgroundColor: SEGMENT_COLORS[k.category] }}
							/>
							{k.label}
							{k.scalable && c.replicas > 1 && (
								<span className="text-ink-soft">×{c.replicas}</span>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

/** Architecture correspondant à l'estimation : 1 serveur, 2 serveurs ou cluster. */
export function Topology({
	estimate: e,
	stack,
}: {
	estimate: Estimate;
	stack: StackComponent[];
}) {
	const spec = `${e.vcpu} vCPU · ${e.ramGb} Go · ${e.diskGb} Go`;
	return (
		<figure className="flex flex-col items-center">
			<figcaption className="sr-only">
				{e.topology === "cluster"
					? "Schéma : un cluster de plusieurs nœuds, à dimensionner ensemble."
					: e.topology === "ha"
						? "Schéma : un répartiteur de charge envoie le trafic vers deux serveurs identiques, la base de données est répliquée."
						: "Schéma : le trafic arrive sur un serveur unique qui héberge toute la stack."}
			</figcaption>
			<Pill icon="users" label="Vos utilisateurs" />
			<Link label="HTTPS" />
			{e.topology !== "single" && (
				<>
					<Pill icon="network" label="Répartiteur de charge" />
					<Link />
				</>
			)}
			{e.topology === "cluster" ? (
				<div className="w-full rounded-2xl border-2 border-dashed border-signal/60 bg-signal-soft/40 p-4">
					<p className="text-center text-[0.9rem] font-semibold">
						Cluster de plusieurs nœuds
					</p>
					<div className="mt-3 grid grid-cols-3 gap-2">
						{["nœud 1", "nœud 2", "nœud 3"].map((n) => (
							<div
								key={n}
								className="rounded-xl border border-line bg-card p-2.5 text-center"
							>
								<Glyph name="server" className="mx-auto size-4 text-signal" />
								<p className="mt-1 text-[11.5px] text-ink-soft">{n}</p>
							</div>
						))}
					</div>
					<p className="mt-3 text-center text-[12px] text-ink-soft">
						Kubernetes ou plusieurs serveurs dédiés, à dimensionner ensemble.
					</p>
				</div>
			) : (
				<div className="flex w-full flex-col gap-3 sm:flex-row">
					<ServerBox
						title={e.topology === "ha" ? "Serveur A" : "Votre serveur"}
						spec={spec}
						stack={stack}
					/>
					{e.topology === "ha" && (
						<ServerBox title="Serveur B" spec={spec} stack={stack} standby />
					)}
				</div>
			)}
			{e.topology === "ha" && (
				<p className="mt-2 flex items-center gap-1.5 text-[12px] text-ink-soft">
					<Glyph name="sync" className="size-3.5 text-signal" />
					Base de données répliquée entre A et B
				</p>
			)}
			<Link />
			<Pill icon="archive" label="Sauvegardes chiffrées hors serveur" />
		</figure>
	);
}
