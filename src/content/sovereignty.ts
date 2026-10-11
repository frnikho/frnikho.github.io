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
