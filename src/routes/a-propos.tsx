import { createFileRoute } from "@tanstack/react-router";
import { FinalCta } from "@/components/site/final-cta";
import { PageShell } from "@/components/site/page-shell";
import {
	Accent,
	Container,
	Section,
	SectionHead,
} from "@/components/site/section";
import { career, credentials } from "@/content/profile";
import { personJsonLd } from "@/lib/jsonld";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/a-propos")({
	head: () =>
		buildHead({
			title: "À propos : Nicolas Sans, ingénieur DevOps freelance",
			description:
				"Parcours, méthode et valeurs de Nicolas Sans, ingénieur DevOps freelance : 5 ans d'expérience en production, Kubernetes, RNCP 35075, à distance partout en France.",
			canonical: "/a-propos",
		}),
	component: AboutPage,
});

const principles = [
	{
		title: "Sobriété avant tout",
		text: "Le meilleur système est celui que votre équipe comprend. L'outil le plus sobre répondant au besoin est privilégié.",
	},
	{
		title: "Documenté",
		text: "Chaque élément déployé est documenté. Vous pouvez reprendre la main, ou changer de prestataire, en toute autonomie.",
	},
	{
		title: "Réversible et vérifié",
		text: "Chaque changement est réversible, chaque sauvegarde est restaurée au moins une fois, chaque port exposé est contrôlé depuis l'extérieur.",
	},
];

function AboutPage() {
	return (
		<PageShell>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
			/>
			<section className=" border-b border-line">
				<Container className="grid items-center gap-12 py-16 lg:grid-cols-[1fr_0.7fr] lg:py-24">
					<div>
						<p className="eyebrow">À propos</p>
						<h1 className="mt-5 text-[clamp(2.4rem,1.4rem+4vw,4.6rem)] leading-[1] font-semibold">
							Nicolas Sans, <Accent>ingénieur DevOps.</Accent>
						</h1>
						<p className="mt-7 max-w-[60ch] text-[1.12rem] leading-relaxed text-ink-soft">
							Mon parcours part de l'administration systèmes et réseaux, puis du
							développement, pour se spécialiser à leur jonction :
							l'exploitation fiable d'applications. J'exploite aujourd'hui un
							cluster Kubernetes en production et applique cette rigueur à des
							projets de toute taille.
						</p>
						<ul className="mt-8 flex flex-wrap gap-2">
							{credentials.map((c) => (
								<li
									key={c}
									className="border border-line px-3 py-1.5 text-[13px]"
								>
									{c}
								</li>
							))}
						</ul>
					</div>
					<figure className="relative mx-auto w-full max-w-[22rem]">
						<div
							aria-hidden="true"
							className="absolute -top-3 -right-3 h-full w-full border border-ink/30"
						/>
						<picture>
							<source srcSet="/portrait.webp" type="image/webp" />
							<img
								src="/portrait.jpg"
								alt="Nicolas Sans"
								width={960}
								height={1063}
								loading="lazy"
								className="aspect-[4/4.6] w-full rounded-2xl object-cover object-[50%_20%]"
							/>
						</picture>
					</figure>
				</Container>
			</section>

			<Section labelledBy="principes-title">
				<SectionHead
					index="01"
					kicker="Méthode"
					titleId="principes-title"
					title={
						<>
							Trois principes <Accent>de conduite.</Accent>
						</>
					}
				/>
				<div className="mt-14 grid gap-5 lg:grid-cols-3">
					{principles.map((p) => (
						<div key={p.title} className="surface p-8">
							<h3 className="text-[1.4rem] leading-snug font-semibold">
								{p.title}
							</h3>
							<p className="mt-3 text-ink-soft">{p.text}</p>
						</div>
					))}
				</div>
			</Section>

			<Section tone="alt" labelledBy="parcours-title">
				<SectionHead
					index="02"
					kicker="Parcours"
					titleId="parcours-title"
					title="Du réseau à Kubernetes"
				/>
				<ol className="mt-14 border-t border-line">
					{career.map((c) => (
						<li
							key={c.title + c.period}
							className="grid gap-2 border-b border-line py-7 lg:grid-cols-[200px_1fr_1.2fr] lg:gap-10"
						>
							<span className="tabular text-[13px] text-signal-deep">
								{c.period}
							</span>
							<div>
								<h3 className="text-[1.3rem] leading-snug font-semibold">
									{c.title}
								</h3>
								<p className=" text-[13px] text-ink-soft">{c.company}</p>
							</div>
							<p className="text-ink-soft">{c.desc}</p>
						</li>
					))}
				</ol>
			</Section>
			<FinalCta />
		</PageShell>
	);
}
