import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/features/home/components/contact";
import { Experience } from "@/features/home/components/experience";
import { FeedbackCarousel } from "@/features/home/components/feedback";
import { GridPaper } from "@/features/home/components/grid-paper";
import { Hero } from "@/features/home/components/hero";
import { Nav } from "@/features/home/components/nav";
import { Projects } from "@/features/home/components/projects";
import { Services } from "@/features/home/components/services";
import { SiteFooter } from "@/features/home/components/site-footer";
import { Stack } from "@/features/home/components/stack";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/parcours")({
	head: () =>
		buildHead({
			title: "Parcours - Privio, Capgemini, Epitech | Nicolas Sans",
			description:
				"5 ans d'expérience, RNCP 35075 Epitech. De Capgemini à Privio : fullstack, DevOps et Salesforce - timeline complète des rôles, missions et compétences.",
			canonical: "/parcours",
		}),
	component: ParcoursPage,
});

function ParcoursPage() {
	return (
		<div className="bg-surface text-primary selection:bg-accent selection:text-white antialiased">
			<GridPaper>
				<Nav />
				<Hero />
			</GridPaper>
			<Services />
			<Experience />
			<Projects />
			<Stack />
			<FeedbackCarousel />
			<GridPaper>
				<Contact />
			</GridPaper>
			<SiteFooter />
		</div>
	);
}
