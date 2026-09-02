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

export const Route = createFileRoute("/projects")({
	head: () =>
		buildHead({
			title: "Projets - Everyloc, Trip Planner, FBX CLI | Nicolas Sans",
			description: "Redirection vers les projets.",
			canonical: "/projets",
			noindex: true,
		}),
	component: ProjectsRedirect,
});

function ProjectsRedirect() {
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
