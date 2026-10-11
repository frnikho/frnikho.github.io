import { Link } from "@tanstack/react-router";
import { Container } from "@/components/site/section";
import { serviceFamilies } from "@/content/services";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";

const colTitle = "eyebrow mb-4 !text-night-soft";
const link =
	"text-[0.95rem] text-night-ink/85 transition-colors hover:text-signal";

export function SiteFooter() {
	return (
		<footer className="bg-night text-night-ink">
			<Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
				<div>
					<p className=" text-3xl font-semibold">
						nikho<span className="text-signal">.dev</span>
					</p>
					<p className="mt-3 max-w-[34ch] text-[0.95rem] leading-relaxed text-night-soft">
						Ingénieur DevOps freelance. Infrastructure fiable, hébergement
						européen, données souveraines. À distance, sur toute la France.
					</p>
					<a
						href={`mailto:${CONTACT_EMAIL}`}
						className="mt-5 inline-block text-[13px] text-signal underline-offset-4 hover:underline"
					>
						{CONTACT_EMAIL}
					</a>
				</div>

				<nav aria-label="Services">
					<p className={colTitle}>Services</p>
					<ul className="grid gap-2.5">
						{serviceFamilies.slice(0, 6).map((f) => (
							<li key={f.slug}>
								<Link
									to="/services/$slug"
									params={{ slug: f.slug }}
									className={link}
								>
									{f.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<nav aria-label="Site">
					<p className={colTitle}>Site</p>
					<ul className="grid gap-2.5">
						<li>
							<Link to="/souverainete" className={link}>
								Souveraineté & RGPD
							</Link>
						</li>
						<li>
							<Link to="/realisations" className={link}>
								Réalisations
							</Link>
						</li>
						<li>
							<Link to="/agences" className={link}>
								Agences
							</Link>
						</li>
						<li>
							<Link to="/a-propos" className={link}>
								À propos
							</Link>
						</li>
						<li>
							<Link to="/contact" className={link}>
								Contact
							</Link>
						</li>
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
