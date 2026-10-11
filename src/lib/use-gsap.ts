import { type RefObject, useEffect } from "react";

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

export type GsapKit = {
	gsap: GsapModule["gsap"];
	ScrollTrigger: ScrollTriggerModule["ScrollTrigger"];
};

/**
 * Charge GSAP à la demande (hors bundle initial) et exécute `setup` dans un
 * contexte nettoyé au démontage. Aucune animation si l'utilisateur demande
 * un mouvement réduit : le contenu reste alors dans son état final.
 */
export function useGsap(
	scope: RefObject<Element | null>,
	setup: (kit: GsapKit) => void,
) {
	useEffect(() => {
		const el = scope.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let revert: (() => void) | undefined;
		let cancelled = false;

		(async () => {
			const [{ gsap }, { ScrollTrigger }, { MotionPathPlugin }] =
				await Promise.all([
					import("gsap"),
					import("gsap/ScrollTrigger"),
					import("gsap/MotionPathPlugin"),
				]);
			if (cancelled) return;
			gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
			const ctx = gsap.context(() => setup({ gsap, ScrollTrigger }), el);
			revert = () => ctx.revert();
		})();

		return () => {
			cancelled = true;
			revert?.();
		};
	}, [scope, setup]);
}
