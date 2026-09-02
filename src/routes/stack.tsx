import { createFileRoute } from "@tanstack/react-router";
import { GridPaper } from "@/features/home/components/grid-paper";
import { Nav } from "@/features/home/components/nav";
import { SiteFooter } from "@/features/home/components/site-footer";
import { Stack } from "@/features/home/components/stack";
import { buildHead } from "@/lib/seo";
import {Hero} from "@/features/home/components/hero";
import {Services} from "@/features/home/components/services";
import {Experience} from "@/features/home/components/experience";
import {Projects} from "@/features/home/components/projects";
import {FeedbackCarousel} from "@/features/home/components/feedback";
import {Contact} from "@/features/home/components/contact";

export const Route = createFileRoute("/stack")({
	head: () =>
		buildHead({
			title: "Stack - React, Rust, K8s, Salesforce | Nicolas Sans",
			description:
				"Stack TypeScript, React, Rust, NestJS, Kubernetes, Docker & Terraform. Apps scalables opérées en prod pour 300 000 utilisateurs, de l'API au cluster.",
			canonical: "/stack",
		}),
	component: StackPage,
});

function StackPage() {
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
