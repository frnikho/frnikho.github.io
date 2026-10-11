export const PROJECT_TYPES = [
	"agence",
	"startup",
	"appli-ia",
	"autre",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
	agence: "Agence ou freelance (sous-traitance)",
	startup: "Startup ou petite entreprise",
	"appli-ia": "Application créée avec une IA (Lovable, Bolt…)",
	autre: "Autre",
};

export type ContactInput = {
	name: string;
	email: string;
	message: string;
	projectType: ProjectType;
	/** Honeypot : doit rester vide. */
	website?: string;
};

export type ContactData = Omit<ContactInput, "website">;

export type ValidationResult =
	| { ok: true; data: ContactData }
	| { ok: false; error: string; bot?: true };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINE_BREAK_RE = /[\r\n]/;

export function validateContact(input: ContactInput): ValidationResult {
	if (input.website?.trim()) return { ok: false, error: "bot", bot: true };

	const name = input.name.trim();
	const email = input.email.trim();
	const message = input.message.trim();

	if (name.length < 2 || name.length > 80 || LINE_BREAK_RE.test(name)) {
		return {
			ok: false,
			error: "Le nom doit contenir entre 2 et 80 caractères.",
		};
	}
	if (email.length > 254 || !EMAIL_RE.test(email)) {
		return { ok: false, error: "Adresse email invalide." };
	}
	if (message.length < 10 || message.length > 4000) {
		return {
			ok: false,
			error: "Le message doit contenir entre 10 et 4000 caractères.",
		};
	}
	if (!PROJECT_TYPES.includes(input.projectType)) {
		return { ok: false, error: "Type de projet invalide." };
	}
	return {
		ok: true,
		data: { name, email, message, projectType: input.projectType },
	};
}

type RateLimiterOptions = {
	max: number;
	windowMs: number;
	now?: () => number;
};

export function createRateLimiter({
	max,
	windowMs,
	now = Date.now,
}: RateLimiterOptions) {
	const hits = new Map<string, number[]>();
	return {
		allow(key: string): boolean {
			const t = now();
			const recent = (hits.get(key) ?? []).filter((h) => t - h < windowMs);
			if (recent.length >= max) {
				hits.set(key, recent);
				return false;
			}
			hits.set(key, [...recent, t]);
			return true;
		},
	};
}
