import { describe, expect, it } from "vitest";
import {
	createRateLimiter,
	validateContact,
} from "@/features/contact/validation";

const valid = {
	name: "Jeanne Martin",
	email: "jeanne@agence.fr",
	message: "Bonjour, je souhaite déployer une application.",
	projectType: "agence" as const,
	website: "",
};

describe("validateContact", () => {
	it("accepte une saisie valide et la normalise", () => {
		const r = validateContact({ ...valid, name: "  Jeanne Martin  " });
		expect(r.ok).toBe(true);
		if (r.ok) expect(r.data.name).toBe("Jeanne Martin");
	});

	it("refuse un nom trop court", () => {
		const r = validateContact({ ...valid, name: "J" });
		expect(r).toEqual({ ok: false, error: expect.stringContaining("nom") });
	});

	it("refuse un email invalide", () => {
		const r = validateContact({ ...valid, email: "pas-un-email" });
		expect(r).toEqual({ ok: false, error: expect.stringContaining("email") });
	});

	it("refuse un message trop court ou trop long", () => {
		expect(validateContact({ ...valid, message: "court" }).ok).toBe(false);
		expect(validateContact({ ...valid, message: "x".repeat(4001) }).ok).toBe(
			false,
		);
	});

	it("refuse un type de projet inconnu", () => {
		const r = validateContact({ ...valid, projectType: "inconnu" as never });
		expect(r.ok).toBe(false);
	});

	it("signale un robot quand le honeypot est rempli", () => {
		const r = validateContact({ ...valid, website: "http://spam" });
		expect(r).toEqual({ ok: false, error: "bot", bot: true });
	});

	it("refuse les retours à la ligne dans le nom (injection d'en-têtes)", () => {
		const r = validateContact({ ...valid, name: "Jean\nBcc: x@y.z" });
		expect(r.ok).toBe(false);
	});
});

describe("createRateLimiter", () => {
	it("bloque après le maximum de requêtes dans la fenêtre", () => {
		const now = 0;
		const limiter = createRateLimiter({
			max: 2,
			windowMs: 1000,
			now: () => now,
		});
		expect(limiter.allow("1.1.1.1")).toBe(true);
		expect(limiter.allow("1.1.1.1")).toBe(true);
		expect(limiter.allow("1.1.1.1")).toBe(false);
		expect(limiter.allow("2.2.2.2")).toBe(true);
	});

	it("libère après la fenêtre", () => {
		let now = 0;
		const limiter = createRateLimiter({
			max: 1,
			windowMs: 1000,
			now: () => now,
		});
		limiter.allow("a");
		expect(limiter.allow("a")).toBe(false);
		now = 1001;
		expect(limiter.allow("a")).toBe(true);
	});
});
