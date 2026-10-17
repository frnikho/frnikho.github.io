import { RouteButton } from "@/components/site/button";
import { ClientResults } from "@/components/site/client-project";
import { Section } from "@/components/site/section";
import { testimonials } from "@/content/profile";

/** Preuve sociale de l'accueil : un témoignage et les résultats chiffrés des projets clients. */
export function ProofSection() {
	const [quote] = testimonials;
	if (!quote) return null;
	return (
		<Section tone="alt" labelledBy="proof-title" decor="none">
			<h2 id="proof-title" className="sr-only">
				Références clients
			</h2>
			<div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
				<figure>
					<blockquote className="text-[clamp(1.35rem,1.05rem+1vw,1.9rem)] leading-snug font-semibold">
						« {quote.quote} »
					</blockquote>
					<figcaption className="mt-5 text-[1rem]">
						<span className="font-semibold">{quote.author}</span>
						<span className="text-ink-soft"> · {quote.role}</span>
					</figcaption>
				</figure>
				<div className="grid gap-5">
					<ClientResults />
					<div className="flex flex-wrap gap-3">
						<RouteButton to="/realisations" variant="ghost">
							Voir les réalisations
						</RouteButton>
					</div>
				</div>
			</div>
		</Section>
	);
}
