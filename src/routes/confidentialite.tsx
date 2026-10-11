import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/legal-page";
import { buildHead } from "@/lib/seo";
import { CONTACT_EMAIL, LEGAL } from "@/lib/site";

export const Route = createFileRoute("/confidentialite")({
	head: () =>
		buildHead({
			title: "Politique de confidentialité | Nicolas Sans",
			description: "Politique de confidentialité du site nikho.dev.",
			canonical: "/confidentialite",
			noindex: true,
		}),
	component: Confidentialite,
});

function Confidentialite() {
	return (
		<LegalPage title="Politique de confidentialité">
			<section>
				<h2>Responsable du traitement</h2>
				<p>
					{LEGAL.name}, entrepreneur individuel, SIRET {LEGAL.siret},{" "}
					{LEGAL.address}. Contact :{" "}
					<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
				</p>
			</section>

			<section>
				<h2>Données collectées</h2>
				<ul>
					<li>
						<strong>Formulaire de contact :</strong> votre nom, votre adresse
						email, votre type de projet et le message que vous rédigez.
					</li>
					<li>
						<strong>Prise de rendez-vous :</strong> votre nom, votre adresse
						email et les informations que vous renseignez sur la page de
						réservation.
					</li>
					<li>
						<strong>Journaux techniques :</strong> votre adresse IP et des
						données de connexion, traitées par l'hébergeur et le service de
						protection du site (voir ci-dessous) pour assurer la sécurité et le
						bon fonctionnement du service.
					</li>
				</ul>
			</section>

			<section>
				<h2>Finalités et bases légales</h2>
				<p>
					Répondre à votre demande de contact, planifier un échange et, le cas
					échéant, établir un devis : mesures précontractuelles prises à votre
					demande. Assurer la sécurité du site et limiter les abus (votre
					adresse IP sert à limiter le nombre de messages envoyés, sans être
					conservée) : intérêt légitime.
				</p>
			</section>

			<section>
				<h2>Destinataires et sous-traitants</h2>
				<ul>
					<li>
						<strong>OVH SAS</strong> (France) : hébergement du site.
					</li>
					<li>
						<strong>Cloudflare, Inc.</strong> (États-Unis, trafic traité dans
						l'Union européenne lorsque c'est possible) : DNS, protection contre
						les attaques et acheminement du trafic. Il voit les adresses IP des
						visiteurs.
					</li>
					<li>
						<strong>Google (Gmail)</strong> (États-Unis) : les messages du
						formulaire de contact sont envoyés puis reçus via une messagerie
						Gmail. Ce transfert hors Union européenne s'appuie sur les garanties
						prévues par le RGPD (cadre de protection des données UE-États-Unis
						ou clauses contractuelles types).
					</li>
					<li>
						<strong>Prise de rendez-vous :</strong> assurée par une instance
						Cal.com que j'héberge moi-même (calendar.nikho.dev). Aucun service
						de réservation tiers n'est utilisé.
					</li>
				</ul>
				<p>
					Vos données ne sont ni vendues ni utilisées à des fins publicitaires.
				</p>
			</section>

			<section>
				<h2>Durée de conservation</h2>
				<p>
					Les échanges et rendez-vous sont conservés trois ans après le dernier
					contact, puis supprimés. Un échange qui aboutit à une prestation est
					conservé pendant la durée des obligations comptables et légales.
				</p>
			</section>

			<section>
				<h2>Vos droits</h2>
				<p>
					Vous disposez des droits d'accès, de rectification, d'effacement,
					d'opposition, de limitation et de portabilité. Pour les exercer,
					écrivez à <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Si
					vous estimez que vos droits ne sont pas respectés, vous pouvez saisir
					la CNIL (<a href="https://www.cnil.fr">cnil.fr</a>).
				</p>
			</section>

			<section>
				<h2>Cookies, polices et mesure d'audience</h2>
				<p>
					Ce site ne dépose aucun cookie. Il mesure sa fréquentation avec Umami,
					un outil libre hébergé sur l'infrastructure de l'éditeur, en Union
					européenne : sans cookie, sans identifiant persistant, sans
					recoupement avec d'autres sites et sans transmission à un tiers. Les
					données recueillies sont anonymes (pages consultées, pays, type
					d'appareil, clics sur les boutons de contact) et servent uniquement à
					des statistiques de fréquentation. Le signal « Do Not Track » de votre
					navigateur est respecté. Les polices de caractères sont hébergées sur
					le site lui-même : aucune requête n'est envoyée à Google Fonts ni à un
					autre service de polices.
				</p>
			</section>

			<p>Dernière mise à jour : {LEGAL.updatedAt}.</p>
		</LegalPage>
	);
}
