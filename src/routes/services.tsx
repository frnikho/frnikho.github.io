import { createFileRoute } from "@tanstack/react-router";
import { GridPaper } from "@/features/home/components/grid-paper";
import { Nav } from "@/features/home/components/nav";
import { Services } from "@/features/home/components/services";
import { SiteFooter } from "@/features/home/components/site-footer";
import { buildHead, SITE_URL } from "@/lib/seo";
import {Hero} from "@/features/home/components/hero";
import {Experience} from "@/features/home/components/experience";
import {Projects} from "@/features/home/components/projects";
import {Stack} from "@/features/home/components/stack";
import {FeedbackCarousel} from "@/features/home/components/feedback";
import {Contact} from "@/features/home/components/contact";

export const Route = createFileRoute("/services")({
	head: () =>
		buildHead({
			title:
				"Services - Web & Apps, Mobile, DevOps, IoT, Salesforce | Nicolas Sans",
			description:
				"Services web & mobile, DevOps & Kubernetes, IoT embarqué et Salesforce. Architecture DDD, performance, sécurité et scalabilité - de la conception à la prod.",
			canonical: "/services",
		}),
	component: ServicesPage,
});

function ServicesPage() {
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
