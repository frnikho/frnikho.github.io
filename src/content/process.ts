export type Step = { title: string; desc: string };

export const steps: Step[] = [
	{
		title: "Échange",
		desc: "Appel de cadrage gratuit de 30 minutes pour comprendre votre application et vos contraintes. Un devis ferme vous est remis.",
	},
	{
		title: "Accès",
		desc: "Vous provisionnez le serveur sur votre compte chez l'hébergeur et ouvrez un accès restreint. L'infrastructure reste la vôtre ; cet accès est révocable à tout moment.",
	},
	{
		title: "Installation",
		desc: "Durcissement du serveur, mise en ligne de l'application, configuration du HTTPS, des sauvegardes et des alertes.",
	},
	{
		title: "Vérification",
		desc: "Le déploiement, les alertes et la restauration d'une sauvegarde sont testés. Le résultat vous est présenté avant la livraison.",
	},
	{
		title: "Passation",
		desc: "Remise de la documentation et session d'explication. Vous exploitez ensuite en autonomie, ou me confiez la maintenance.",
	},
];
