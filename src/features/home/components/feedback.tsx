import { SectionHeader } from "@/features/home/components/section-header";
import { feedbacks } from "@/features/home/data/feedbacks";
import { useInfiniteCarousel } from "@/features/home/hooks/use-infinite-carousel";

function FeedbackCard({ f }: { f: (typeof feedbacks)[number] }) {
	return (
		<div className="bg-white rounded-[1.6rem] border border-line p-6 shadow-[0_8px_24px_rgba(12,46,61,0.06)] h-full flex flex-col">
			<p className="mt-3 text-[15px] leading-relaxed flex-1">{f.description}</p>
			<div className="mt-5 flex items-center gap-3">
				<img
					src={f.profile_picture}
					alt={f.user}
					width={40}
					height={40}
					className="w-10 h-10 rounded-full object-cover border border-line"
				/>
				<div>
					<div className="font-display font-semibold text-sm leading-none">
						{f.user}
					</div>
					<div className="font-display text-[11px] tracking-widest uppercase opacity-50">
						{f.role}
					</div>
				</div>
			</div>
		</div>
	);
}

export function FeedbackCarousel() {
	const VISIBLE_COUNT = 3;
	const extended = [
		...feedbacks.slice(-VISIBLE_COUNT),
		...feedbacks,
		...feedbacks.slice(0, VISIBLE_COUNT),
	];
	const { anim, tx, next, prev, onEnd } = useInfiniteCarousel(
		feedbacks.length,
		VISIBLE_COUNT,
	);

	return (
		<section id="feedback" className="bg-surface py-16 lg:py-22">
			<div className="max-w-275 mx-auto px-6">
				<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
					<SectionHeader
						accent="Recommandations"
						description="Quelques retours de collègues avec qui j'ai travaillé ainsi que des clients."
						withDot={true}
						size="md"
						accentClassName="text-primary"
						accentUnderline={false}
					/>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={prev}
							aria-label="Précédent"
							className="w-10 h-10 rounded-full bg-white border border-line grid place-items-center hover:bg-primary hover:text-white hover:border-primary transition"
						>
							‹
						</button>
						<button
							type="button"
							onClick={next}
							aria-label="Suivant"
							className="w-10 h-10 rounded-full bg-accent text-white grid place-items-center hover:bg-black transition"
						>
							›
						</button>
					</div>
				</div>
			</div>
			<div className="mt-8 overflow-hidden">
				<div
					onTransitionEnd={onEnd}
					className={`flex ${anim ? "transition-transform duration-360 ease-[cubic-bezier(0.32,0.72,0,1)]" : ""}`}
					style={{ transform: `translateX(${tx})` }}
				>
					{extended.map((f, i) => (
						<div
							key={`${f.user}-${i}`}
							className="shrink-0 w-full md:w-1/3 px-3 box-border"
						>
							<FeedbackCard f={f} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
