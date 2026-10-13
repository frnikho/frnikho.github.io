import { describe, expect, it } from "vitest";
import { buildCsp, securityHeaders } from "./security-headers";

describe("buildCsp", () => {
	it("interdit les iframes, les plugins et le détournement de base/formulaires", () => {
		const csp = buildCsp();
		expect(csp).toContain("default-src 'self'");
		expect(csp).toContain("frame-ancestors 'none'");
		expect(csp).toContain("object-src 'none'");
		expect(csp).toContain("base-uri 'self'");
		expect(csp).toContain("form-action 'self'");
	});

	it("autorise uniquement l'origine Umami pour le script et les mesures", () => {
		const csp = buildCsp("https://stats.nikho.dev");
		expect(csp).toMatch(/script-src [^;]*https:\/\/stats\.nikho\.dev/);
		expect(csp).toMatch(/connect-src [^;]*https:\/\/stats\.nikho\.dev/);
	});

	it("n'ouvre aucune origine tierce sans mesure d'audience", () => {
		expect(buildCsp()).not.toContain("https://stats");
	});
});

describe("securityHeaders", () => {
	it("pose les en-têtes de durcissement attendus", () => {
		const headers = securityHeaders("https://stats.nikho.dev");
		expect(headers["X-Content-Type-Options"]).toBe("nosniff");
		expect(headers["X-Frame-Options"]).toBe("DENY");
		expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
		expect(headers["Permissions-Policy"]).toContain("camera=()");
		expect(headers["Content-Security-Policy"]).toContain("default-src 'self'");
	});
});
