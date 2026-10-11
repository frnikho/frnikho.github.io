import { createFileRoute, redirect } from "@tanstack/react-router";

// Ancienne page : redirigée vers la section correspondante de l'accueil.
export const Route = createFileRoute("/projets")({
	beforeLoad: () => {
		throw redirect({ to: "/realisations", statusCode: 301 });
	},
});
