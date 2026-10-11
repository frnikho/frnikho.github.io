import { createFileRoute, redirect } from "@tanstack/react-router";

// Ancienne page : redirigée vers la section correspondante de l'accueil.
export const Route = createFileRoute("/feedback")({
	beforeLoad: () => {
		throw redirect({ to: "/a-propos", statusCode: 301 });
	},
});
