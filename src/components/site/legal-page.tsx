import type { ReactNode } from "react";
import { PageShell } from "@/components/site/page-shell";
import { Container } from "@/components/site/section";

export function LegalPage({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<PageShell>
			<Container className="max-w-[820px] py-16 lg:py-24">
				<h1 className="text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] leading-none font-semibold">
					{title}
				</h1>
				<div className="mt-10 grid gap-8 leading-relaxed [&_a]:text-signal-deep [&_a]:underline [&_h2]:mb-2 [&_h2]: [&_h2]:text-[1.3rem] [&_h2]:font-semibold [&_li]:text-ink-soft [&_p]:text-ink-soft [&_ul]:list-disc [&_ul]:pl-5">
					{children}
				</div>
			</Container>
		</PageShell>
	);
}
