import { useEffect, useRef, useState } from "react";

const DURATION_MS = 550;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Valeur affichée qui rejoint `target` en douceur. Sans animation si
 * l'utilisateur demande un mouvement réduit.
 */
export function useAnimatedNumber(target: number): number {
	const [shown, setShown] = useState(target);
	const from = useRef(target);

	useEffect(() => {
		const start = from.current;
		if (
			start === target ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			from.current = target;
			setShown(target);
			return;
		}
		const t0 = performance.now();
		let frame = 0;
		const tick = (now: number) => {
			const t = Math.min(1, (now - t0) / DURATION_MS);
			const value = start + (target - start) * easeOutCubic(t);
			from.current = value;
			setShown(value);
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [target]);

	return shown;
}
