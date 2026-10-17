/**
 * Moteur de formes gélatineuses : chaque forme est un corps mou dont le
 * contour est fait de `VERTICES` points montés sur ressorts radiaux. Les
 * formes dérivent, se repoussent à la collision (rebond élastique), et leur
 * contour s'aplatit au contact puis revient en tremblotant.
 *
 * Fonctions pures sur des données mutables par conception (boucle de
 * simulation à 60 i/s, sans allocation par image) ; le rendu est ailleurs.
 */

export const VERTICES = 28;

const SPRING = 170; // rappel radial de chaque point (fréquence du tremblé)
const DAMPING = 7; // amortissement du tremblé
const COUPLING = 55; // lissage entre points voisins
const DRAG = 0.55; // frottement du déplacement, par seconde
const DRIFT = 14; // force de dérive ambiante, px/s²
const MAX_SPEED = 150; // px/s, après une pichenette
const RESTITUTION = 0.85;
/** Les centres peuvent s'approcher sous la somme des rayons : les faces s'écrasent. */
const SQUISH = 0.9;
const BULGE = 0.55; // part du volume écrasé redistribuée sur le reste du contour

export type BlobShape = "circle" | "square";

export type Blob = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	shape: BlobShape;
	angle: number;
	spin: number;
	/** Déformation radiale de chaque point (px) et sa vitesse. */
	offsets: Float64Array;
	speeds: Float64Array;
	/** Phase de la dérive, pour que les formes ne bougent pas en bloc. */
	phase: number;
};

export type Field = { width: number; height: number };

export function createBlob(
	init: Pick<Blob, "x" | "y" | "radius" | "shape"> &
		Partial<Pick<Blob, "vx" | "vy" | "angle" | "spin" | "phase">>,
): Blob {
	return {
		vx: 0,
		vy: 0,
		angle: 0,
		spin: 0,
		phase: 0,
		...init,
		offsets: new Float64Array(VERTICES),
		speeds: new Float64Array(VERTICES),
	};
}

/** Rayon de repos dans la direction `theta` : cercle, ou carré arrondi (superellipse n = 4). */
export function restRadius(blob: Blob, theta: number): number {
	if (blob.shape === "circle") return blob.radius;
	const t = theta - blob.angle;
	const n = 4;
	const r =
		(Math.abs(Math.cos(t)) ** n + Math.abs(Math.sin(t)) ** n) ** (-1 / n);
	// Ramène l'aire du carré arrondi à peu près à celle du cercle de même rayon.
	return blob.radius * r * 0.9;
}

export const vertexAngle = (i: number) => (i / VERTICES) * Math.PI * 2;

/** Position d'un point du contour, déformation comprise. */
export function vertexPosition(
	blob: Blob,
	i: number,
): { x: number; y: number } {
	const theta = vertexAngle(i);
	const r = restRadius(blob, theta) + blob.offsets[i];
	return { x: blob.x + Math.cos(theta) * r, y: blob.y + Math.sin(theta) * r };
}

/** Ressorts du contour : chaque point revient à son rayon de repos, lissé par ses voisins. */
function stepContour(blob: Blob, dt: number) {
	const { offsets, speeds } = blob;
	for (let i = 0; i < VERTICES; i++) {
		const prev = offsets[(i + VERTICES - 1) % VERTICES];
		const next = offsets[(i + 1) % VERTICES];
		const force =
			-SPRING * offsets[i] -
			DAMPING * speeds[i] +
			COUPLING * (prev + next - 2 * offsets[i]);
		speeds[i] += force * dt;
	}
	for (let i = 0; i < VERTICES; i++) offsets[i] += speeds[i] * dt;
}

/** Écrase les points de `blob` entrés dans le cercle (cx, cy, r), et gonfle le reste. */
function squeeze(blob: Blob, cx: number, cy: number, r: number) {
	let crushed = 0;
	for (let i = 0; i < VERTICES; i++) {
		const p = vertexPosition(blob, i);
		const depth = r - Math.hypot(p.x - cx, p.y - cy);
		if (depth > 0) {
			const push = depth * 0.5;
			blob.offsets[i] -= push;
			blob.speeds[i] *= 0.6;
			crushed += push;
		}
	}
	if (crushed === 0) return;
	const bulge = (crushed * BULGE) / VERTICES;
	for (let i = 0; i < VERTICES; i++) blob.speeds[i] += bulge * 6;
}

/** Collision de deux formes : séparation, rebond élastique, puis écrasement des faces en contact. */
export function collide(a: Blob, b: Blob): boolean {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const dist = Math.hypot(dx, dy) || 0.0001;
	const reach = (a.radius + b.radius) * SQUISH;
	if (dist >= reach) return false;

	const nx = dx / dist;
	const ny = dy / dist;
	const overlap = reach - dist;
	const ma = a.radius * a.radius;
	const mb = b.radius * b.radius;
	const total = ma + mb;
	a.x -= nx * overlap * (mb / total);
	a.y -= ny * overlap * (mb / total);
	b.x += nx * overlap * (ma / total);
	b.y += ny * overlap * (ma / total);

	const closing = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
	if (closing > 0) {
		const impulse = ((1 + RESTITUTION) * closing) / total;
		a.vx -= impulse * mb * nx;
		a.vy -= impulse * mb * ny;
		b.vx += impulse * ma * nx;
		b.vy += impulse * ma * ny;
	}

	squeeze(a, b.x, b.y, b.radius * SQUISH);
	squeeze(b, a.x, a.y, a.radius * SQUISH);
	return true;
}

/** Rebond sur les bords : une forme peut dépasser d'un tiers de son rayon, comme un décor qui déborde. */
function bounceWalls(blob: Blob, field: Field) {
	const slack = blob.radius * 0.35;
	const minX = blob.radius - slack;
	const maxX = field.width - blob.radius + slack;
	const minY = blob.radius - slack;
	const maxY = field.height - blob.radius + slack;
	if (blob.x < minX) {
		blob.x = minX;
		blob.vx = Math.abs(blob.vx) * RESTITUTION;
	} else if (blob.x > maxX) {
		blob.x = maxX;
		blob.vx = -Math.abs(blob.vx) * RESTITUTION;
	}
	if (blob.y < minY) {
		blob.y = minY;
		blob.vy = Math.abs(blob.vy) * RESTITUTION;
	} else if (blob.y > maxY) {
		blob.y = maxY;
		blob.vy = -Math.abs(blob.vy) * RESTITUTION;
	}
}

export type Pointer = { x: number; y: number; active: boolean };

const POINTER_REACH = 150;
const POINTER_FORCE = 520;

/** Le pointeur écarte les formes proches et creuse leur contour. */
function repel(blob: Blob, pointer: Pointer, dt: number) {
	if (!pointer.active) return;
	const dx = blob.x - pointer.x;
	const dy = blob.y - pointer.y;
	const dist = Math.hypot(dx, dy) || 0.0001;
	const reach = blob.radius + POINTER_REACH;
	if (dist >= reach) return;
	const strength = (1 - dist / reach) * POINTER_FORCE * dt;
	blob.vx += (dx / dist) * strength;
	blob.vy += (dy / dist) * strength;
	squeeze(blob, pointer.x, pointer.y, 26);
}

/** Pichenette : impulsion radiale autour du point cliqué. */
export function poke(blobs: Blob[], x: number, y: number, reach = 240) {
	for (const blob of blobs) {
		const dx = blob.x - x;
		const dy = blob.y - y;
		const dist = Math.hypot(dx, dy) || 0.0001;
		if (dist >= reach + blob.radius) continue;
		const strength = 220 * (1 - dist / (reach + blob.radius));
		blob.vx += (dx / dist) * strength;
		blob.vy += (dy / dist) * strength;
		for (let i = 0; i < VERTICES; i++)
			blob.speeds[i] += (i % 2 ? 1 : -1) * strength * 0.6;
	}
}

/** Avance la simulation de `dt` secondes (à appeler avec un pas fixe court). */
export function step(
	blobs: Blob[],
	field: Field,
	pointer: Pointer,
	time: number,
	dt: number,
) {
	for (const blob of blobs) {
		// Dérive lente et différente pour chaque forme.
		blob.vx += Math.sin(time * 0.31 + blob.phase) * DRIFT * dt;
		blob.vy += Math.cos(time * 0.23 + blob.phase * 1.7) * DRIFT * dt;
		repel(blob, pointer, dt);

		const drag = Math.max(0, 1 - DRAG * dt);
		blob.vx *= drag;
		blob.vy *= drag;
		const speed = Math.hypot(blob.vx, blob.vy);
		if (speed > MAX_SPEED) {
			blob.vx *= MAX_SPEED / speed;
			blob.vy *= MAX_SPEED / speed;
		}
		blob.x += blob.vx * dt;
		blob.y += blob.vy * dt;
		blob.angle += blob.spin * dt;
		bounceWalls(blob, field);
	}
	for (let i = 0; i < blobs.length; i++) {
		for (let j = i + 1; j < blobs.length; j++) collide(blobs[i], blobs[j]);
	}
	for (const blob of blobs) stepContour(blob, dt);
}
