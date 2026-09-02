import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import {GridPaper} from "@/features/home/components/grid-paper";
import {Nav} from "@/features/home/components/nav";
import {Hero} from "@/features/home/components/hero";
import {Services} from "@/features/home/components/services";
import {Experience} from "@/features/home/components/experience";
import {Projects} from "@/features/home/components/projects";
import {Stack} from "@/features/home/components/stack";
import {FeedbackCarousel} from "@/features/home/components/feedback";
import {Contact} from "@/features/home/components/contact";
import {SiteFooter} from "@/features/home/components/site-footer";

export const Route = createFileRoute("/work")({
	head: () =>
		buildHead({
			title: "Parcours - Privio, Capgemini, Epitech | Nicolas Sans",
			description: "Redirection vers le parcours complet.",
			canonical: "/parcours",
			noindex: true,
		}),
	component: WorkRedirect,
});

function WorkRedirect() {
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
