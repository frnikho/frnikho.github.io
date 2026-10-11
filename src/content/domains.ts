export type Domain = {
	slug: string;
	title: string;
	desc: string;
	chips: string[];
};

/** Les 10 familles du catalogue, regroupées en 6 domaines lisibles d'un coup d'œil. */
export const domains: Domain[] = [
	{
		slug: "mise-en-production",
		title: "Déploiement en production",
		desc: "Serveur durci, HTTPS, sauvegardes et alertes. Applications Lovable, Bolt ou Supabase prises en charge.",
		chips: ["Docker", "Dokploy", "Préproduction"],
	},
	{
		slug: "migration-couts",
		title: "Migration et optimisation des coûts",
		desc: "De Heroku, Vercel ou AWS vers un serveur européen plus économique, avec audit de facture.",
		chips: ["Hetzner", "Scaleway", "OVHcloud"],
	},
	{
		slug: "ci-cd",
		title: "Automatisation des déploiements",
		desc: "Tests, build et déploiement à chaque mise à jour, avec une URL de prévisualisation par pull request.",
		chips: ["GitHub Actions", "Terraform", "Ansible"],
	},
	{
		slug: "kubernetes",
		title: "Kubernetes",
		desc: "Cluster Talos ou k3s en GitOps, audit et montées de version sans interruption.",
		chips: ["Talos", "ArgoCD", "Cilium"],
	},
	{
		slug: "securite",
		title: "Sécurité et fiabilité",
		desc: "Audit serveur, authentification email SPF/DKIM/DMARC, sauvegardes restaurées, supervision et logs.",
		chips: ["Sauvegardes testées", "Monitoring", "Cloudflare"],
	},
	{
		slug: "maintenance",
		title: "Maintenance et accompagnement",
		desc: "Maintenance, outils libres auto-hébergés, coaching d'équipe et conseil en architecture.",
		chips: ["Maintenance", "Nextcloud", "Conseil"],
	},
];
