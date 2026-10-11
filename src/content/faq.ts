export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
	{
		q: "Qui est propriétaire de l'infrastructure ?",
		a: "Vous. Le serveur est provisionné sur votre compte chez l'hébergeur, que vous réglez directement. J'interviens avec un accès délégué, révocable à tout moment, et la documentation remise vous permet de reprendre la main ou de changer de prestataire.",
	},
	{
		q: "Où sont hébergées les données, et qu'en est-il du RGPD ?",
		a: "En France ou dans l'Union européenne, chez l'hébergeur de votre choix (Scaleway, OVHcloud, Hetzner…), sauvegardes comprises. Les accès sont limités, traçables et révocables. J'accompagne les aspects techniques de la conformité (localisation, chiffrement, journalisation, sous-traitants) ; je ne fournis pas de conseil juridique.",
	},
	{
		q: "Pourquoi privilégier un hébergeur européen ?",
		a: "Un fournisseur soumis au droit américain (Cloud Act) peut être contraint de communiquer des données, y compris hébergées en Europe. Un hébergeur européen limite fortement cette exposition et simplifie l'analyse de conformité. Certains cas justifient néanmoins un service américain : ils sont étudiés au cas par cas.",
	},
	{
		q: "Travaillez-vous à distance ?",
		a: "Oui, intégralement et sur toute la France. Les échanges se font en visioconférence et les interventions par accès distants sécurisés ; aucun déplacement n'est nécessaire.",
	},
	{
		q: "Quel est le coût de l'hébergement, en sus de la prestation ?",
		a: "Les frais d'hébergement sont réglés directement par vos soins à l'hébergeur et dépendent du dimensionnement du serveur. Une estimation est fournie dès le premier échange, avant tout engagement.",
	},
	{
		q: "Quels sont vos délais d'intervention ?",
		a: "Toute demande reçoit une réponse sous 24 h ouvrées. Les forfaits standards n'incluent pas de garantie de disponibilité 24h/24 ; un cadre d'astreinte peut être étudié sur devis.",
	},
	{
		q: "Quel est le périmètre exclu ?",
		a: "Le développement applicatif, la correction de bugs applicatifs et le support des utilisateurs finaux. Le périmètre couvre l'infrastructure : serveur, déploiement, sécurité, sauvegardes. L'hébergement, les noms de domaine et les services tiers restent à votre charge.",
	},
	{
		q: "Une application générée par IA (Lovable, Bolt…) peut-elle être mise en production ?",
		a: "Oui, c'est un cas fréquent. Le code fait d'abord l'objet d'une revue (secrets, accès aux données, dépendances), puis il est déployé avec sauvegardes et HTTPS. Si des correctifs applicatifs sont nécessaires, ils sont signalés avant le démarrage.",
	},
	{
		q: "Comment fonctionne la sous-traitance pour une agence ?",
		a: "Intégration à votre organisation : vos clients restent les vôtres, l'intervention peut se faire sous votre marque, et vous facturez selon vos propres conditions.",
	},
];
