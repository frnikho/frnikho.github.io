import { Accent, Section, SectionHead } from "@/components/site/section";
import { testimonials } from "@/content/profile";

export function Testimonials() {
	return (
		<Section tone="alt" id="avis" labelledBy="avis-title">
			<SectionHead
				kicker="Références clients"
				titleId="avis-title"
				title={
					<>
						Ils m'ont fait confiance, <Accent>ils en parlent.</Accent>
					</>
				}
			/>
			<div className="mt-10 grid gap-5 lg:grid-cols-3">
				{testimonials.map((t) => (
					<figure key={t.author} className="surface flex flex-col p-6">
						<blockquote className="flex-1 text-[1.02rem] leading-relaxed">
							« {t.quote} »
						</blockquote>
						<figcaption className="mt-5 text-[0.95rem]">
							<span className="font-semibold">{t.author}</span>
							<span className="text-ink-soft"> · {t.role}</span>
						</figcaption>
					</figure>
				))}
			</div>
		</Section>
	);
}
