import { Accent, Section, SectionHead } from "@/components/site/section";
import { faq } from "@/content/faq";

export function FaqList() {
	return (
		<div className="border-t border-line">
			{faq.map((item) => (
				<details key={item.q} className="group border-b border-line">
					<summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
						<span className=" text-[1.25rem] leading-snug font-semibold">
							{item.q}
						</span>
						<span
							aria-hidden="true"
							className="mt-1 text-lg text-signal transition-transform duration-200 group-open:rotate-45"
						>
							+
						</span>
					</summary>
					<p className="max-w-[70ch] pb-7 text-ink-soft">{item.a}</p>
				</details>
			))}
		</div>
	);
}

export function FaqSection() {
	return (
		<Section tone="alt" id="faq" labelledBy="faq-title">
			<SectionHead
				index="08"
				kicker="Questions"
				titleId="faq-title"
				title={
					<>
						Questions <Accent>fréquentes.</Accent>
					</>
				}
			/>
			<div className="mt-14">
				<FaqList />
			</div>
		</Section>
	);
}
