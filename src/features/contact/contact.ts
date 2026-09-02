import { createServerFn } from "@tanstack/react-start";

type ContactInput = {
	name: string;
	email: string;
	message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContact = createServerFn({ method: "POST" })
	.validator((data: ContactInput) => data)
	.handler(async ({ data }) => {
		const name = data.name.trim();
		const email = data.email.trim();
		const message = data.message.trim();

		if (name.length < 2 || name.length > 80) {
			throw new Error(
				"VALIDATION_ERROR: Le nom doit contenir entre 2 et 80 caractères.",
			);
		}
		if (!EMAIL_RE.test(email)) {
			throw new Error("VALIDATION_ERROR: Adresse email invalide.");
		}
		if (message.length < 10 || message.length > 4000) {
			throw new Error(
				"VALIDATION_ERROR: Le message doit contenir entre 10 et 4000 caractères.",
			);
		}

		const payload = {
			name,
			email,
			message,
			at: new Date().toISOString(),
		};

		// TODO rate-limit if abused
		console.info("[contact:submit]", JSON.stringify(payload));

		return { ok: true as const };
	});
