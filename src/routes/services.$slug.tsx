import { createFileRoute, redirect } from "@tanstack/react-router";
import { familyHash } from "@/content/services";

/** Anciennes pages de détail : le détail est désormais dépliable sur /services. */
export const Route = createFileRoute("/services/$slug")({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/services",
			hash: familyHash(params.slug),
			statusCode: 301,
		});
	},
});
