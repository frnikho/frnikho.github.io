import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "light" | "ink";

const base =
	"group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[15px] font-semibold transition-colors duration-150";

const variants: Record<Variant, string> = {
	primary: "bg-signal text-white hover:bg-signal-deep",
	ghost:
		"border border-line bg-white text-ink hover:border-ink/30 hover:bg-paper-2",
	light: "bg-white text-night hover:bg-signal-soft",
	ink: "bg-ink text-highlight hover:bg-ink/85",
};

export const buttonClass = (variant: Variant = "primary") =>
	cn(base, variants[variant]);

const Arrow = () => (
	<span
		aria-hidden="true"
		className="transition-transform duration-150 group-hover:translate-x-0.5"
	>
		→
	</span>
);

type CommonProps = {
	children: ReactNode;
	variant?: Variant;
	className?: string;
};

export function ExternalButton({
	href,
	children,
	variant = "primary",
	className,
	where,
}: CommonProps & {
	href: string;
	/** Emplacement du bouton, envoyé avec l'événement de réservation. */
	where?: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(base, variants[variant], className)}
			data-umami-event={where ? "booking-click" : undefined}
			data-umami-event-location={where}
		>
			{children}
			<Arrow />
		</a>
	);
}

type RouteButtonProps = CommonProps &
	Omit<ComponentProps<typeof Link>, "className" | "children">;

export function RouteButton({
	children,
	variant = "primary",
	className,
	...linkProps
}: RouteButtonProps) {
	return (
		<Link {...linkProps} className={cn(base, variants[variant], className)}>
			{children}
			<Arrow />
		</Link>
	);
}
