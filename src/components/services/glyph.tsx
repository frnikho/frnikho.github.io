import { ICONS } from "@/components/diagrams/icons";
import type { IconName } from "@/components/diagrams/types";
import { cn } from "@/lib/cn";

/** Pictogramme des schémas (tracés Lucide), en HTML. */
export function Glyph({
	name,
	className,
}: {
	name: IconName;
	className?: string;
}) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn("size-5 shrink-0", className)}
		>
			<path d={ICONS[name]} />
		</svg>
	);
}
