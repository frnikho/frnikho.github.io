import { Link } from "@tanstack/react-router";
import { buttonClass, ExternalButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { type Offer, offers, offersNote } from "@/content/offers";
import { cn } from "@/lib/cn";
import { BOOKING_URL } from "@/lib/site";

function OfferCard({ offer: o }: { offer: Offer }) {
	const dark = o.quote;
	return (
		<article
			className={cn(
				"flex flex-col rounded-2xl border p-7 shadow-[var(--shadow-card)]",
				dark
					? "border-night-line bg-night text-night-ink"
					: "border-line bg-card",
				o.highlighted &&
					"border-signal ring-2 ring-signal/20 xl:-my-3 xl:py-10",
			)}
		>
			<p className={cn("eyebrow", dark && "!text-signal-glow")}>
				{o.name}
				{o.highlighted && " · le plus choisi"}
			</p>
			<p
				className={cn(
					"mt-1 min-h-[2.6em] text-[13px] leading-snug",
					dark ? "text-night-soft" : "text-ink-soft",
				)}
			>
				{o.audience}
			</p>
			<div className="mt-4 min-h-[5.2rem]">
				{o.prefix && (
					<p
						className={cn(
							"text-[13px]",
							dark ? "text-night-soft" : "text-ink-soft",
						)}
					>
						{o.prefix}
					</p>
				)}
				<p
					className={cn(
						"leading-none font-semibold",
						o.prefix ? "mt-1" : "mt-[1.55rem]",
						"text-[2.6rem]",
					)}
				>
					{o.price}
				</p>
				<p
					className={cn(
						"mt-2 text-[13px]",
						dark ? "text-night-soft" : "text-ink-soft",
					)}
				>
					{o.priceNote}
				</p>
			</div>
			<p className="mt-6 text-[1.02rem] leading-snug font-semibold">
				{o.tagline}
			</p>
			<ul className="mt-6 grid flex-1 content-start gap-3 text-[0.95rem]">
				{o.features.map((f) => (
					<li key={f} className="flex gap-3">
						<span
							aria-hidden="true"
							className={cn(
								"mt-[0.35em] size-1.5 shrink-0",
								dark || o.highlighted ? "bg-signal-glow" : "bg-signal",
							)}
						/>
						<span className={dark ? "text-night-soft" : "text-ink-soft"}>
							{f}
						</span>
					</li>
				))}
			</ul>
			{o.footnote && (
				<p className="mt-6 text-[13px] leading-relaxed text-ink-soft">
					{o.footnote}
				</p>
			)}
			<div className="mt-8">
				{o.quote ? (
					<ExternalButton
						href={BOOKING_URL}
						where="offers"
						variant="light"
						className="w-full"
					>
						{o.cta}
					</ExternalButton>
				) : (
					<Link
						to="/contact"
						search={{ offre: o.id }}
						data-umami-event="offer-select"
						data-umami-event-offer={o.id}
						className={cn(
							buttonClass(o.highlighted ? "primary" : "ghost"),
							"w-full",
						)}
					>
						{o.cta} <span aria-hidden="true">→</span>
					</Link>
				)}
			</div>
		</article>
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
						Des tarifs de départ affichés,{" "}
						<Accent>un devis pour le reste.</Accent>
					</>
				}
				intro="Trois formules au tarif de départ pour les indépendants et les TPE/PME. Pour une infrastructure plus large, un échange de 30 minutes suffit à cadrer un devis ferme."
			/>

			<div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
				{offers.map((o) => (
					<OfferCard key={o.id} offer={o} />
				))}
			</div>
			<div className="mt-10 flex flex-col gap-4 rounded-2xl bg-signal-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
				<div>
					<p className="text-[1.15rem] font-semibold">
						Pas sûr du serveur à prendre ?
					</p>
					<p className="mt-1 max-w-[60ch] text-ink-soft">
						Décrivez votre application : vous obtenez une estimation des vCPU,
						de la mémoire et du disque nécessaires.
					</p>
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
