export type ServiceItem = { title: string; desc: string };

export type ServiceFamily = {
	slug: string;
	index: string;
	name: string;
	/** Une ligne, utilisée dans l'index de la page d'accueil. */
	short: string;
	headline: string;
	intro: string;
	forWho: string;
	items: ServiceItem[];
	deliverables: string[];
	tools: string[];
	metaTitle: string;
	metaDescription: string;
};

export const serviceFamilies: ServiceFamily[] = [
	{
		slug: "mise-en-production",
		index: "01",
		name: "Mise en production",
		short:
			"Application en production : serveur sécurisé, HTTPS, sauvegardes, alertes.",
		headline: "Une mise en production fiable et maîtrisée.",
		intro:
			"Une application qui fonctionne en local n'est pas prête pour la production. Je prends en charge le serveur, la conteneurisation, le HTTPS, les sauvegardes et la supervision, afin de sécuriser la mise en ligne.",
		forWho:
			"Startups, indépendants et PME disposant d'une application prête, sans équipe infrastructure dédiée.",
		items: [
			{
				title: "Déploiement d'application sur serveur",
				desc: "Serveur durci, application conteneurisée, HTTPS automatique, sauvegardes de la base et alertes de disponibilité.",
			},
			{
				title: "Mise en production d'applications générées par IA",
				desc: "Sécurisation d'applications Lovable, Bolt ou Supabase (secrets, accès, politiques de sécurité des données), puis déploiement sur un serveur que vous contrôlez.",
			},
			{
				title: "Environnement de préproduction",
				desc: "Réplique de la production pour valider avant publication : mêmes versions, mêmes réglages, sans risque pour vos utilisateurs.",
			},
		],
		deliverables: [
			"Serveur sécurisé sur votre compte chez l'hébergeur",
			"Application déployée avec certificat HTTPS renouvelé automatiquement",
			"Sauvegarde de la base de données et alerte en cas d'indisponibilité",
			"Documentation de passation",
		],
		tools: ["Docker", "Traefik", "Dokploy", "PostgreSQL", "Linux"],
		metaTitle:
			"Mise en production d'application, serveur sécurisé | Nicolas Sans",
		metaDescription:
			"Déploiement d'application sur serveur sécurisé, HTTPS, sauvegardes et alertes. Mise en production d'applications Lovable, Bolt ou Supabase. DevOps freelance, à distance.",
	},
	{
		slug: "migration-couts",
		index: "02",
		name: "Migration et réduction des coûts",
		short:
			"Quitter Heroku, Vercel ou AWS pour une infrastructure européenne plus économique.",
		headline: "Optimiser le coût et la souveraineté de votre hébergement.",
		intro:
			"Les plateformes managées facilitent le démarrage, puis la facture augmente. J'audite les dépenses, propose un plan d'économies et, lorsque la migration est pertinente, la réalise sans interruption de service.",
		forWho:
			"Équipes dont la facture cloud dérive, sites devenus lents ou limités, organisations souhaitant un hébergeur européen.",
		items: [
			{
				title: "Migration vers un serveur moins cher",
				desc: "Depuis Heroku, Vercel, Render ou AWS vers Hetzner ou un VPS européen, avec bascule planifiée et retour arrière possible.",
			},
			{
				title: "Audit de facture cloud",
				desc: "Repérage des dépenses inutiles (ressources oubliées, surdimensionnement, transferts) et plan d'économies chiffré.",
			},
			{
				title: "De l'hébergement mutualisé vers un VPS",
				desc: "Pour les sites devenus trop lents ou limités : migration, performance, sécurité et sauvegardes remises à niveau.",
			},
			{
				title: "Migration vers un hébergeur européen",
				desc: "Pour des raisons de souveraineté ou de RGPD : hébergement en France ou en Union européenne, avec une exposition limitée aux lois extra-européennes.",
			},
		],
		deliverables: [
			"Rapport d'audit avec économies estimées, poste par poste",
			"Plan de migration avec calendrier et plan de retour arrière",
			"Migration réalisée, vérifiée et documentée",
		],
		tools: ["Hetzner", "Scaleway", "OVHcloud", "Docker", "Terraform"],
		metaTitle: "Migration cloud et réduction des coûts | Nicolas Sans",
		metaDescription:
			"Migration depuis Heroku, Vercel, Render ou AWS vers Hetzner ou un VPS européen. Audit de facture cloud, plan d'économies et hébergement conforme RGPD.",
	},
	{
		slug: "ci-cd",
		index: "03",
		name: "CI/CD et automatisation",
		short: "Tests, build et déploiement automatiques à chaque mise à jour.",
		headline: "Des livraisons rapides, reproductibles et traçables.",
		intro:
			"Un déploiement manuel est lent et source d'erreurs. J'automatise la chaîne complète : chaque modification est testée, construite et publiée de manière identique, et reste traçable.",
		forWho:
			"Équipes de développement qui déploient manuellement, ou dont l'infrastructure repose sur les connaissances d'une seule personne.",
		items: [
			{
				title: "Pipeline de déploiement automatique",
				desc: "Tests, build et déploiement à chaque mise à jour avec GitHub Actions ou GitLab CI.",
			},
			{
				title: "Prévisualisation par pull request",
				desc: "Une URL de test pour chaque modification en cours, pour relire et valider avant de fusionner.",
			},
			{
				title: "Infrastructure as Code",
				desc: "Infrastructure montée manuellement, rendue reproductible et documentée avec Terraform et Ansible.",
			},
		],
		deliverables: [
			"Pipelines versionnés dans votre dépôt",
			"Environnements reproductibles à partir du code",
			"Documentation d'utilisation pour l'équipe",
		],
		tools: ["GitHub Actions", "GitLab CI", "Terraform", "Ansible", "Docker"],
		metaTitle: "CI/CD, pipelines et Infrastructure as Code | Nicolas Sans",
		metaDescription:
			"Pipelines GitHub Actions ou GitLab CI, environnements de prévisualisation par pull request, Terraform et Ansible. DevOps freelance en France.",
	},
	{
		slug: "kubernetes",
		index: "04",
		name: "Kubernetes",
		short: "Cluster Talos ou k3s, GitOps avec ArgoCD, audit et mise à niveau.",
		headline: "Kubernetes exploité en production, au-delà de l'installation.",
		intro:
			"J'exploite un cluster Kubernetes haute disponibilité sur serveurs dédiés. Les pratiques qui y sont appliquées (système immuable, GitOps, secrets chiffrés, observabilité) sont transposées chez vous, à la bonne échelle.",
		forWho:
			"Équipes qui souhaitent adopter Kubernetes avec méthode, ou fiabiliser un cluster existant.",
		items: [
			{
				title: "Mise en place d'un cluster",
				desc: "Talos ou k3s, ArgoCD en GitOps, ingress, certificats, sauvegardes : un socle propre et documenté.",
			},
			{
				title: "Audit d'un cluster existant",
				desc: "Sécurité, ressources, haute disponibilité et coûts, avec un rapport priorisé et des correctifs concrets.",
			},
			{
				title: "Mise à niveau de cluster",
				desc: "Montée de version planifiée et répétée en préproduction, sans interruption de service.",
			},
		],
		deliverables: [
			"Cluster déclaré dans Git (GitOps), reconstructible à l'identique",
			"Secrets chiffrés, politiques réseau et de sécurité",
			"Rapport d'audit priorisé ou plan de mise à niveau",
		],
		tools: ["Talos", "k3s", "ArgoCD", "Cilium", "Helm", "Kustomize"],
		metaTitle: "Kubernetes : Talos, k3s, GitOps ArgoCD | Nicolas Sans",
		metaDescription:
			"Mise en place, audit et mise à niveau de clusters Kubernetes (Talos, k3s) avec ArgoCD en GitOps. Expérience d'un cluster haute disponibilité en production.",
	},
	{
		slug: "securite",
		index: "05",
		name: "Sécurité",
		short: "Audit serveur, email SPF/DKIM/DMARC, Cloudflare.",
		headline: "Réduire la surface d'attaque avant qu'elle ne soit exploitée.",
		intro:
			"La plupart des incidents proviennent de réglages par défaut : port ouvert, secret dans un dépôt, mise à jour oubliée. Ils sont recherchés méthodiquement, puis corrigés.",
		forWho:
			"Toute organisation disposant d'un serveur exposé sur Internet, ou dont les emails sont classés en spam.",
		items: [
			{
				title: "Audit de sécurité serveur",
				desc: "SSH, pare-feu, ports ouverts, secrets exposés, images Docker vulnérables, mises à jour. Les ports exposés sont vérifiés depuis l'extérieur.",
			},
			{
				title: "Configuration email professionnelle",
				desc: "SPF, DKIM et DMARC, pour une bonne délivrabilité de vos emails.",
			},
			{
				title: "Mise en place de Cloudflare",
				desc: "DNS, cache, pare-feu applicatif et protection anti-DDoS, configurés pour votre application.",
			},
		],
		deliverables: [
			"Rapport d'audit classé par gravité",
			"Correctifs appliqués ou fournis, avec preuve de vérification",
			"Enregistrements DNS email validés",
		],
		tools: ["SSH", "UFW", "Trivy", "Cloudflare", "SPF / DKIM / DMARC"],
		metaTitle: "Audit sécurité serveur, DMARC, Cloudflare | Nicolas Sans",
		metaDescription:
			"Audit de sécurité de serveur (SSH, pare-feu, secrets, images Docker), configuration email SPF DKIM DMARC et mise en place de Cloudflare.",
	},
	{
		slug: "sauvegardes-continuite",
		index: "06",
		name: "Sauvegardes et continuité",
		short:
			"Sauvegardes dont la restauration est testée, plan de reprise documenté.",
		headline: "Une sauvegarde n'existe que si elle a été restaurée.",
		intro:
			"Le jour d'un incident, il faut savoir quoi faire, dans quel ordre et dans quel délai. Je mets en place des sauvegardes fiables, teste leur restauration et documente la reprise d'activité.",
		forWho:
			"Organisations disposant d'un serveur mais sans sauvegarde fiable ni procédure en cas de perte.",
		items: [
			{
				title: "Plan de sauvegarde avec restauration testée",
				desc: "Sauvegardes chiffrées, stockées hors du serveur, et test de restauration réellement exécuté et chronométré.",
			},
			{
				title: "Plan de reprise d'activité documenté",
				desc: "Quoi faire, dans quel ordre et en combien de temps en cas de perte du serveur, avec les objectifs de reprise (RPO et RTO) clairement posés.",
			},
		],
		deliverables: [
			"Sauvegardes automatisées et chiffrées, stockées dans l'Union européenne",
			"Compte rendu du test de restauration, avec durée mesurée",
			"Procédure de reprise pas à pas",
		],
		tools: ["Restic", "Velero", "Object Storage UE", "PostgreSQL"],
		metaTitle:
			"Sauvegardes testées et plan de reprise d'activité | Nicolas Sans",
		metaDescription:
			"Plan de sauvegarde avec restauration testée et plan de reprise d'activité documenté (RPO, RTO) pour vos serveurs et applications.",
	},
	{
		slug: "monitoring",
		index: "07",
		name: "Monitoring et observabilité",
		short: "Alertes, logs centralisés, page de statut publique.",
		headline: "Détecter les incidents avant vos utilisateurs.",
		intro:
			"De la simple alerte de disponibilité à une pile Grafana complète, la supervision est dimensionnée à votre besoin, avec des alertes pertinentes plutôt que du bruit.",
		forWho:
			"Équipes qui apprennent les pannes par leurs utilisateurs, ou qui peinent à identifier l'origine d'une erreur.",
		items: [
			{
				title: "Monitoring et alertes",
				desc: "Disponibilité, ressources, certificats. Une simple alerte ou une stack Grafana et Prometheus complète.",
			},
			{
				title: "Centralisation des logs",
				desc: "Identification rapide de l'origine d'une erreur, avec recherche et rétention adaptées.",
			},
			{
				title: "Page de statut publique",
				desc: "Information des utilisateurs en cas d'incident, sans sollicitation de votre support.",
			},
		],
		deliverables: [
			"Tableaux de bord et alertes configurés",
			"Logs centralisés et consultables",
			"Page de statut sur votre domaine",
		],
		tools: ["Grafana", "Prometheus", "Loki", "Uptime Kuma"],
		metaTitle: "Monitoring, alertes, logs et page de statut | Nicolas Sans",
		metaDescription:
			"Supervision et alertes, centralisation des logs avec Grafana et Loki, page de statut publique. Du simple monitoring à la stack complète.",
	},
	{
		slug: "auto-heberge",
		index: "08",
		name: "Outils libres auto-hébergés",
		short:
			"Nextcloud, Vaultwarden, Forgejo, Plausible, Umami sur votre infrastructure.",
		headline: "Vos outils, vos données, votre serveur.",
		intro:
			"Remplacer des services américains par des outils libres, hébergés chez vous ou en Europe, réduit la dépendance et simplifie la conformité. Chaque installation inclut sauvegardes, mises à jour et accès sécurisés.",
		forWho:
			"Organisations attachées à la maîtrise de leurs données, ou souhaitant réduire leurs abonnements SaaS.",
		items: [
			{
				title: "Installation d'outils auto-hébergés",
				desc: "Nextcloud, Vaultwarden, Forgejo, Plausible, Umami et d'autres. La licence est vérifiée avec vous pour chaque outil avant l'installation.",
			},
		],
		deliverables: [
			"Outil installé, sécurisé et accessible en HTTPS",
			"Sauvegardes et procédure de mise à jour",
			"Vérification de licence pour votre usage",
		],
		tools: ["Nextcloud", "Vaultwarden", "Forgejo", "Plausible", "Umami"],
		metaTitle: "Outils libres auto-hébergés pour entreprises | Nicolas Sans",
		metaDescription:
			"Installation de Nextcloud, Vaultwarden, Forgejo, Plausible ou Umami sur votre propre serveur, avec sauvegardes et sécurité. Données maîtrisées.",
	},
	{
		slug: "maintenance",
		index: "09",
		name: "Maintenance et infogérance",
		short:
			"Mises à jour, surveillance, sauvegardes vérifiées, marque blanche pour agences.",
		headline: "Un suivi continu de votre infrastructure.",
		intro:
			"Une infrastructure se dégrade en l'absence de suivi. Je prends en charge les mises à jour, la surveillance et la vérification des sauvegardes, et j'interviens en cas d'incident.",
		forWho:
			"Organisations sans administrateur système, et agences souhaitant proposer l'infogérance à leurs clients.",
		items: [
			{
				title: "Contrat de maintenance",
				desc: "Mises à jour, surveillance, sauvegardes vérifiées chaque mois et intervention en cas de panne, avec un rapport mensuel clair.",
			},
			{
				title: "Infogérance en marque blanche pour agences",
				desc: "L'agence commercialise la maintenance auprès de ses clients ; l'exécution est assurée sous sa marque.",
			},
		],
		deliverables: [
			"Rapport mensuel de synthèse",
			"Intervention en cas d'incident, selon le contrat",
			"Un interlocuteur unique qui connaît vos systèmes",
		],
		tools: ["Ansible", "Grafana", "Restic"],
		metaTitle:
			"Maintenance serveur et infogérance marque blanche | Nicolas Sans",
		metaDescription:
			"Maintenance de serveurs et d'applications : mises à jour, surveillance, sauvegardes vérifiées. Infogérance en marque blanche pour agences.",
	},
	{
		slug: "accompagnement",
		index: "10",
		name: "Accompagnement et conseil",
		short:
			"Coaching d'équipe, documentation d'infrastructure, conseil en architecture.",
		headline: "Rendre votre équipe autonome.",
		intro:
			"Transmission de compétences : formation d'équipe, documentation de l'existant pour qu'il survive aux départs, aide au choix de l'architecture avant le lancement.",
		forWho:
			"Équipes de développement souhaitant monter en compétences, et porteurs de projet avant le lancement.",
		items: [
			{
				title: "Coaching d'équipe",
				desc: "Accompagnement des développeurs dans l'adoption de Docker, de la CI/CD ou de Kubernetes, sur vos propres projets.",
			},
			{
				title: "Documentation d'infrastructure",
				desc: "Rédaction des procédures (runbooks) pour qu'une équipe puisse reprendre l'infrastructure.",
			},
			{
				title: "Conseil en architecture",
				desc: "Choix de l'hébergement et de l'infrastructure adaptés avant le lancement d'un projet, pour éviter surcoûts et refontes.",
			},
		],
		deliverables: [
			"Sessions de travail sur vos cas réels",
			"Runbooks et schémas d'architecture",
			"Recommandation argumentée et chiffrée",
		],
		tools: ["Docker", "Kubernetes", "GitHub Actions"],
		metaTitle: "Coaching DevOps, documentation et conseil | Nicolas Sans",
		metaDescription:
			"Coaching d'équipe Docker, CI/CD et Kubernetes, documentation d'infrastructure (runbooks) et conseil en architecture avant lancement de projet.",
	},
];

export const getFamily = (slug: string) =>
	serviceFamilies.find((f) => f.slug === slug);
