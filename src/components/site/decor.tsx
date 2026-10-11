import { cn } from "@/lib/cn";

export type DecorVariant = "hero" | "grid" | "rings";

const RING = "rgba(37,99,235,0.2)";
const FILL = "rgba(37,99,235,0.08)";

/** Cercles concentriques, croix et carrés : formes légères, purement décoratives. */
function Shapes({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 520 520"
			fill="none"
			aria-hidden="true"
			className={cn("absolute", className)}
		>
			<g className="decor-spin" style={{ transformOrigin: "260px 260px" }}>
				<circle
					cx="260"
					cy="260"
					r="240"
					stroke={RING}
					strokeDasharray="3 9"
					strokeWidth="1.5"
				/>
				<circle cx="500" cy="260" r="5" fill={RING} />
			</g>
			<circle cx="260" cy="260" r="170" stroke={RING} strokeWidth="1.25" />
			<circle cx="260" cy="260" r="100" stroke={RING} strokeWidth="1.25" />
			<g className="decor-float" stroke={RING} strokeWidth="1.5">
				<path d="M60 92v22M49 103h22" />
				<path d="M452 410v22M441 421h22" />
			</g>
			<g className="decor-float-alt">
				<rect
					x="420"
					y="70"
					width="26"
					height="26"
					rx="6"
					stroke={RING}
					strokeWidth="1.5"
					transform="rotate(18 433 83)"
				/>
				<rect
					x="70"
					y="400"
					width="18"
					height="18"
					rx="4"
					fill={FILL}
					transform="rotate(-14 79 409)"
				/>
			</g>
		</svg>
	);
}

/**
 * Fond décoratif d'une section : halo, trame fine et formes géométriques.
 * Se place en premier enfant d'un parent `relative overflow-clip`. Les
 * sections paires sont inversées par `.decor-flip` (voir app.css).
 */
export function Decor({
	variant = "grid",
	shapes = true,
}: {
	variant?: DecorVariant;
	/** `false` retire les cercles et croix (déjà portés par un autre décor). */
	shapes?: boolean;
}) {
	return (
		<div
			aria-hidden="true"
			className="decor-flip pointer-events-none absolute inset-0 -z-0 overflow-clip"
		>
			<div
				className={cn(
					"decor-orb absolute rounded-full",
					variant === "hero"
						? "-top-40 -right-32 size-[46rem]"
						: "-top-48 -right-40 size-[34rem]",
				)}
			/>
			<div
				className={cn(
					"decor-grid absolute inset-0",
					variant === "rings" && "opacity-60",
				)}
			/>
			{shapes && (
				<Shapes
					className={cn(
						"hidden md:block",
						variant === "hero"
							? "top-6 -right-24 size-[34rem] lg:right-[-6rem]"
							: "-top-16 -right-28 size-[26rem]",
						variant === "grid" && "opacity-60",
					)}
				/>
			)}
			{variant === "hero" && (
				<div className="decor-orb-alt absolute -bottom-48 -left-40 size-[30rem] rounded-full" />
			)}
		</div>
	);
}
