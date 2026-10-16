/**
 * Point sur un cercle, arrondi au centième. `Math.sin`/`Math.cos` ne donnent
 * pas le même dernier chiffre selon le moteur JavaScript (Bun côté serveur,
 * V8 dans Chrome) : sans arrondi, les attributs SVG rendus au serveur ne
 * correspondent pas à ceux du client et l'hydratation échoue.
 */
export function polarPoint(
	radians: number,
	radius: number,
): { x: number; y: number } {
	const round = (n: number) => Math.round(n * 100) / 100;
	return {
		x: round(Math.cos(radians) * radius),
		y: round(Math.sin(radians) * radius),
	};
}
