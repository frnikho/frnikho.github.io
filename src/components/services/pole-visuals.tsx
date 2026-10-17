import type { ReactNode } from "react";
import type { IconName } from "@/components/diagrams/types";
import { Glyph } from "@/components/services/glyph";
import type { PoleId } from "@/content/service-poles";
import { cn } from "@/lib/cn";

/*
 * Illustrations de la page Services : des captures d'interface stylisées,
 * superposées sur un fond pastel. Purement décoratives (le texte du pôle
 * porte l'information), donc masquées aux lecteurs d'écran.
 */

const panelTint: Record<PoleId, string> = {
	lancer: "bg-pastel-blue",
	automatiser: "bg-highlight-soft",
	proteger: "bg-pastel-green",
	durer: "bg-pastel-lilac",
};

function Card({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"rounded-xl border border-line bg-card p-4 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.45)]",
				className,
			)}
		>
			{children}
		</div>
	);
}

function CardTitle({
	icon,
	children,
}: {
	icon: IconName;
	children: ReactNode;
}) {
	return (
		<p className="flex items-center gap-2 text-[13px] font-semibold">
			<span className="grid size-7 place-items-center rounded-lg bg-signal-soft text-signal">
				<Glyph name={icon} className="size-4" />
			</span>
			{children}
		</p>
	);
}

function StatusRow({ label, value }: { label: string; value: string }) {
	return (
		<li className="flex items-center justify-between gap-4 py-1.5 text-[13px]">
			<span className="flex items-center gap-2 text-ink-soft">
				<span className="size-2 rounded-full bg-ok" />
				{label}
			</span>
			<span className="font-medium text-ok">{value}</span>
		</li>
	);
}

function Check({ children }: { children: ReactNode }) {
	return (
		<li className="flex items-center gap-2 text-[13px]">
			<Glyph name="check" className="size-4 text-ok" />
			{children}
		</li>
	);
}

function LaunchVisual() {
	return (
		<>
			<Card className="p-0">
				<div className="flex items-center gap-3 border-b border-line px-4 py-3">
					<span className="flex gap-1.5">
						<span className="size-2.5 rounded-full bg-line" />
						<span className="size-2.5 rounded-full bg-line" />
						<span className="size-2.5 rounded-full bg-line" />
					</span>
					<span className="flex flex-1 items-center gap-1.5 rounded-md bg-paper-2 px-3 py-1 text-[12px] text-ink-soft">
						<Glyph name="lock" className="size-3.5 text-ok" />
						https://votre-app.fr
					</span>
				</div>
				<div className="grid gap-3 p-5">
					<div className="h-3 w-2/5 rounded bg-ink/80" />
					<div className="h-2.5 w-4/5 rounded bg-line" />
					<div className="h-2.5 w-3/5 rounded bg-line" />
					<div className="mt-2 grid grid-cols-3 gap-3">
						<div className="h-14 rounded-lg bg-signal-soft" />
						<div className="h-14 rounded-lg bg-paper-2" />
						<div className="h-14 rounded-lg bg-paper-2" />
					</div>
				</div>
			</Card>
			<div className="mt-4 grid gap-4 sm:grid-cols-[1.15fr_1fr] lg:-mt-10 lg:ml-8">
				<Card>
					<CardTitle icon="server">Serveur en production</CardTitle>
					<ul className="mt-2 divide-y divide-line">
						<StatusRow label="Certificat HTTPS" value="renouvelé" />
						<StatusRow label="Sauvegarde nocturne" value="OK" />
						<StatusRow label="Disponibilité" value="surveillée" />
					</ul>
				</Card>
				<Card className="lg:mt-10">
					<CardTitle icon="globe">Facture mensuelle</CardTitle>
					<div className="mt-4 grid gap-2.5 text-[12px] text-ink-soft">
						<div>
							<p>Cloud managé</p>
							<div className="mt-1 h-2.5 w-full rounded-full bg-ink/15" />
						</div>
						<div>
							<p>Serveur européen</p>
							<div className="mt-1 h-2.5 w-2/5 rounded-full bg-signal" />
						</div>
					</div>
				</Card>
			</div>
		</>
	);
}

const PIPELINE: { label: string; icon: IconName }[] = [
	{ label: "Commit", icon: "git" },
	{ label: "Tests", icon: "check" },
	{ label: "Build", icon: "box" },
	{ label: "Déploiement", icon: "zap" },
];

/** Pods par nœud : `1` en service, `0` emplacement libre. */
const NODES = [
	[1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 0],
	[1, 0, 1, 1, 0, 1],
];

function AutomateVisual() {
	return (
		<>
			<Card>
				<div className="flex items-center justify-between gap-3">
					<CardTitle icon="pr">Pipeline · pull request #42</CardTitle>
					<span className="rounded-full bg-ok/10 px-2.5 py-0.5 text-[12px] font-medium text-ok">
						réussi
					</span>
				</div>
				<ol className="relative mt-6 grid grid-cols-4">
					<svg
						aria-hidden="true"
						className="absolute top-[18px] right-[12.5%] left-[12.5%] h-1 w-3/4 overflow-visible"
						preserveAspectRatio="none"
						viewBox="0 0 100 2"
					>
						<line
							x1="0"
							y1="1"
							x2="100"
							y2="1"
							strokeWidth={2}
							vectorEffect="non-scaling-stroke"
							className="flow-line stroke-signal"
						/>
					</svg>
					{PIPELINE.map((s) => (
						<li
							key={s.label}
							className="relative flex flex-col items-center gap-2 text-center"
						>
							<span className="grid size-9 place-items-center rounded-full bg-signal text-white ring-4 ring-card">
								<Glyph name={s.icon} className="size-4" />
							</span>
							<span className="text-[12px] font-medium">{s.label}</span>
						</li>
					))}
				</ol>
				<p className="mt-5 flex items-center gap-2 rounded-lg bg-paper-2 px-3 py-2 text-[12px] text-ink-soft">
					<Glyph name="eye" className="size-4 text-signal" />
					Aperçu prêt : pr-42.preview.votre-app.fr
				</p>
			</Card>
			<Card className="mt-4 lg:-mt-4 lg:mr-10 lg:ml-12">
				<div className="flex items-center justify-between gap-3">
					<CardTitle icon="network">Cluster Kubernetes</CardTitle>
					<span className="flex items-center gap-1.5 text-[12px] text-ok">
						<Glyph name="sync" className="size-3.5" />
						synchronisé
					</span>
				</div>
				<div className="mt-4 grid grid-cols-3 gap-3">
					{NODES.map((pods, n) => (
						<div
							key={n}
							className="rounded-lg border border-line bg-paper-2 p-2.5"
						>
							<p className="text-[11px] text-ink-soft">node-{n + 1}</p>
							<div className="mt-2 grid grid-cols-3 gap-1.5">
								{pods.map((on, i) => (
									<span
										key={i}
										className={cn(
											"aspect-square rounded",
											on ? "bg-signal/80" : "border border-dashed border-line",
										)}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</Card>
		</>
	);
}

/** Disponibilité sur 30 jours : `false` marque une alerte traitée. */
const UPTIME = Array.from({ length: 30 }, (_, i) => i !== 19);

function ProtectVisual() {
	return (
		<>
			<Card>
				<div className="flex items-center justify-between gap-3">
					<CardTitle icon="activity">Disponibilité · 30 jours</CardTitle>
					<span className="flex items-center gap-1.5 text-[12px] text-ink-soft">
						<Glyph name="bell" className="size-3.5 text-signal" />
						alertes actives
					</span>
				</div>
				<div className="mt-5 flex h-12 items-end gap-[3px]">
					{UPTIME.map((ok, i) => (
						<span
							key={i}
							className={cn(
								"flex-1 rounded-sm",
								ok ? "h-full bg-ok/75" : "h-3/5 bg-highlight-deep",
							)}
						/>
					))}
				</div>
				<p className="mt-3 text-[12px] text-ink-soft">
					Une alerte reçue, incident résolu avant les utilisateurs.
				</p>
			</Card>
			<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:-mt-4 lg:ml-8">
				<Card>
					<CardTitle icon="shield">Audit sécurité</CardTitle>
					<ul className="mt-3 grid gap-2">
						<Check>SSH par clé uniquement</Check>
						<Check>Pare-feu, ports vérifiés</Check>
						<Check>SPF, DKIM, DMARC</Check>
						<Check>Aucun secret dans le dépôt</Check>
					</ul>
				</Card>
				<Card className="lg:mt-8">
					<CardTitle icon="archive">Sauvegardes</CardTitle>
					<ul className="mt-2 divide-y divide-line">
						<StatusRow label="Chiffrées, hors serveur" value="UE" />
						<StatusRow label="Restauration testée" value="OK" />
					</ul>
				</Card>
			</div>
		</>
	);
}

const TOOLS = [
	{ name: "Nextcloud", tint: "bg-signal-soft text-signal-deep" },
	{ name: "Vaultwarden", tint: "bg-pastel-yellow text-ink" },
	{ name: "Forgejo", tint: "bg-pastel-green text-ok" },
	{ name: "Umami", tint: "bg-pastel-lilac text-ink" },
];

function LastVisual() {
	return (
		<>
			<Card>
				<div className="flex items-center justify-between gap-3">
					<CardTitle icon="file">Rapport mensuel</CardTitle>
					<span className="text-[12px] text-ink-soft">envoyé le 1er</span>
				</div>
				<ul className="mt-2 divide-y divide-line">
					<StatusRow label="Mises à jour appliquées" value="à jour" />
					<StatusRow label="Sauvegardes vérifiées" value="OK" />
					<StatusRow label="Incidents traités" value="clos" />
				</ul>
			</Card>
			<div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.1fr] lg:-mt-4 lg:mr-6 lg:ml-10">
				<Card>
					<CardTitle icon="box">Outils auto-hébergés</CardTitle>
					<ul className="mt-3 grid grid-cols-2 gap-2">
						{TOOLS.map((t) => (
							<li
								key={t.name}
								className={cn(
									"rounded-lg px-2.5 py-2 text-[12px] font-semibold",
									t.tint,
								)}
							>
								{t.name}
							</li>
						))}
					</ul>
				</Card>
				<Card className="lg:mt-8">
					<CardTitle icon="users">Passation à l'équipe</CardTitle>
					<ul className="mt-3 grid gap-2">
						<Check>runbook-reprise.md</Check>
						<Check>Schéma d'architecture</Check>
						<Check>Session sur vos projets</Check>
					</ul>
				</Card>
			</div>
		</>
	);
}

const visuals: Record<PoleId, () => ReactNode> = {
	lancer: LaunchVisual,
	automatiser: AutomateVisual,
	proteger: ProtectVisual,
	durer: LastVisual,
};

export function PoleVisual({ pole }: { pole: PoleId }) {
	const Visual = visuals[pole];
	return (
		<div
			aria-hidden="true"
			className={cn(
				"relative overflow-clip rounded-3xl p-5 sm:p-8",
				panelTint[pole],
			)}
		>
			<div className="decor-float absolute -top-6 -right-6 size-24 rotate-[14deg] rounded-[1.4rem] bg-white/50" />
			<div className="absolute -bottom-10 -left-10 size-36 rounded-full bg-white/40" />
			<div className="relative">
				<Visual />
			</div>
		</div>
	);
}
