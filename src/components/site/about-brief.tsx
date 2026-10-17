import type { IconName } from "@/components/diagrams/types";
import { Glyph } from "@/components/services/glyph";
import { RouteButton } from "@/components/site/button";
import { Accent, Section, SectionHead } from "@/components/site/section";
import { bio, career, principles } from "@/content/profile";
import { cn } from "@/lib/cn";

export const ABOUT_ANCHOR = "qui-suis-je";

const PRINCIPLE_ICONS: IconName[] = ["layers", "file", "sync"];

/** Accueil, deuxième temps : qui je suis, d'où je viens, comment je travaille. */
export function AboutBrief() {
	return (
		<Section id={ABOUT_ANCHOR} tone="alt" labelledBy="about-title">
			<div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
				<div>
					<SectionHead
						kicker="Qui suis-je"
						titleId="about-title"
						title={
							<>
								Une double compétence,{" "}
								<Accent>développement et infrastructure.</Accent>
							</>
						}
						intro={bio}
					/>

					<h3 className="mt-10 text-[0.95rem] font-semibold">Méthode</h3>
					<ul className="mt-4 grid gap-3">
						{principles.map((p, i) => (
							<li key={p.title} className="surface flex gap-4 p-4">
								<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-signal-soft text-signal">
									<Glyph name={PRINCIPLE_ICONS[i] ?? "check"} />
								</span>
								<span>
									<span className="block font-semibold">{p.title}</span>
									<span className="block text-[0.93rem] text-ink-soft">
										{p.text}
									</span>
								</span>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="text-[0.95rem] font-semibold">Parcours</h3>
					<ol className="relative mt-5 grid gap-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-line">
						{career.map((c) => (
							<li key={c.title + c.period} className="relative pl-9">
								<span
									aria-hidden="true"
									className={cn(
										"absolute top-1.5 left-0 size-[15px] rounded-full border-[3px]",
										c.highlight
											? "border-signal bg-highlight"
											: "border-paper-2 bg-pastel-ring",
									)}
								/>
								<p className="tabular text-[0.85rem] font-semibold text-signal-deep">
									{c.period}
								</p>
								<p className="mt-0.5 font-semibold leading-snug">{c.title}</p>
								<p className="text-[0.88rem] text-ink-soft">{c.company}</p>
								{c.highlight && (
									<p className="mt-1.5 text-[0.93rem] text-ink-soft">
										{c.desc}
									</p>
								)}
							</li>
						))}
					</ol>
					<div className="mt-8">
						<RouteButton to="/a-propos" variant="ghost">
							Mon parcours en détail
						</RouteButton>
					</div>
				</div>
			</div>
		</Section>
	);
}
