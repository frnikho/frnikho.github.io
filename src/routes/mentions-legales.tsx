import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";
import { buildHead } from "@/lib/seo";
import { CONTACT_EMAIL, LEGAL } from "@/lib/site";

export const Route = createFileRoute("/mentions-legales")({
	head: () =>
		buildHead({
			title: "Mentions légales | Nicolas Sans",
			description: "Mentions légales du site nikho.dev.",
			canonical: "/mentions-legales",
			noindex: true,
		}),
	component: MentionsLegales,
});

function MentionsLegales() {
	return (
		<LegalPage title="Mentions légales">
			<section>
				<h2>Éditeur du site</h2>
				<p>
					{LEGAL.name}, {LEGAL.status}.
					<br />
					SIRET : {LEGAL.siret}
					<br />
					Adresse : {LEGAL.address}
					<br />
					{LEGAL.vatNote}.
					<br />
					Contact : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
				</p>
			</section>
			<section>
				<h2>Directeur de la publication</h2>
				<p>{LEGAL.name}.</p>
			</section>
			<section>
				<h2>Hébergement du site</h2>
				<p>
					{LEGAL.host}. Le trafic du site transite par Cloudflare, Inc. (DNS et
					protection contre les attaques).
				</p>
			</section>
			<section>
				<h2>Propriété intellectuelle</h2>
				<p>
					Les textes, visuels et le code de ce site sont la propriété de
					l'éditeur, sauf mention contraire. Toute reproduction sans accord
					préalable est interdite.
				</p>
			</section>
			<section>
				<h2>Données personnelles</h2>
				<p>
					Voir la <a href="/confidentialite">politique de confidentialité</a>.
				</p>
			</section>
			<p>Dernière mise à jour : {LEGAL.updatedAt}.</p>
		</LegalPage>
	);
}
