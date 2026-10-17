import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { NotFound } from "@/components/site/not-found";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	return createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		notFoundMode: "root",
		defaultNotFoundComponent: NotFound,
	});
}

export const getRouter = createRouter;

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
