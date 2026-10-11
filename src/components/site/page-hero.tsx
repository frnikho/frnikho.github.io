import type { ReactNode } from "react";
import { Container } from "@/components/site/section";

type Crumb = { label: string; to?: string };

export function PageHero({
	kicker,
	title,
	intro,
	children,
}: {
	kicker: string;
	title: ReactNode;
	intro?: ReactNode;
	children?: ReactNode;
}) {
	return (
		<section className=" border-b border-line">
			<Container className="py-16 lg:py-24">
				<p className="eyebrow">{kicker}</p>
				<h1 className="mt-5 max-w-[20ch] text-[clamp(2.4rem,1.4rem+4.2vw,4.8rem)] leading-[1] font-semibold lg:max-w-[24ch]">
					{title}
				</h1>
				{intro && (
					<p className="mt-7 max-w-[62ch] text-[1.12rem] leading-relaxed text-ink-soft">
						{intro}
					</p>
				)}
				{children && (
					<div className="mt-9 flex flex-wrap gap-3">{children}</div>
				)}
			</Container>
		</section>
	);
}

export type { Crumb };
