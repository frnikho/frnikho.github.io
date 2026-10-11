import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { sendContactEmail } from "@/features/contact/mailer.server";
import {
	type ContactInput,
	createRateLimiter,
	validateContact,
} from "@/features/contact/validation";

const limiter = createRateLimiter({ max: 3, windowMs: 10 * 60 * 1000 });

function clientKey(): string {
	const forwarded = getRequestHeader("x-forwarded-for");
	return forwarded?.split(",")[0]?.trim() || "unknown";
}

export const submitContact = createServerFn({ method: "POST" })
	.inputValidator((data: ContactInput) => data)
	.handler(async ({ data }) => {
		const result = validateContact(data);
		if (!result.ok) {
			// Robot : on répond comme un succès pour ne rien lui apprendre.
			if (result.bot) return { ok: true as const };
			throw new Error(`VALIDATION_ERROR: ${result.error}`);
		}
		if (!limiter.allow(clientKey())) {
			throw new Error(
				"VALIDATION_ERROR: Trop de messages envoyés. Réessayez dans quelques minutes.",
			);
		}
		try {
			await sendContactEmail(result.data);
		} catch (err) {
			console.error("[contact:send-failed]", err);
			throw new Error(
				"Envoi impossible pour le moment. Écrivez-moi directement par email.",
			);
		}
		return { ok: true as const };
	});
