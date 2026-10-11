import { createServerFn } from "@tanstack/react-start";
import { type AnalyticsScript, buildAnalyticsScript } from "@/lib/analytics";

/** Lu à l'exécution : changer l'instance Umami ne demande pas de nouveau build. */
export const getAnalyticsScript = createServerFn({ method: "GET" }).handler(
	async (): Promise<AnalyticsScript | null> =>
		import.meta.env.DEV
			? null
			: buildAnalyticsScript({
					UMAMI_SCRIPT_URL: process.env.UMAMI_SCRIPT_URL,
					UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID,
				}),
);
