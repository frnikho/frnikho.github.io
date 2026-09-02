import { useCallback } from "react";

export function useScrollTo(offset = 84) {
	const scrollTo = useCallback(
		(hash: string) => {
			if (hash === "#top") {
				const prefersReduced = window.matchMedia(
					"(prefers-reduced-motion: reduce)",
				).matches;
				if (prefersReduced) window.scrollTo({ top: 0 });
				else window.scrollTo({ top: 0, behavior: "smooth" });
				history.pushState(null, "", window.location.pathname);
				return;
			}
			const el = document.querySelector(hash) as HTMLElement | null;
			if (!el) return;
			const y = el.getBoundingClientRect().top + window.scrollY - offset;
			const prefersReduced = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			if (prefersReduced) {
				window.scrollTo({ top: y });
				history.pushState(null, "", hash);
				return;
			}
			const startY = window.scrollY;
			const diff = y - startY;
			const duration = 450;
			let start: number | null = null;
			const ease = (t: number) =>
				t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
			const onFrame = (ts: number) => {
				if (start === null) start = ts;
				const p = Math.min((ts - start) / duration, 1);
				window.scrollTo(0, startY + diff * ease(p));
				if (p < 1) requestAnimationFrame(onFrame);
				else {
					history.pushState(null, "", hash);
					el.animate(
						[
							{ boxShadow: "0 0 0 0 rgba(12,46,61,0)" },
							{ boxShadow: "0 0 0 8px rgba(12,46,61,0.04)" },
							{ boxShadow: "0 0 0 0 rgba(12,46,61,0)" },
						],
						{ duration: 700, easing: "ease-out" },
					);
				}
			};
			requestAnimationFrame(onFrame);
		},
		[offset],
	);

	const handleNav = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
			e.preventDefault();
			scrollTo(hash);
		},
		[scrollTo],
	);

	return { scrollTo, handleNav };
}
