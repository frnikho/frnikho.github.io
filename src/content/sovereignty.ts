export type Pillar = { title: string; desc: string };

export const sovereigntyPillars: Pillar[] = [
	{
		title: "Hébergement dans l'Union européenne",
		desc: "Serveurs chez Scaleway, OVHcloud ou Hetzner, sauvegardes comprises. Aucune donnée ne quitte l'Union européenne.",
	},
	{
		title: "Exposition limitée au Cloud Act",
		desc: "Fournisseurs de droit européen, dont les sociétés mères ne relèvent pas du droit américain : l'exposition aux accès extraterritoriaux est limitée.",
	},
	{
		title: "Propriété et réversibilité",
		desc: "Comptes et serveurs ouverts à votre nom. Accès du prestataire restreints, journalisés et révocables à tout moment.",
	},
	{
		title: "Chiffrement et gestion des secrets",
		desc: "Sauvegardes chiffrées, secrets jamais stockés en clair dans un dépôt, authentification par clé plutôt que par mot de passe.",
	},
	{
		title: "Briques libres et auto-hébergées",
		desc: "Analytique (Plausible, Umami), stockage (Nextcloud), gestion des mots de passe (Vaultwarden) : aucun transit de vos données par un tiers.",
	},
	{
		title: "Traçabilité et registre des traitements",
		desc: "Journaux, localisation des données et liste des sous-traitants documentés, pour alimenter votre registre des traitements.",
	},
];

export const sovereigntyNote =
	"Accompagnement sur les aspects techniques de la conformité RGPD. Aucun conseil juridique n'est fourni : la qualification de vos traitements relève de votre DPO ou d'un juriste.";

/**
 * Transparence sur l'infrastructure de ce site : hébergé en France, mais le
 * DNS et la protection passent par Cloudflare (choix technique assumé).
 */
export const siteTransparency =
	"Ce site est hébergé chez OVHcloud en France ; les messages et rendez-vous sont traités et stockés sur mes propres serveurs, en France. Le DNS et la protection contre les attaques passent en revanche par Cloudflare, société américaine, qui voit transiter le trafic : un choix technique assumé (validation des certificats par DNS, serveur de mail auto-hébergé). C'est l'arbitrage que je vous propose aussi : la souveraineté se décide brique par brique, en connaissance de cause.";
