import { useCallback, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function useInfiniteCarousel(length: number, visibleCount = 3) {
	const [idx, setIdx] = useState(visibleCount);
	const [anim, setAnim] = useState(true);
	const [mounted, setMounted] = useState(false);
	const isMobile = useIsMobile();

	useEffect(() => setMounted(true), []);

	const displayIsMobile = mounted ? isMobile : false;

	const next = useCallback(() => {
		setAnim(true);
		setIdx((v) => v + 1);
	}, []);

	const prev = useCallback(() => {
		setAnim(true);
		setIdx((v) => v - 1);
	}, []);

	useEffect(() => {
		if (!anim) {
			const t = window.setTimeout(() => setAnim(true), 20);
			return () => clearTimeout(t);
		}
	}, [anim]);

	const onEnd = useCallback(() => {
		if (idx >= length + visibleCount) {
			setAnim(false);
			setIdx(visibleCount);
		} else if (idx < visibleCount) {
			setAnim(false);
			setIdx(length + visibleCount - 1);
		}
	}, [idx, length, visibleCount]);

	const tx = `-${idx * (100 / (displayIsMobile ? 1 : visibleCount))}%`;

	return { idx, anim, tx, next, prev, onEnd, displayIsMobile };
}
