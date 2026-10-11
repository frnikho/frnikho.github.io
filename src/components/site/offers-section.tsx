import { RouteButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { offers } from "@/content/offers";
import { cn } from "@/lib/cn";

export function OffersSection() {
	return (
		<Section tone="alt" id="offres" labelledBy="offres-title">
			<SectionHead
				index="05"
				kicker="Forfaits"
				titleId="offres-title"
				title={
					<>
						Des forfaits au tarif affiché, <Accent>pour démarrer.</Accent>
					</>
				}
				intro="Le socle de l'offre est proposé au tarif affiché. Les autres prestations (Kubernetes, audits, migrations, accompagnement) font l'objet d'un devis à l'issue d'un premier échange."
			/>

			<div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
				{offers.map((o) => (
					<article
						key={o.id}
						className={cn(
							"flex flex-col rounded-2xl border bg-card p-8 shadow-[var(--shadow-card)]",
							o.highlighted
								? "border-signal ring-2 ring-signal/20 lg:-my-3 lg:py-11"
								: "border-line",
						)}
					>
						<p className="eyebrow">
							{o.name}
							{o.highlighted && " · le plus choisi"}
						</p>
						<p className="mt-5 text-[3rem] leading-none font-semibold">
							{o.price}
						</p>
						<p className={cn("mt-2 text-[13px]", "text-ink-soft")}>
							{o.priceNote}
						</p>
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
											o.highlighted ? "bg-signal-glow" : "bg-signal",
										)}
									/>
									<span className={"text-ink-soft"}>{f}</span>
								</li>
							))}
						</ul>
						{o.footnote && (
							<p className="mt-6 text-[13px] leading-relaxed text-ink-soft">
								{o.footnote}
							</p>
						)}
						<div className="mt-8">
							<RouteButton
								to="/contact"
								variant={o.highlighted ? "primary" : "ghost"}
							>
								Choisir {o.name}
							</RouteButton>
						</div>
					</article>
				))}
			</div>
			<p className="mt-8 text-[13px] text-ink-soft">
				Frais d'hébergement en sus, facturés directement par l'hébergeur.
			</p>
		</Section>
	);
}
