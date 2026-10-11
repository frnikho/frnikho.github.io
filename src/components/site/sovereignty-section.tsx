import { SchemaDiagram } from "@/components/diagrams/schema-diagram";
import { sovereigntyFlow } from "@/components/diagrams/specs";
import { RouteButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { sovereigntyPillars } from "@/content/sovereignty";

export function SovereigntyPillars() {
	return (
		<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{sovereigntyPillars.map((p) => (
				<li key={p.title} className="surface p-6">
					<span
						aria-hidden="true"
						className="grid size-9 place-items-center rounded-lg bg-signal-soft font-bold text-signal"
					>
						✓
					</span>
					<h3 className="mt-4 text-[1.15rem] font-semibold">{p.title}</h3>
					<p className="mt-2 text-ink-soft">{p.desc}</p>
				</li>
			))}
		</ul>
	);
}

const highlights = sovereigntyPillars.slice(0, 4);

export function SovereigntySection() {
	return (
		<Section id="souverainete" labelledBy="souverainete-title">
			<div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
				<div className="surface order-2 p-4 sm:p-6 lg:order-1">
					<SchemaDiagram spec={sovereigntyFlow} />
				</div>
				<div className="order-1 lg:order-2">
					<SectionHead
						kicker="Souveraineté et RGPD"
						titleId="souverainete-title"
						title={
							<>
								Des données hébergées en Europe,{" "}
								<Accent>sous votre maîtrise.</Accent>
							</>
						}
					/>
					<ul className="mt-6 grid gap-3">
						{highlights.map((p) => (
							<li key={p.title} className="flex gap-3">
								<span
									aria-hidden="true"
									className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-signal-soft text-[13px] font-bold text-signal"
								>
									✓
								</span>
								<span>
									<span className="font-semibold">{p.title}.</span>{" "}
									<span className="text-ink-soft">{p.desc}</span>
								</span>
							</li>
						))}
					</ul>
					<div className="mt-7">
						<RouteButton to="/souverainete" variant="ghost">
							Détail de l'approche
						</RouteButton>
					</div>
				</div>
			</div>
		</Section>
	);
}
