import { createFileRoute, redirect } from "@tanstack/react-router";

// Ancienne page : redirigée vers la section correspondante de l'accueil.
export const Route = createFileRoute("/stack")({
	beforeLoad: () => {
		throw redirect({ to: "/services", statusCode: 301 });
	},
});
