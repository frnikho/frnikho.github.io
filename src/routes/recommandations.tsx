import { createFileRoute } from "@tanstack/react-router";
import { FeedbackCarousel } from "@/features/home/components/feedback";
import { GridPaper } from "@/features/home/components/grid-paper";
import { Nav } from "@/features/home/components/nav";
import { SiteFooter } from "@/features/home/components/site-footer";
import { breadcrumbsJsonLd } from "@/lib/jsonld";
import { buildHead, SITE_URL } from "@/lib/seo";
import {Hero} from "@/features/home/components/hero";
import {Services} from "@/features/home/components/services";
import {Experience} from "@/features/home/components/experience";
import {Projects} from "@/features/home/components/projects";
import {Stack} from "@/features/home/components/stack";
import {Contact} from "@/features/home/components/contact";

export const Route = createFileRoute("/recommandations")({
	head: () =>
		buildHead({
			title: "Recommandations clients & pairs | Nicolas Sans",
			description:
				"Recommandations de fondateurs et développeurs avec qui j'ai collaboré. Retours authentiques sur la rigueur, la réactivité et la qualité de livraison.",
			canonical: "/recommandations",
		}),
	component: RecommandationsPage,
});

function RecommandationsPage() {
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
