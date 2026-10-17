import { Link } from "@tanstack/react-router";
import { Glyph } from "@/components/services/glyph";
import { RouteButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { servicePoles } from "@/content/service-poles";
import { getFamily, type ServiceFamily } from "@/content/services";

/** Accueil, troisième temps : ce que je fais, en quatre pôles. */
export function ServicesBrief() {
	return (
		<Section id="services" labelledBy="services-title">
			<div className="flex flex-wrap items-end justify-between gap-6">
				<SectionHead
					kicker="Ce que je fais"
					titleId="services-title"
					title={
						<>
							Quatre pôles d'intervention,{" "}
							<Accent>de l'application au serveur.</Accent>
						</>
					}
					intro="De la première mise en ligne au suivi dans la durée : chaque pôle se commande seul ou combiné."
				/>
				<RouteButton to="/services" variant="ghost">
					Toutes les prestations
				</RouteButton>
			</div>
			<ul className="mt-12 grid gap-5 md:grid-cols-2">
				{servicePoles.map((p) => {
					const families = p.families
						.map(getFamily)
						.filter((f): f is ServiceFamily => f !== undefined);
					return (
						<li key={p.id} className="flex">
							<article className="surface group flex w-full flex-col p-6 transition-shadow duration-200 hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)] sm:p-7">
								<div className="flex items-center gap-3">
									<span className="grid size-11 place-items-center rounded-xl bg-signal-soft text-signal transition-colors group-hover:bg-signal group-hover:text-white">
										<Glyph name={p.icon} />
									</span>
									<span className="text-[1.6rem] leading-none font-bold text-signal/30">
										{p.index}
									</span>
								</div>
								<h3 className="mt-5 text-[1.3rem] font-bold">
									<Link
										to="/services"
										hash={p.id}
										className="hover:text-signal-deep"
									>
										{p.name}
									</Link>
								</h3>
								<p className="mt-2 flex-1 text-ink-soft">{p.desc}</p>
								<ul className="mt-5 flex flex-wrap gap-1.5">
									{families.map((f) => (
										<li key={f.slug}>
											<Link
												to="/services"
												hash={f.slug}
												className="inline-block rounded-full bg-paper-2 px-3 py-1 text-[0.85rem] font-medium transition-colors hover:bg-signal-soft hover:text-signal-deep"
											>
												{f.name}
											</Link>
										</li>
									))}
								</ul>
							</article>
						</li>
					);
				})}
			</ul>
		</Section>
	);
}
