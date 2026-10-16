import { Link } from "@tanstack/react-router";
import { RouteButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { getFamily, type ServiceFamily } from "@/content/services";

/** Prestations mises en avant sur l'accueil : celles qui portent le positionnement. */
const FEATURED_SERVICES = [
	"mise-en-production",
	"kubernetes",
	"securite",
	"auto-heberge",
] as const;

const featured = FEATURED_SERVICES.map(getFamily).filter(
	(f): f is ServiceFamily => f !== undefined,
);

/** Services en bref : quatre prestations, une ligne chacune, et le catalogue complet. */
export function ServicesBrief() {
	return (
		<Section tone="alt" id="services" labelledBy="services-title">
			<div className="flex flex-wrap items-end justify-between gap-6">
				<SectionHead
					kicker="Travailler avec moi"
					titleId="services-title"
					title={
						<>
							Ce que je fais <Accent>pour mes clients.</Accent>
						</>
					}
				/>
				<RouteButton to="/services" variant="ghost">
					Toutes les prestations
				</RouteButton>
			</div>
			<ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
				{featured.map((f) => (
					<li key={f.slug} className="flex">
						<article className="surface group relative flex w-full flex-col p-6 transition-shadow duration-200 hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)]">
							<p className="text-[1.6rem] leading-none font-bold text-signal">
								{f.index}
							</p>
							<h3 className="mt-4 text-[1.2rem] font-semibold">
								<Link
									to="/services/$slug"
									params={{ slug: f.slug }}
									className="after:absolute after:inset-0 group-hover:text-signal-deep"
								>
									{f.name}
								</Link>
							</h3>
							<p className="mt-2 text-[0.96rem] text-ink-soft">{f.short}</p>
						</article>
					</li>
				))}
			</ul>
		</Section>
	);
}
