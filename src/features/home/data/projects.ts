import type { Project } from "@/features/home/types";

export const projects: Project[] = [
	{
		title: "Everyloc",
		desc: "Location événementielle à Angers : Next.js + Docker, SEO et perf au service de la conversion",
		img: "/projects/everyloc.png",
		href: "https://www.angers-location.fr",
		stack: ["Next.js", "Docker"],
	},
	{
		title: "Trip Planner",
		desc: "Planif de voyages : itinéraires, budgets et collab en temps réel",
		img: "/projects/trip_planner.png",
		stack: ["NestJS", "React", "Docker"],
	},
	{
		title: "FBX CLI",
		desc: "CLI Rust pour piloter sa Freebox depuis le terminal - rapide, typé, scriptable",
		img: "/projects/fbx-cli.png",
		stack: ["Rust", "CLI"],
	},
	{
		title: "PLD Lab",
		desc: "Génération de docs de suivi projet : NestJS + React, déployé sur K8s avec ArgoCD",
		img: "/projects/pld_1.png",
		stack: ["NestJS", "React", "Docker", "Kubernetes", "ArgoCD"],
	},
];
