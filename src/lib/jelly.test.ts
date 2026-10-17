import { describe, expect, it } from "vitest";
import {
	collide,
	createBlob,
	poke,
	restRadius,
	step,
	VERTICES,
	vertexPosition,
} from "./jelly";

const field = { width: 1200, height: 700 };
const idle = { x: 0, y: 0, active: false };

describe("formes gélatineuses", () => {
	it("sépare deux formes qui se chevauchent et les fait rebondir", () => {
		const a = createBlob({
			x: 500,
			y: 300,
			radius: 60,
			shape: "circle",
			vx: 40,
		});
		const b = createBlob({
			x: 560,
			y: 300,
			radius: 60,
			shape: "circle",
			vx: -40,
		});
		expect(collide(a, b)).toBe(true);
		expect(b.x - a.x).toBeCloseTo(108, 5); // (60 + 60) × 0,9
		expect(a.vx).toBeLessThan(0);
		expect(b.vx).toBeGreaterThan(0);
	});

	it("aplatit le contour du côté du contact", () => {
		const a = createBlob({ x: 500, y: 300, radius: 60, shape: "circle" });
		const b = createBlob({ x: 600, y: 300, radius: 60, shape: "circle" });
		collide(a, b);
		// Point 0 de `a` : direction +x, vers `b`.
		expect(a.offsets[0]).toBeLessThan(0);
		expect(a.offsets[VERTICES / 2]).toBe(0);
	});

	it("ne touche pas deux formes éloignées", () => {
		const a = createBlob({ x: 100, y: 100, radius: 40, shape: "circle" });
		const b = createBlob({ x: 400, y: 400, radius: 40, shape: "circle" });
		expect(collide(a, b)).toBe(false);
		expect(a.offsets.every((o) => o === 0)).toBe(true);
	});

	it("revient à sa forme de repos après une déformation", () => {
		const blob = createBlob({ x: 600, y: 350, radius: 60, shape: "circle" });
		blob.offsets[3] = -20;
		for (let t = 0; t < 600; t++) step([blob], field, idle, t / 120, 1 / 120);
		for (const o of blob.offsets) expect(Math.abs(o)).toBeLessThan(0.5);
	});

	it("reste dans le cadre, à un débord près", () => {
		const blob = createBlob({
			x: 600,
			y: 350,
			radius: 50,
			shape: "circle",
			vx: 150,
			vy: -150,
		});
		for (let t = 0; t < 2000; t++) step([blob], field, idle, t / 120, 1 / 120);
		expect(blob.x).toBeGreaterThanOrEqual(50 * 0.65 - 1e-9);
		expect(blob.x).toBeLessThanOrEqual(1200 - 50 * 0.65 + 1e-9);
		expect(blob.y).toBeGreaterThanOrEqual(50 * 0.65 - 1e-9);
	});

	it("donne au carré des coins plus loin que ses côtés", () => {
		const square = createBlob({ x: 0, y: 0, radius: 50, shape: "square" });
		expect(restRadius(square, Math.PI / 4)).toBeGreaterThan(
			restRadius(square, 0),
		);
		const p = vertexPosition(square, 0);
		expect(p.y).toBeCloseTo(0);
	});

	it("propulse les formes proches d'un clic, pas les lointaines", () => {
		const near = createBlob({ x: 120, y: 100, radius: 40, shape: "circle" });
		const far = createBlob({ x: 900, y: 600, radius: 40, shape: "circle" });
		poke([near, far], 100, 100);
		expect(near.vx).toBeGreaterThan(0);
		expect(far.vx).toBe(0);
	});

	it("reste stable sur une longue simulation avec collisions", () => {
		const blobs = Array.from({ length: 7 }, (_, i) =>
			createBlob({
				x: 150 + i * 140,
				y: 200 + (i % 3) * 150,
				radius: 30 + (i % 4) * 30,
				shape: i % 3 === 0 ? "square" : "circle",
				vx: (i % 2 ? 1 : -1) * 120,
				vy: 80,
				spin: 0.2,
				phase: i,
			}),
		);
		const pointer = { x: 600, y: 350, active: true };
		for (let t = 0; t < 120 * 60; t++) {
			step(blobs, field, pointer, t / 120, 1 / 120);
			if (t % 600 === 0) poke(blobs, 600, 350);
		}
		for (const b of blobs) {
			expect(Number.isFinite(b.x) && Number.isFinite(b.y)).toBe(true);
			for (const o of b.offsets) expect(Math.abs(o)).toBeLessThan(b.radius);
		}
	});
});
