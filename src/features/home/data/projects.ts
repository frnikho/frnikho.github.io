import type { Project } from "@/features/home/types";

export const projects: Project[] = [
	{
		title: "Everyloc",
		desc: "Plateforme de location événementielle - Angers & alentours. Next.js + Docker.",
		img: "/projects/everyloc.png",
		href: "https://www.angers-location.fr",
		stack: ["Next.js", "Docker"],
	},
	{
		title: "Trip Planner",
		desc: "Planification de voyages",
		img: "/projects/trip_planner.png",
		stack: ["NestJS", "React", "Docker"],
	},
	{
		title: "FBX CLI",
		desc: "CLI Freebox en Rust",
		img: "/projects/fbx-cli.png",
		stack: ["Rust", "CLI"],
	},
	{
		title: "PLD Lab",
		desc: "Solution web de gestion et de génération de document de suivi de projet.",
		img: "/projects/pld_1.png",
		stack: ["NestJS", "React", "Docker", "Kubernetes", "ArgoCD"],
	},
];
