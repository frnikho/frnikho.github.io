import { useMemo, useRef } from "react";
import { clusterMetrics, clusterWaves } from "@/content/cluster";
import { type GsapKit, useGsap } from "@/lib/use-gsap";

export function ClusterMetrics() {
	const ref = useRef<HTMLDListElement>(null);
	const setup = useMemo(
		() =>
			({ gsap, ScrollTrigger }: GsapKit) => {
				for (const el of gsap.utils.toArray<HTMLElement>("[data-count]")) {
					const target = Number(el.dataset.count);
					if (!target) continue;
					const suffix = el.dataset.suffix ?? "";
					const state = { v: 0 };
					el.textContent = `0${suffix}`;
					gsap.to(state, {
						v: target,
						duration: 1.4,
						ease: "power2.out",
						snap: { v: 1 },
						onUpdate: () => {
							el.textContent = `${state.v}${suffix}`;
						},
						scrollTrigger: { trigger: el, start: "top 90%", once: true },
					});
				}
				ScrollTrigger.refresh();
			},
		[],
	);
	useGsap(ref, setup);

	return (
		<dl ref={ref} className="grid grid-cols-2 gap-5 lg:grid-cols-4">
			{clusterMetrics.map((m) => (
				<div key={m.label} className="surface flex flex-col p-6">
					<dt className="order-2 mt-2 text-[0.95rem] leading-snug text-ink-soft">
						{m.label}
					</dt>
					<dd
						className="tabular text-[clamp(2.4rem,1.6rem+2.4vw,3.6rem)] leading-none font-bold text-signal"
						data-count={m.count}
						data-suffix={m.suffix}
					>
						{m.value}
					</dd>
				</div>
			))}
		</dl>
	);
}

export function ClusterWaves() {
	return (
		<ol className="grid gap-3 sm:grid-cols-2">
			{clusterWaves.map((w) => (
				<li
					key={w.waves}
					className="surface flex items-baseline gap-4 px-5 py-4"
				>
					<span className="tabular w-16 shrink-0 text-[14px] font-bold text-signal">
						Vague {w.waves}
					</span>
					<span>{w.label}</span>
				</li>
			))}
		</ol>
	);
}
