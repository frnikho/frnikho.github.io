import { useEffect, useRef } from "react";

export function GridPaper({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouse = useRef<{
		x: number;
		y: number;
		tx: number;
		ty: number;
		active: boolean;
	}>({
		x: -1000,
		y: -1000,
		tx: -1000,
		ty: -1000,
		active: false,
	});

	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let raf = 0;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const setSize = () => {
			const { width, height } = container.getBoundingClientRect();
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		setSize();
		const ro = new ResizeObserver(setSize);
		ro.observe(container);
		const onMove = (e: MouseEvent) => {
			const r = container.getBoundingClientRect();
			mouse.current.tx = e.clientX - r.left;
			mouse.current.ty = e.clientY - r.top;
			mouse.current.active = true;
		};
		const onLeave = () => {
			mouse.current.active = false;
		};
		const onTouchMove = (e: TouchEvent) => {
			const r = container.getBoundingClientRect();
			const t = e.touches[0];
			if (!t) return;
			mouse.current.tx = t.clientX - r.left;
			mouse.current.ty = t.clientY - r.top;
			mouse.current.active = true;
		};
		container.addEventListener("mousemove", onMove);
		container.addEventListener("mouseleave", onLeave);
		container.addEventListener("touchmove", onTouchMove, { passive: true });
		container.addEventListener("touchend", onLeave);
		const draw = () => {
			const { width, height } = container.getBoundingClientRect();
			mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.14;
			mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.14;
			if (!mouse.current.active) {
				mouse.current.x += (-1000 - mouse.current.x) * 0.04;
				mouse.current.y += (-1000 - mouse.current.y) * 0.04;
			}
			ctx.clearRect(0, 0, width, height);
			ctx.strokeStyle = "rgba(12,46,61,0.07)";
			ctx.lineWidth = 1;
			const grid = 32;
			const radius = 280;
			const strength = 36;
			for (let x = 0; x <= width; x += grid) {
				ctx.beginPath();
				for (let y = 0; y <= height; y += 5) {
					let ox = 0;
					const dx = mouse.current.x - x;
					const dy = mouse.current.y - y;
					const dist = Math.hypot(dx, dy);
					if (dist < radius) {
						const f = (1 - dist / radius) ** 1.8;
						ox = -(dx / (dist || 1)) * strength * f * Math.cos(dist * 0.025);
					}
					const nx = x + ox;
					if (y === 0) ctx.moveTo(nx, y);
					else ctx.lineTo(nx, y);
				}
				ctx.stroke();
			}
			for (let y = 0; y <= height; y += grid) {
				ctx.beginPath();
				for (let x = 0; x <= width; x += 5) {
					let oy = 0;
					const dx = mouse.current.x - x;
					const dy = mouse.current.y - y;
					const dist = Math.hypot(dx, dy);
					if (dist < radius) {
						const f = (1 - dist / radius) ** 1.8;
						oy = -(dy / (dist || 1)) * strength * f * Math.cos(dist * 0.025);
					}
					const ny = y + oy;
					if (x === 0) ctx.moveTo(x, ny);
					else ctx.lineTo(x, ny);
				}
				ctx.stroke();
			}
			raf = requestAnimationFrame(draw);
		};
		draw();
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			container.removeEventListener("mousemove", onMove);
			container.removeEventListener("mouseleave", onLeave);
			container.removeEventListener("touchmove", onTouchMove);
			container.removeEventListener("touchend", onLeave);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative overflow-hidden border-b border-line/60 bg-surface"
		>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-none"
				aria-hidden="true"
			/>
			<div className="relative z-10">{children}</div>
		</div>
	);
}
