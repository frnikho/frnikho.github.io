import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	return createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		notFoundMode: "root",
		// Don't `throw redirect()` here - it throws a Response (307) inside
		// renderToReadableStream during SSR/prerender which React can't render.
		// TanStack Start only handles `redirect()` in loaders/beforeLoad.
		// For a static GH Pages site there is no server 307 anyway.
		// Alias map for GH Pages 404 fallback - real routes (/work etc.) are now
		// prerendered, but keep this for old links and hash-only URLs.
		defaultNotFoundComponent: () => {
			// Client-only redirect; during SSR just render nothing to avoid 307.
			if (typeof window !== "undefined") {
				const path = window.location.pathname.replace(/\/$/, "");
				const aliasMap: Record<string, string> = {
					"/work": "/parcours",
					"/projects": "/projets",
					"/feedback": "/recommandations",
				};
				if (aliasMap[path]) {
					window.location.replace(aliasMap[path]);
					return null;
				}
				window.location.replace("/");
			}
			return null;
		},
	});
}

export const getRouter = createRouter;

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
