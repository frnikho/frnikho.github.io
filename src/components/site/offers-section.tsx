import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Glyph } from "@/components/services/glyph";
import { buttonClass, ExternalButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { type Offer, type OfferId, offers, offersNote } from "@/content/offers";
import { cn } from "@/lib/cn";
import { BOOKING_URL } from "@/lib/site";

/** Emplacements d'applications dessinés sur le serveur des forfaits. */
const SERVER_SLOTS = 3;
const MONTHS = 12;
const FREE_MONTHS = 2;

const byId = (id: OfferId) => {
	const offer = offers.find((o) => o.id === id);
	if (!offer) throw new Error(`Offre inconnue : ${id}`);
	return offer;
};

/** « 1 200 € » → montant en grand, devise en exposant. */
function Price({ value, dark }: { value: string; dark?: boolean }) {
	const match = value.match(/^([\d\s]+)\s?€$/);
	if (!match) {
		return (
			<p className="text-[2.4rem] leading-none font-bold tracking-tight">
				{value}
			</p>
		);
	}
	return (
		<p className="flex items-start gap-1 leading-none font-bold tracking-tight">
			<span className="tabular text-[3.2rem]">{match[1].trim()}</span>
			<span
				className={cn(
					"mt-1.5 text-[1.4rem]",
					dark ? "text-signal-glow" : "text-signal",
				)}
			>
				€
			</span>
		</p>
	);
}

function Features({
	items,
	dark,
	className,
}: {
	items: string[];
	dark?: boolean;
	className?: string;
}) {
	return (
		<ul className={cn("grid content-start gap-2.5 text-[0.95rem]", className)}>
			{items.map((f) => (
				<li key={f} className="flex gap-2.5">
					<Glyph
						name="check"
						className={cn(
							"mt-[0.2em] size-4",
							dark ? "text-signal-glow" : "text-ok",
						)}
					/>
					<span className={dark ? "text-night-soft" : "text-ink-soft"}>
						{f}
					</span>
				</li>
			))}
		</ul>
	);
}

/** Serveur stylisé : emplacements d'applications occupés ou libres. */
function ServerSlots({ apps }: { apps: number }) {
	return (
		<div
			aria-hidden="true"
			className="rounded-xl border border-line bg-paper-2 p-3"
		>
			<p className="flex items-center gap-2 text-[12px] text-ink-soft">
				<Glyph name="server" className="size-3.5 text-signal" />
				Votre serveur
				<span className="ml-auto size-1.5 rounded-full bg-ok" />
			</p>
			<div className="mt-2.5 grid grid-cols-3 gap-2">
				{Array.from({ length: SERVER_SLOTS }, (_, i) => (
					<span
						key={`slot-${i + 1}`}
						className={cn(
							"grid h-9 place-items-center rounded-lg text-[11px] font-semibold",
							i < apps
								? "bg-signal text-white"
								: "border border-dashed border-line text-ink-soft/60",
						)}
					>
						{i < apps ? `app ${i + 1}` : "libre"}
					</span>
				))}
			</div>
		</div>
	);
}

function ContactCta({ offer, primary }: { offer: Offer; primary?: boolean }) {
	return (
		<Link
			to="/contact"
			search={{ offre: offer.id }}
			data-umami-event="offer-select"
			data-umami-event-offer={offer.id}
			className={cn(buttonClass(primary ? "primary" : "ghost"), "w-full")}
		>
			{offer.cta} <span aria-hidden="true">→</span>
		</Link>
	);
}

/** Forfait de mise en ligne, payé une fois. */
function LaunchCard({ offer: o }: { offer: Offer }) {
	return (
		<article
			className={cn(
				"relative flex flex-col rounded-2xl border bg-card p-7 shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.4)]",
				o.highlighted ? "border-signal ring-4 ring-signal/10" : "border-line",
			)}
		>
			{o.highlighted && (
				<p className="absolute -top-3.5 right-6 rounded-full bg-highlight px-3 py-1 text-[12px] font-semibold text-ink shadow-sm">
					Recommandation
				</p>
			)}
			<h3 className="text-[1.35rem] font-bold">{o.name}</h3>
			<p className="mt-1 text-[0.9rem] text-ink-soft">{o.audience}</p>
			<div className="mt-6 flex items-end justify-between gap-4">
				<div>
					<p className="text-[13px] text-ink-soft">{o.prefix}</p>
					<div className="mt-1">
						<Price value={o.price} />
					</div>
				</div>
				<p className="rounded-full bg-paper-2 px-3 py-1 text-[12px] font-medium text-ink-soft">
					{o.priceNote}
				</p>
			</div>
			<p className="mt-5 font-semibold leading-snug">{o.tagline}</p>
			{o.apps !== undefined && (
				<div className="mt-5">
					<ServerSlots apps={o.apps} />
				</div>
			)}
			{o.basis && (
				<p className="mt-6 text-[0.9rem] font-semibold text-signal-deep">
					{o.basis}
				</p>
			)}
			<Features items={o.features} className={o.basis ? "mt-3" : "mt-6"} />
			<div className="mt-auto pt-8">
				<ContactCta offer={o} primary={o.highlighted} />
			</div>
		</article>
	);
}

/** Calendrier d'engagement annuel : les derniers mois sont offerts. */
function YearStrip() {
	return (
		<div aria-hidden="true">
			<div className="grid grid-cols-12 gap-1">
				{Array.from({ length: MONTHS }, (_, i) => (
					<span
						key={`month-${i + 1}`}
						className={cn(
							"h-7 rounded-md",
							i >= MONTHS - FREE_MONTHS ? "bg-highlight" : "bg-signal/80",
						)}
					/>
				))}
			</div>
			<p className="mt-2 flex justify-between text-[12px] text-ink-soft">
				<span>12 mois de suivi</span>
				<span className="font-semibold text-ink">
					{FREE_MONTHS} mois offerts
				</span>
			</p>
		</div>
	);
}

/** Abonnement de suivi, en bandeau horizontal. */
function MaintenanceCard({ offer: o }: { offer: Offer }) {
	return (
		<article className="surface grid gap-8 p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-10">
			<div>
				<h3 className="text-[1.35rem] font-bold">{o.name}</h3>
				<p className="mt-1 text-[0.9rem] text-ink-soft">{o.audience}</p>
				<p className="mt-6 text-[13px] text-ink-soft">{o.prefix}</p>
				<div className="mt-1 flex items-end gap-2">
					<Price value={o.price} />
					<span className="pb-1 text-[0.95rem] text-ink-soft">/ mois</span>
				</div>
				<p className="mt-2 text-[13px] text-ink-soft">{o.priceNote}</p>
				<p className="mt-4 font-semibold leading-snug">{o.tagline}</p>
			</div>
			<Features
				items={o.features}
				className="lg:border-x lg:border-line lg:px-10"
			/>
			<div className="flex flex-col justify-between gap-6">
				<YearStrip />
				{o.footnote && (
					<p className="text-[13px] leading-relaxed text-ink-soft">
						{o.footnote}
					</p>
				)}
				<ContactCta offer={o} />
			</div>
		</article>
	);
}

/** Offre sur devis, sur fond sombre. */
function CustomCard({ offer: o }: { offer: Offer }) {
	return (
		<article className="relative overflow-clip rounded-2xl bg-night p-7 text-night-ink sm:p-9">
			<div
				aria-hidden="true"
				className="absolute -top-24 -right-20 size-72 rounded-full bg-signal/25"
			/>
			<div
				aria-hidden="true"
				className="decor-float absolute right-[30%] bottom-8 hidden size-12 rotate-[14deg] rounded-xl border-[3px] border-white/10 md:block"
			/>
			<div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-12">
				<div>
					<h3 className="text-[1.35rem] font-bold">{o.name}</h3>
					<p className="mt-1 text-[0.9rem] text-night-soft">{o.audience}</p>
					<div className="mt-6">
						<Price value={o.price} dark />
					</div>
					<p className="mt-2 text-[13px] text-night-soft">{o.priceNote}</p>
					<p className="mt-5 font-semibold leading-snug">{o.tagline}</p>
					<ExternalButton
						href={BOOKING_URL}
						where="offers"
						variant="light"
						className="mt-8"
					>
						{o.cta}
					</ExternalButton>
				</div>
				<Features
					items={o.features}
					dark
					className="sm:grid-cols-2 sm:gap-x-8 lg:content-center"
				/>
			</div>
		</article>
	);
}

function Step({
	n,
	title,
	note,
	children,
}: {
	n: number;
	title: string;
	note: string;
	children: ReactNode;
}) {
	return (
		<li className="group relative grid gap-5 lg:grid-cols-[3rem_1fr] lg:gap-6">
			<span
				aria-hidden="true"
				className="absolute top-12 bottom-[-2.5rem] left-6 hidden w-px bg-line group-last:hidden lg:block"
			/>
			<span className="relative hidden size-12 place-items-center rounded-full bg-ink text-[1.05rem] font-bold text-highlight lg:grid">
				{n}
			</span>
			<div>
				<p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:min-h-12 lg:items-center">
					<span className="text-[1.15rem] font-semibold">
						<span className="text-signal lg:hidden">{n}. </span>
						{title}
					</span>
					<span className="text-[0.95rem] text-ink-soft">{note}</span>
				</p>
				<div className="mt-5">{children}</div>
			</div>
		</li>
	);
}

export function OffersSection() {
	return (
		<Section id="offres" labelledBy="offres-title">
			<SectionHead
				kicker="Tarifs"
				titleId="offres-title"
				title={
					<>
						Des tarifs clairs, <Accent>définis avant de commencer.</Accent>
					</>
				}
				intro="Deux forfaits de mise en ligne, un abonnement de suivi en option. Au-delà d'un serveur, un devis ferme est établi après un échange de 30 minutes."
			/>

			<ol className="mt-14 grid gap-10">
				<Step n={1} title="Mise en ligne" note="Paiement unique.">
					<div className="grid gap-6 md:grid-cols-2 md:items-stretch">
						<LaunchCard offer={byId("essentiel")} />
						<LaunchCard offer={byId("pro")} />
					</div>
				</Step>
				<Step n={2} title="Suivi" note="Facultatif, après la mise en ligne.">
					<MaintenanceCard offer={byId("maintenance")} />
				</Step>
				<Step
					n={3}
					title="Au-delà d'un serveur"
					note="Périmètre défini ensemble."
				>
					<CustomCard offer={byId("sur-mesure")} />
				</Step>
			</ol>

			<div className="mt-12 flex flex-col gap-4 rounded-2xl bg-signal-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
				<div className="flex gap-4">
					<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-signal">
						<Glyph name="cpu" />
					</span>
					<div>
						<p className="text-[1.15rem] font-semibold">
							Pas sûr du serveur à prendre ?
						</p>
						<p className="mt-1 max-w-[60ch] text-ink-soft">
							Décrivez votre application : vous obtenez une estimation des vCPU,
							de la mémoire et du disque nécessaires.
						</p>
					</div>
				</div>
				<Link
					to="/estimation"
					data-umami-event="estimator-open"
					className={cn(buttonClass("primary"), "shrink-0")}
				>
					Estimer mes ressources <span aria-hidden="true">→</span>
				</Link>
			</div>
			<p className="mt-8 text-[13px] text-ink-soft">{offersNote}</p>
		</Section>
	);
}
