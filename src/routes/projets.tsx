import { createFileRoute } from "@tanstack/react-router";
import { GridPaper } from "@/features/home/components/grid-paper";
import { Nav } from "@/features/home/components/nav";
import { Projects } from "@/features/home/components/projects";
import { SiteFooter } from "@/features/home/components/site-footer";
import { breadcrumbsJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { buildHead, SITE_URL } from "@/lib/seo";
import {Hero} from "@/features/home/components/hero";
import {Services} from "@/features/home/components/services";
import {Experience} from "@/features/home/components/experience";
import {Stack} from "@/features/home/components/stack";
import {FeedbackCarousel} from "@/features/home/components/feedback";
import {Contact} from "@/features/home/components/contact";

export const Route = createFileRoute("/projets")({
	head: () =>
		buildHead({
			title: "Projets - Everyloc, Trip Planner, FBX CLI | Nicolas Sans",
			description:
				"Sélection de projets : Everyloc (Next.js), Trip Planner (React/NestJS) et FBX CLI (Rust). Stack moderne, CI/CD, Docker & Kubernetes en production.",
			canonical: "/projets",
		}),
	component: ProjetsPage,
});

function ProjetsPage() {
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
