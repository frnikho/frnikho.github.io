import { cn } from "@/lib/cn";

export type DecorVariant = "hero" | "grid" | "rings";

/**
 * Fond décoratif d'une section : formes géométriques pastel (disque bleu,
 * carré jaune incliné, anneau, pastilles). Se place en premier enfant d'un
 * parent `relative overflow-clip`. Les sections paires sont inversées par
 * `.decor-flip` (voir app.css).
 *
 * - `hero` : formes larges, pour les en-têtes de page ;
 * - `grid` : version discrète, pour les sections courantes ;
 * - `rings` : formes claires, pour les bandes colorées (CTA surligneur).
 */
export function Decor({
	variant = "grid",
	shapes = true,
}: {
	variant?: DecorVariant;
	/** `false` ne garde que le grand disque (les petites formes sont portées par un autre décor). */
	shapes?: boolean;
}) {
	return (
		<div
			aria-hidden="true"
			className="decor-flip pointer-events-none absolute inset-0 -z-0 overflow-clip"
		>
			{variant === "rings" ? <BandShapes /> : null}
			{variant === "hero" && <HeroShapes shapes={shapes} />}
			{variant === "grid" && <SectionShapes />}
		</div>
	);
}

function HeroShapes({ shapes }: { shapes: boolean }) {
	return (
		<>
			<div className="absolute -top-24 -right-24 size-[26rem] rounded-full bg-pastel-blue/80 lg:size-[34rem]" />
			{shapes && (
				<>
					<div className="decor-float absolute top-[58%] right-[22%] hidden size-24 rotate-[14deg] rounded-[1.4rem] bg-pastel-yellow md:block" />
					<div className="decor-float-alt absolute top-[22%] right-[38%] hidden size-12 rounded-full border-[3px] border-pastel-ring md:block" />
					<Dots className="bottom-8 left-[46%] hidden lg:block" />
				</>
			)}
			<div className="absolute -bottom-20 -left-16 size-44 rounded-full bg-pastel-yellow/60" />
		</>
	);
}

function SectionShapes() {
	return (
		<>
			<div className="absolute -top-20 -right-16 size-56 rounded-full bg-pastel-blue/60" />
			<div className="decor-float absolute top-16 right-40 hidden size-14 rotate-[18deg] rounded-xl bg-pastel-yellow/80 md:block" />
			<div className="decor-float-alt absolute right-[8%] bottom-10 hidden size-9 rounded-full border-[3px] border-pastel-ring/80 lg:block" />
		</>
	);
}

function BandShapes() {
	return (
		<>
			<div className="absolute -top-16 right-[8%] size-40 rounded-full bg-white/50" />
			<div className="decor-float absolute right-[30%] bottom-6 hidden size-12 rotate-[14deg] rounded-xl border-[3px] border-ink/10 md:block" />
			<div className="absolute -bottom-24 -left-10 size-56 rounded-full bg-ink/[0.04]" />
		</>
	);
}

/** Petite trame de pastilles, en grille 4 × 3. */
function Dots({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 64 44"
			className={cn("absolute w-16 text-pastel-ring", className)}
			fill="currentColor"
		>
			{Array.from({ length: 12 }, (_, i) => (
				<circle
					key={i}
					cx={4 + (i % 4) * 18}
					cy={4 + Math.floor(i / 4) * 18}
					r={2.5}
				/>
			))}
		</svg>
	);
}
