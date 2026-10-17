import { Link } from "@tanstack/react-router";
import { Container } from "@/components/site/section";
import { blogCategories } from "@/content/blog";
import { servicePoles } from "@/content/service-poles";
import { RSS_PATH } from "@/features/blog/feeds";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";

const colTitle =
	"mb-4 flex items-center gap-2 text-[0.9rem] font-semibold text-night-soft";
const link =
	"text-[0.95rem] text-night-ink/85 transition-colors hover:text-signal-glow";

/** Titre de colonne avec la pastille de couleur de la partie (comme l'interrupteur de la navbar). */
function AreaTitle({ label, dot }: { label: string; dot: string }) {
	return (
		<p className={colTitle}>
			<span aria-hidden="true" className={`size-2.5 rounded-full ${dot}`} />
			{label}
		</p>
	);
}

const portfolioPages = [
	{ to: "/", label: "Accueil", hash: undefined },
	{ to: "/services", label: "Services", hash: undefined },
	{ to: "/services", label: "Tarifs", hash: "offres" },
	{ to: "/realisations", label: "Réalisations", hash: undefined },
	{ to: "/souverainete", label: "Souveraineté & RGPD", hash: undefined },
	{ to: "/estimation", label: "Estimer mes ressources", hash: undefined },
	{ to: "/agences", label: "Agences", hash: undefined },
	{ to: "/a-propos", label: "À propos", hash: undefined },
	{ to: "/contact", label: "Contact", hash: undefined },
] as const;

export function SiteFooter() {
	return (
		<footer className="bg-night text-night-ink">
			<Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr]">
				<div>
					<p className="flex items-center gap-3 text-3xl font-semibold">
						<img
							src="/logo-96.webp"
							alt=""
							width={36}
							height={36}
							loading="lazy"
							className="size-9 shrink-0"
						/>
						<span>
							nikho<span className="text-signal-glow">.dev</span>
						</span>
					</p>
					<p className="mt-3 max-w-[34ch] text-[0.95rem] leading-relaxed text-night-soft">
						Ingénieur DevOps et fullstack freelance. Des applications fiables,
						hébergées en Europe, sous votre maîtrise. À distance, partout en
						France.
					</p>
					<a
						href={`mailto:${CONTACT_EMAIL}`}
						className="mt-5 inline-block text-[13px] text-signal-glow underline-offset-4 hover:underline"
					>
						{CONTACT_EMAIL}
					</a>
				</div>

				<nav aria-label="Blog">
					<AreaTitle label="Blog" dot="bg-highlight" />
					<ul className="grid gap-2.5">
						<li>
							<Link to="/blog" className={link}>
								Tous les articles
							</Link>
						</li>
						{blogCategories.map((c) => (
							<li key={c.slug}>
								<Link
									to="/blog/categorie/$category"
									params={{ category: c.slug }}
									className={link}
								>
									{c.name}
								</Link>
							</li>
						))}
						<li>
							<a href={RSS_PATH} className={link}>
								Flux RSS
							</a>
						</li>
					</ul>
				</nav>

				<nav aria-label="Portfolio">
					<AreaTitle label="Portfolio" dot="bg-signal" />
					<ul className="grid gap-2.5">
						{portfolioPages.map((p) => (
							<li key={p.label}>
								<Link to={p.to} hash={p.hash} className={link}>
									{p.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<nav aria-label="Services">
					<AreaTitle label="Services" dot="bg-signal-glow" />
					<ul className="grid gap-2.5">
						{servicePoles.map((p) => (
							<li key={p.id}>
								<Link to="/services" hash={p.id} className={link}>
									{p.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<nav aria-label="Liens externes">
					<p className={colTitle}>Profils</p>
					<ul className="grid gap-2.5">
						<li>
							<a href={SOCIAL_LINKS.github} className={link}>
								GitHub
							</a>
						</li>
						<li>
							<a href={SOCIAL_LINKS.linkedin} className={link}>
								LinkedIn
							</a>
						</li>
						<li>
							<a href={SOCIAL_LINKS.malt} className={link}>
								Malt
							</a>
						</li>
					</ul>
				</nav>
			</Container>
			<div className="border-t border-night-line">
				<Container className="flex flex-col gap-3 py-6 text-[13px] text-night-soft sm:flex-row sm:justify-between">
					<span>
						© {new Date().getFullYear()} Nicolas Sans · DevOps freelance
					</span>
					<span className="flex gap-6">
						<Link to="/mentions-legales" className="hover:text-night-ink">
							Mentions légales
						</Link>
						<Link to="/confidentialite" className="hover:text-night-ink">
							Confidentialité
						</Link>
					</span>
				</Container>
			</div>
		</footer>
	);
}
