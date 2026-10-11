import type { ReactNode } from "react";
import { Decor, type DecorVariant } from "@/components/site/decor";
import { cn } from "@/lib/cn";

export function Container({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative mx-auto w-full max-w-[1400px] px-6 lg:px-10 xl:px-14",
				className,
			)}
		>
			{children}
		</div>
	);
}

type SectionProps = {
	id?: string;
	tone?: "paper" | "alt" | "night";
	className?: string;
	children: ReactNode;
	labelledBy?: string;
	/** Fond décoratif. `none` pour une section sans décor. */
	decor?: DecorVariant | "none";
};

const tones = {
	paper: "bg-paper text-ink",
	alt: "bg-paper-2 text-ink",
	night: "bg-night text-night-ink",
} as const;

export function Section({
	id,
	tone = "paper",
	className,
	children,
	labelledBy,
	decor = "grid",
}: SectionProps) {
	return (
		<section
			id={id}
			aria-labelledby={labelledBy}
			className={cn(
				"relative overflow-clip py-[var(--space-section)]",
				tones[tone],
				className,
			)}
		>
			{decor !== "none" && tone !== "night" && <Decor variant={decor} />}
			<Container>{children}</Container>
		</section>
	);
}

type SectionHeadProps = {
	index?: string;
	kicker: string;
	title: ReactNode;
	intro?: ReactNode;
	titleId?: string;
	dark?: boolean;
};

export function SectionHead({
	kicker,
	title,
	intro,
	titleId,
	dark,
}: SectionHeadProps) {
	return (
		<header className="max-w-[760px]">
			<p className={cn("eyebrow", dark && "!text-night-ink/70")}>{kicker}</p>
			<h2
				id={titleId}
				className="mt-3 text-[length:var(--text-h2)] leading-[1.1]"
			>
				{title}
			</h2>
			{intro && (
				<p
					className={cn(
						"mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed",
						dark ? "text-night-soft" : "text-ink-soft",
					)}
				>
					{intro}
				</p>
			)}
		</header>
	);
}

/** Accent : mot ou fin de phrase en couleur d'accent. */
export function Accent({
	children,
	dark,
}: {
	children: ReactNode;
	dark?: boolean;
}) {
	return (
		<span className={dark ? "text-signal" : "text-signal"}>{children}</span>
	);
}
