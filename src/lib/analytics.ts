import { SITE_URL } from "@/lib/seo";

export type AnalyticsScript = {
	src: string;
	websiteId: string;
	/** Domaines autorisés à envoyer des mesures (évite le bruit du local et des aperçus). */
	domains: string;
	respectDoNotTrack: boolean;
};

type AnalyticsEnv = Partial<
	Record<"UMAMI_SCRIPT_URL" | "UMAMI_WEBSITE_ID", string | undefined>
>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isHttpsUrl = (value: string) => {
	try {
		return new URL(value).protocol === "https:";
	} catch {
		return false;
	}
};

/**
 * Balise Umami à injecter, ou `null` tant que la mesure d'audience n'est pas
 * configurée. La configuration vient de l'environnement, jamais du code.
 */
export function buildAnalyticsScript(
	env: AnalyticsEnv,
): AnalyticsScript | null {
	const src = env.UMAMI_SCRIPT_URL?.trim();
	const websiteId = env.UMAMI_WEBSITE_ID?.trim();
	if (!src || !websiteId) return null;
	if (!isHttpsUrl(src) || !UUID.test(websiteId)) return null;
	return {
		src,
		websiteId,
		domains: new URL(SITE_URL).hostname,
		respectDoNotTrack: true,
	};
}

type UmamiWindow = Window & {
	umami?: { track: (name: string, data?: Record<string, unknown>) => void };
};

/** Événement de conversion ; sans effet si la mesure d'audience est absente. */
export function trackEvent(name: string, data?: Record<string, unknown>) {
	if (typeof window === "undefined") return;
	(window as UmamiWindow).umami?.track(name, data);
}
