import { ExternalButton, RouteButton } from "@/components/site/button";
import { Decor } from "@/components/site/decor";
import { Accent, Container } from "@/components/site/section";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

export function FinalCta() {
	return (
		<section
			aria-labelledby="cta-title"
			className="relative overflow-clip border-t border-line bg-paper py-[var(--space-section)]"
		>
			<Decor variant="rings" />
			<Container className="grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
				<div>
					<p className="eyebrow">Échange préalable</p>
					<h2
						id="cta-title"
						className="mt-4 text-[clamp(2.4rem,1.4rem+4vw,4.6rem)] leading-[1] font-semibold"
					>
						Trente minutes pour cadrer{" "}
						<Accent>votre besoin et votre infrastructure cible.</Accent>
					</h2>
					<p className="mt-6 max-w-[56ch] text-[1.08rem] text-ink-soft">
						Échange gratuit, sans engagement, en visioconférence. Vous repartez
						avec une analyse argumentée et, le cas échéant, un devis ferme.
					</p>
				</div>
				<div className="flex flex-col gap-3 lg:items-end">
					<ExternalButton href={BOOKING_URL} where="final-cta">
						{BOOKING_LABEL}
					</ExternalButton>
					<RouteButton to="/contact" variant="ghost">
						Ou me contacter par écrit
					</RouteButton>
				</div>
			</Container>
		</section>
	);
}
