/** Cluster d'exploitation, décrit de manière anonymisée (aucun nom, IP ou domaine). */

export type ClusterLayer = {
	id: string;
	label: string;
	detail: string;
	tools: string[];
};

export const clusterLayers: ClusterLayer[] = [
	{
		id: "git",
		label: "Git, source de vérité",
		detail:
			"Chaque changement est relu, tracé et réversible. Les secrets sont chiffrés dans le dépôt.",
		tools: ["ArgoCD", "Kustomize", "Helm", "SOPS"],
	},
	{
		id: "platform",
		label: "Plateforme",
		detail:
			"Ingress, certificats automatiques, DNS synchronisé, autoscaling et files de messages.",
		tools: ["Traefik", "cert-manager", "External DNS", "KEDA", "RabbitMQ"],
	},
	{
		id: "data",
		label: "Données et secrets",
		detail:
			"PostgreSQL haute disponibilité, stockage distribué, coffre-fort de secrets avec déverrouillage automatique.",
		tools: ["CloudNativePG", "Rook-Ceph", "Vault", "External Secrets"],
	},
	{
		id: "security",
		label: "Sécurité et sauvegardes",
		detail:
			"Politiques d'admission, analyse des vulnérabilités, observation des comportements à l'exécution, sauvegardes de cluster.",
		tools: ["Kyverno", "Trivy", "Tetragon", "Velero", "NetworkPolicies"],
	},
	{
		id: "observability",
		label: "Observabilité",
		detail: "Métriques, logs, traces et sondes de disponibilité, centralisés.",
		tools: ["Prometheus", "Loki", "Tempo", "Alloy", "Grafana"],
	},
	{
		id: "network",
		label: "Réseau",
		detail:
			"CNI eBPF en remplacement de kube-proxy, VLAN privé entre les nœuds, adresse virtuelle pour le plan de contrôle.",
		tools: ["Cilium", "VLAN privé", "VIP"],
	},
	{
		id: "os",
		label: "Système et machines",
		detail:
			"Système immuable sans accès SSH, machines provisionnées par API, serveurs dédiés et machines cloud.",
		tools: ["Talos Linux", "Cluster API", "Hetzner"],
	},
];

export type ClusterWave = { waves: string; label: string };

/** Ordre de déploiement automatisé (ArgoCD, vagues 0 à 15). */
export const clusterWaves: ClusterWave[] = [
	{ waves: "0", label: "Réseau (Cilium) et certificats" },
	{ waves: "1-2", label: "Stockage distribué (Rook-Ceph)" },
	{ waves: "3-4", label: "Coffre-fort de secrets (Vault)" },
	{ waves: "5-6", label: "Secrets vers Kubernetes, mises à jour d'images" },
	{ waves: "7", label: "Ingress (Traefik)" },
	{ waves: "8", label: "DNS automatique et métriques" },
	{ waves: "9", label: "Logs, traces et sondes" },
	{ waves: "10-11", label: "PostgreSQL haute disponibilité" },
	{ waves: "12-13", label: "Métriques ressources et autoscaling" },
	{ waves: "14-15", label: "Messagerie (RabbitMQ)" },
];

export type ClusterMetric = {
	value: string;
	label: string;
	/** Nombre pur animé par GSAP si renseigné. */
	count?: number;
	suffix?: string;
};

// Uniquement des chiffres factuels. Uptime, RPO et RTO sont volontairement
// absents tant qu'ils ne sont pas mesurés.
export const clusterMetrics: ClusterMetric[] = [
	{
		value: "40+",
		count: 40,
		suffix: "+",
		label: "composants déployés par GitOps",
	},
	{ value: "16", count: 16, label: "vagues de déploiement ordonnées" },
	{ value: "0", count: 0, label: "secret en clair dans Git" },
	{ value: "0", count: 0, label: "accès SSH sur les nœuds" },
];
