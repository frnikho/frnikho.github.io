import { sovereigntyPillars } from "@/content/sovereignty";

/** Les six engagements de la page Souveraineté, en grille. */
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
