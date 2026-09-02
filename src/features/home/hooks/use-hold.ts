import { useCallback, useEffect, useRef, useState } from "react";

export function useHold(duration = 1000) {
	const [holding, setHolding] = useState(false);
	const [showBubbles, setShowBubbles] = useState(false);
	const [open, setOpen] = useState(false);
	const timerRef = useRef<number | undefined>(undefined);
	const hideRef = useRef<number | undefined>(undefined);

	const startHold = useCallback(() => {
		clearTimeout(hideRef.current);
		setShowBubbles(true);
		setHolding(true);
		timerRef.current = window.setTimeout(() => {
			setHolding(false);
			setOpen(true);
			hideRef.current = window.setTimeout(() => setShowBubbles(false), 420);
		}, duration);
	}, [duration]);

	const cancelHold = useCallback(() => {
		setHolding(false);
		clearTimeout(timerRef.current);
		timerRef.current = undefined;
		clearTimeout(hideRef.current);
		hideRef.current = window.setTimeout(() => setShowBubbles(false), 380);
	}, []);

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
			clearTimeout(hideRef.current);
		},
		[],
	);

	return { holding, showBubbles, open, setOpen, startHold, cancelHold };
}
