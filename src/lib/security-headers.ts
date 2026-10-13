/** Origine du script et de la collecte Umami (voir UMAMI_SCRIPT_URL). */
export const ANALYTICS_ORIGIN = "https://stats.nikho.dev";

/**
 * Politique de contenu. `'unsafe-inline'` reste nécessaire côté scripts : le
 * rendu serveur de TanStack Start injecte son état d'hydratation en ligne. Les
 * autres directives (frames, plugins, base, formulaires, origines tierces)
 * restent strictes.
 */
export function buildCsp(analyticsOrigin?: string): string {
	const analytics = analyticsOrigin ? ` ${analyticsOrigin}` : "";
	return [
		"default-src 'self'",
		`script-src 'self' 'unsafe-inline'${analytics}`,
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' data:",
		"font-src 'self' data:",
		`connect-src 'self'${analytics}`,
		"frame-ancestors 'none'",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"upgrade-insecure-requests",
	].join("; ");
}

export function securityHeaders(
	analyticsOrigin?: string,
): Record<string, string> {
	return {
		"Content-Security-Policy": buildCsp(analyticsOrigin),
		"X-Content-Type-Options": "nosniff",
		"X-Frame-Options": "DENY",
		"Referrer-Policy": "strict-origin-when-cross-origin",
		"Permissions-Policy":
			"camera=(), microphone=(), geolocation=(), payment=(), usb=()",
		"Cross-Origin-Opener-Policy": "same-origin",
	};
}
