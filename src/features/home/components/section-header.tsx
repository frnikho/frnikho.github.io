import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const titleSizeClasses = {
	lg: "text-[32px] lg:text-[44px] leading-[0.9] tracking-[-0.04em]",
	md: "text-[30px] lg:text-[40px] leading-none tracking-[-0.03em]",
	sm: "text-[28px] lg:text-[36px] leading-none tracking-[-0.03em]",
} as const;

const descriptionSizeClasses = {
	lg: "text-[15px] leading-relaxed",
	md: "text-[14px] leading-relaxed font-display",
	sm: "text-[14px] leading-relaxed font-display",
} as const;

export type SectionHeaderProps = {
	prefix?: string;
	accent?: string;
	/** Alternative full title as ReactNode - overrides prefix/accent split if provided */
	title?: React.ReactNode;
	description?: React.ReactNode;
	withDot?: boolean;
	size?: keyof typeof titleSizeClasses;
	accentClassName?: string;
	accentUnderline?: boolean;
	containerClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	as?: "h2" | "h3";
};

export function SectionHeader({
	prefix,
	accent,
	title,
	description,
	withDot = true,
	size = "lg",
	accentClassName = "text-accent",
	accentUnderline = true,
	containerClassName = "max-w-160",
	titleClassName,
	descriptionClassName,
	as: Tag = "h2",
}: SectionHeaderProps) {
	const titleNode =
		title ??
		(prefix !== undefined || accent !== undefined ? (
			<>
				{prefix ? `${prefix} ` : null}
				{accent ? (
					<span
						className={cn(
							"font-bold",
							accentUnderline && "underline underline-offset-4",
							accentClassName,
						)}
					>
						{accent}
					</span>
				) : null}
			</>
		) : null);

	return (
		<div className={cn(containerClassName)}>
			<div
				className={cn(
					withDot
						? "flex items-center gap-2.5 mt-4"
						: "flex flex-row items-center gap-2",
				)}
			>
				{withDot && (
					<motion.span
						initial={{ scale: 0, opacity: 0 }}
						whileInView={{ scale: 1, opacity: 1 }}
						viewport={{ once: true, amount: 0.6 }}
						transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className="relative w-3 h-3 rounded-full border border-primary/15 grid place-items-center shrink-0"
						aria-hidden="true"
					>
						<span className="w-1.5 h-1.5 rounded-full bg-primary" />
					</motion.span>
				)}
				<Tag
					className={cn(
						"font-display font-bold",
						titleSizeClasses[size],
						titleClassName,
					)}
				>
					{titleNode}
				</Tag>
			</div>
			{description && (
				<p
					className={cn(
						"mt-3 opacity-60",
						descriptionSizeClasses[size],
						descriptionClassName,
					)}
				>
					{description}
				</p>
			)}
		</div>
	);
}

// Alias demandé "header" - même style réutilisable partout
export const Header = SectionHeader;
export const SectionTitle = SectionHeader;
