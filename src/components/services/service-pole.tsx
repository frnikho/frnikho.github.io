import { FamilyDisclosure } from "@/components/services/family-disclosure";
import { PoleVisual } from "@/components/services/pole-visuals";
import { Container } from "@/components/site/section";
import type { ServicePole } from "@/content/service-poles";
import { getFamily, type ServiceFamily } from "@/content/services";
import { cn } from "@/lib/cn";

/** Un pôle de la page Services : texte court, familles dépliables et illustration. */
export function ServicePoleSection({
	pole,
	reversed,
}: {
	pole: ServicePole;
	/** Illustration à gauche sur grand écran, pour alterner d'un pôle à l'autre. */
	reversed?: boolean;
}) {
	const families = pole.families
		.map(getFamily)
		.filter((f): f is ServiceFamily => f !== undefined);
	const titleId = `${pole.id}-title`;

	return (
		<section
			id={pole.id}
			aria-labelledby={titleId}
			className="border-b border-line py-[var(--space-section)]"
		>
			<Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
				<div className={cn(reversed && "lg:order-2")}>
					<p className="flex items-center gap-3">
						<span className="text-[2.6rem] leading-none font-bold text-signal">
							{pole.index}
						</span>
						<span className="eyebrow">{pole.name}</span>
					</p>
					<h2
						id={titleId}
						className="mt-5 max-w-[22ch] text-[length:var(--text-h2)] leading-[1.1]"
					>
						{pole.title}
					</h2>
					<p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-soft">
						{pole.desc}
					</p>
					<ul className="mt-8 grid gap-2.5">
						{families.map((f) => (
							<FamilyDisclosure key={f.slug} family={f} />
						))}
					</ul>
				</div>
				<div className={cn("lg:sticky lg:top-24", reversed && "lg:order-1")}>
					<PoleVisual pole={pole.id} />
				</div>
			</Container>
		</section>
	);
}
