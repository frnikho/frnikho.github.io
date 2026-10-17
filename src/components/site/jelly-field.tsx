import { useEffect, useRef } from "react";
import {
	type Blob,
	type BlobShape,
	createBlob,
	type Pointer,
	poke,
	step,
	VERTICES,
	vertexPosition,
} from "@/lib/jelly";

/** Pas de simulation fixe (stable quel que soit l'écran) et rattrapage maximal par image. */
const STEP = 1 / 120;
const MAX_STEPS_PER_FRAME = 4;
const MAX_DPR = 2;
/** Largeur de référence : en dessous, les formes rapetissent (jusqu'à moitié). */
const REFERENCE_WIDTH = 1400;

type Paint = { fill?: string; stroke?: string; alpha?: number };

type BlobSpec = {
	/** Position de départ, en fraction de la zone. */
	fx: number;
	fy: number;
	radius: number;
	shape: BlobShape;
	paint: (colors: Palette) => Paint;
	spin?: number;
};

type Palette = Record<
	"blue" | "yellow" | "ring" | "lilac" | "highlight" | "green",
	string
>;

/** Couleurs lues dans les tokens du thème (`app.css`), avec repli si absentes. */
function readPalette(): Palette {
	const css = getComputedStyle(document.documentElement);
	const token = (name: string, fallback: string) =>
		css.getPropertyValue(name).trim() || fallback;
	return {
		blue: token("--color-pastel-blue", "#dfe8ff"),
		yellow: token("--color-pastel-yellow", "#ffe9a8"),
		ring: token("--color-pastel-ring", "#b9ccff"),
		lilac: token("--color-pastel-lilac", "#ece4fd"),
		green: token("--color-pastel-green", "#ddf5e9"),
		highlight: token("--color-highlight", "#ffe066"),
	};
}

const SPECS: BlobSpec[] = [
	{
		fx: 0.05,
		fy: 0.22,
		radius: 60,
		shape: "circle",
		paint: (c) => ({ fill: c.green }),
	},
	{
		fx: 0.86,
		fy: 0.24,
		radius: 170,
		shape: "circle",
		paint: (c) => ({ fill: c.blue }),
	},
	{
		fx: 0.68,
		fy: 0.78,
		radius: 70,
		shape: "square",
		spin: 0.14,
		paint: (c) => ({ fill: c.yellow }),
	},
	{
		fx: 0.56,
		fy: 0.18,
		radius: 34,
		shape: "circle",
		paint: (c) => ({ stroke: c.ring }),
	},
	{
		fx: 0.95,
		fy: 0.84,
		radius: 46,
		shape: "circle",
		paint: (c) => ({ fill: c.ring, alpha: 0.75 }),
	},
	{
		fx: 0.07,
		fy: 0.9,
		radius: 92,
		shape: "circle",
		paint: (c) => ({ fill: c.yellow, alpha: 0.7 }),
	},
	{
		fx: 0.42,
		fy: 0.93,
		radius: 30,
		shape: "square",
		spin: -0.2,
		paint: (c) => ({ fill: c.lilac }),
	},
	{
		fx: 0.3,
		fy: 0.1,
		radius: 24,
		shape: "circle",
		paint: (c) => ({ fill: c.highlight, alpha: 0.85 }),
	},
];

/** Contour lissé : courbes quadratiques passant par les milieux des points. */
function tracePath(ctx: CanvasRenderingContext2D, blob: Blob) {
	const pts = Array.from({ length: VERTICES }, (_, i) =>
		vertexPosition(blob, i),
	);
	const mid = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
		x: (a.x + b.x) / 2,
		y: (a.y + b.y) / 2,
	});
	const start = mid(pts[VERTICES - 1], pts[0]);
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	for (let i = 0; i < VERTICES; i++) {
		const m = mid(pts[i], pts[(i + 1) % VERTICES]);
		ctx.quadraticCurveTo(pts[i].x, pts[i].y, m.x, m.y);
	}
	ctx.closePath();
}

/** Une forme : remplissage translucide, liseré, et reflet brillant façon gelée. */
function drawBlob(
	ctx: CanvasRenderingContext2D,
	blob: Blob,
	paint: Paint,
	scale: number,
) {
	ctx.save();
	ctx.globalAlpha = paint.alpha ?? 1;
	tracePath(ctx, blob);
	if (paint.fill) {
		const r = blob.radius;
		const gradient = ctx.createRadialGradient(
			blob.x - r * 0.35,
			blob.y - r * 0.4,
			r * 0.1,
			blob.x,
			blob.y,
			r * 1.1,
		);
		gradient.addColorStop(0, "rgba(255,255,255,0.65)");
		gradient.addColorStop(0.45, paint.fill);
		gradient.addColorStop(1, paint.fill);
		ctx.fillStyle = paint.fill;
		ctx.fill();
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.strokeStyle = "rgba(18,24,38,0.06)";
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
	if (paint.stroke) {
		ctx.strokeStyle = paint.stroke;
		ctx.lineWidth = 4 * scale;
		ctx.stroke();
	}
	// Reflet : petite ellipse claire en haut à gauche, inclinée.
	ctx.globalAlpha = (paint.alpha ?? 1) * 0.7;
	ctx.fillStyle = "rgba(255,255,255,0.9)";
	ctx.beginPath();
	ctx.ellipse(
		blob.x - blob.radius * 0.38,
		blob.y - blob.radius * 0.42,
		blob.radius * 0.2,
		blob.radius * 0.1,
		-0.6,
		0,
		Math.PI * 2,
	);
	ctx.fill();
	ctx.restore();
}

/**
 * Formes pastel gélatineuses, en fond de section : elles dérivent, se
 * cognent, s'écrasent et tremblotent. Le pointeur les écarte, un clic leur
 * donne une pichenette. En pause hors écran ; immobiles si l'utilisateur
 * demande un mouvement réduit. À placer en premier enfant d'un parent `relative`.
 */
export function JellyField() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const host = canvas?.parentElement;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !host || !ctx) return;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const palette = readPalette();
		const paints = SPECS.map((s) => s.paint(palette));
		const pointer: Pointer = { x: 0, y: 0, active: false };
		const field = { width: 0, height: 0 };
		let blobs: Blob[] = [];
		let scale = 1;
		let frame = 0;
		let last = 0;
		let time = 0;
		let backlog = 0;
		let visible = true;

		const draw = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, field.width, field.height);
			for (const [i, b] of blobs.entries()) drawBlob(ctx, b, paints[i], scale);
		};

		const resize = () => {
			const { width, height } = host.getBoundingClientRect();
			if (width === 0 || height === 0) return;
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			const nextScale = Math.min(1, Math.max(0.5, width / REFERENCE_WIDTH));
			if (blobs.length === 0) {
				blobs = SPECS.map((s, i) =>
					createBlob({
						x: s.fx * width,
						y: s.fy * height,
						radius: s.radius * nextScale,
						shape: s.shape,
						spin: s.spin ?? 0,
						phase: i * 1.37,
					}),
				);
			} else {
				for (const [i, b] of blobs.entries()) {
					b.x *= width / field.width;
					b.y *= height / field.height;
					b.radius = SPECS[i].radius * nextScale;
				}
			}
			field.width = width;
			field.height = height;
			scale = nextScale;
			draw();
		};

		const tick = (now: number) => {
			frame = 0;
			if (!visible) return;
			const elapsed = last ? Math.min((now - last) / 1000, 0.1) : 0;
			last = now;
			backlog = Math.min(backlog + elapsed, STEP * MAX_STEPS_PER_FRAME);
			while (backlog >= STEP) {
				time += STEP;
				step(blobs, field, pointer, time, STEP);
				backlog -= STEP;
			}
			draw();
			frame = requestAnimationFrame(tick);
		};

		const start = () => {
			if (reduceMotion || frame || !visible) return;
			last = 0;
			frame = requestAnimationFrame(tick);
		};
		const stop = () => {
			cancelAnimationFrame(frame);
			frame = 0;
		};

		const local = (e: PointerEvent) => {
			const rect = host.getBoundingClientRect();
			return { x: e.clientX - rect.left, y: e.clientY - rect.top, rect };
		};
		const onMove = (e: PointerEvent) => {
			const { x, y, rect } = local(e);
			pointer.x = x;
			pointer.y = y;
			pointer.active =
				e.pointerType === "mouse" &&
				x >= 0 &&
				y >= 0 &&
				x <= rect.width &&
				y <= rect.height;
		};
		const onLeave = () => {
			pointer.active = false;
		};
		const onDown = (e: PointerEvent) => {
			if (reduceMotion) return;
			const { x, y } = local(e);
			poke(blobs, x, y);
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(host);
		const visibility = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting && !document.hidden;
			if (visible) start();
			else stop();
		});
		visibility.observe(host);
		const onVisibilityChange = () => {
			visible = !document.hidden;
			if (visible) start();
			else stop();
		};

		resize();
		start();
		window.addEventListener("pointermove", onMove, { passive: true });
		document.addEventListener("pointerleave", onLeave);
		host.addEventListener("pointerdown", onDown);
		document.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			stop();
			resizeObserver.disconnect();
			visibility.disconnect();
			window.removeEventListener("pointermove", onMove);
			document.removeEventListener("pointerleave", onLeave);
			host.removeEventListener("pointerdown", onDown);
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 -z-0 size-full"
		/>
	);
}
