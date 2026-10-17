import { Link } from "@tanstack/react-router";
import { Glyph } from "@/components/services/glyph";
import { RouteButton } from "@/components/site/button";
import { Decor } from "@/components/site/decor";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Container } from "@/components/site/section";

const SHORTCUTS = [
	{ to: "/services", label: "Services", icon: "layers" },
	{ to: "/realisations", label: "Réalisations", icon: "check" },
	{ to: "/blog", label: "Blog", icon: "file" },
	{ to: "/contact", label: "Contact", icon: "users" },
] as const;

/** Page introuvable : servie avec un statut 404 et des raccourcis utiles. */
export function NotFound() {
	return (
		<PageShell>
			<section className="under-nav relative overflow-clip">
				<Decor variant="hero" />
				<Container className="py-20 lg:py-28">
					<p className="eyebrow">Erreur 404</p>
					<h1 className="mt-5 max-w-[20ch] text-[clamp(2.3rem,1.4rem+3.6vw,4.2rem)] leading-[1.02]">
						Cette page <Accent>n'existe pas.</Accent>
					</h1>
					<p className="mt-6 max-w-[52ch] text-[1.1rem] text-ink-soft">
						Le lien est peut-être ancien ou incomplet. Ces pages devraient vous
						remettre sur la bonne voie.
					</p>
					<ul className="mt-10 flex flex-wrap gap-2.5">
						{SHORTCUTS.map((s) => (
							<li key={s.to}>
								<Link
									to={s.to}
									className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 font-semibold backdrop-blur transition-colors hover:border-signal/50 hover:text-signal-deep"
								>
									<Glyph name={s.icon} className="size-4 text-signal" />
									{s.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="mt-10">
						<RouteButton to="/">Retour à l'accueil</RouteButton>
					</div>
				</Container>
			</section>
		</PageShell>
	);
}
