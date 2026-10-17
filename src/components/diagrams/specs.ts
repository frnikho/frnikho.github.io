import type { DiagramSpec, DNode } from "@/components/diagrams/types";
import type { ClientProject } from "@/content/projects";

const node = (
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	title: DNode["title"],
	sub?: string,
	tone?: DNode["tone"],
	extra?: Pick<DNode, "icon" | "step" | "layout">,
): DNode => ({ id, x, y, w, h, title, sub, tone, ...extra });

/** Architecture du cluster Kubernetes (anonymisée). */
export const clusterArchitecture: DiagramSpec = {
	label:
		"Schéma : des utilisateurs accèdent aux applications via un ingress. Git alimente ArgoCD, qui synchronise un cluster Kubernetes sur Talos Linux et serveurs dédiés, avec secrets, base de données haute disponibilité, stockage distribué, sécurité, observabilité, réseau eBPF, et sauvegardes copiées vers un stockage objet européen.",
	legend: [
		{ kind: "flow", text: "flux applicatif et GitOps" },
		{ kind: "zone", text: "périmètre du cluster" },
	],
	wide: {
		size: [920, 520],
		zones: [
			{
				x: 240,
				y: 10,
				w: 660,
				h: 396,
				label: "Cluster Kubernetes",
			},
		],
		nodes: [
			node("users", 0, 56, 170, 58, "Utilisateurs", "HTTPS", undefined, {
				icon: "users",
			}),
			node("git", 0, 172, 170, 58, "Git", "source de vérité", undefined, {
				icon: "git",
				step: 1,
			}),
			node("argo", 0, 272, 170, 64, "ArgoCD", "GitOps", "primary", {
				icon: "sync",
				step: 2,
			}),
			node(
				"ing",
				258,
				56,
				190,
				58,
				"Ingress",
				"Traefik, cert-manager",
				undefined,
				{
					icon: "globe",
				},
			),
			node("apps", 478, 56, 190, 58, "Applications", "conteneurs", "primary", {
				icon: "box",
			}),
			node("sec", 698, 56, 190, 58, "Secrets", "Vault, SOPS", undefined, {
				icon: "lock",
			}),
			node(
				"db",
				258,
				146,
				190,
				58,
				"PostgreSQL",
				"haute disponibilité",
				undefined,
				{
					icon: "database",
				},
			),
			node(
				"sto",
				478,
				146,
				190,
				58,
				"Stockage",
				"Rook-Ceph distribué",
				undefined,
				{
					icon: "disk",
				},
			),
			node(
				"net",
				698,
				146,
				190,
				58,
				"Réseau",
				"Cilium eBPF, VLAN privé",
				undefined,
				{
					icon: "network",
				},
			),
			node(
				"pol",
				258,
				236,
				190,
				58,
				"Sécurité",
				"Kyverno, Trivy, Tetragon",
				undefined,
				{
					icon: "shield",
				},
			),
			node(
				"obs",
				478,
				236,
				190,
				58,
				"Observabilité",
				"Prometheus, Loki, Tempo",
				undefined,
				{
					icon: "eye",
				},
			),
			node("bk", 698, 236, 190, 58, "Sauvegardes", "Velero", undefined, {
				icon: "archive",
			}),
			node(
				"base",
				258,
				326,
				630,
				56,
				"Talos Linux, sans accès SSH",
				"serveurs dédiés Hetzner, provisionnés par Cluster API",
				"night",
				{ icon: "cpu" },
			),
			node(
				"obj",
				500,
				450,
				230,
				58,
				"Stockage objet UE",
				"copie chiffrée",
				"ok",
				{ icon: "disk" },
			),
		],
		edges: [
			{ id: "u1", d: "M170 85H256", flow: true },
			{ id: "g1", d: "M85 230V270", flow: true },
			{
				id: "g2",
				d: "M170 304H238",
				flow: true,
				label: { text: "sync", x: 204, y: 304 },
			},
			{ id: "e1", d: "M448 85H476", flow: true },
			{ id: "l1", d: "M698 85H670" },
			{ id: "l2", d: "M573 114V146" },
			{ id: "l3", d: "M573 114V130H353V144" },
			{ id: "l4", d: "M448 175H476" },
			{
				id: "e4",
				d: "M888 265H910V479H732",
				flow: true,
				label: { text: "copie chiffrée", x: 820, y: 479 },
			},
			{ id: "chain", d: "M85 85H573", hidden: true },
			{ id: "gchain", d: "M85 201V304H238", hidden: true },
		],
		packets: [
			{ edge: "chain", dur: 3 },
			{ edge: "gchain", dur: 2.2, delay: 1.4, gap: 2 },
			{ edge: "e4", dur: 2.4, delay: 0.6, gap: 2.4 },
		],
	},
	tall: {
		size: [340, 740],
		zones: [
			{ x: 0, y: 180, w: 340, h: 449, label: "Kubernetes · Talos Linux" },
		],
		nodes: [
			node("git", 85, 0, 170, 56, "Git", "source de vérité"),
			node("argo", 85, 90, 170, 56, "ArgoCD", "GitOps", "primary"),
			node("apps", 85, 225, 170, 64, "Applications", "conteneurs", "primary"),
			node("ing", 12, 305, 150, 64, "Ingress", "Traefik, HTTPS"),
			node("sec", 178, 305, 150, 64, "Secrets", "Vault, SOPS"),
			node("db", 12, 385, 150, 64, "PostgreSQL", "haute dispo."),
			node("sto", 178, 385, 150, 64, "Stockage", "Ceph distribué"),
			node("pol", 12, 465, 150, 64, "Sécurité", "Kyverno, Trivy"),
			node("obs", 178, 465, 150, 64, "Observabilité", "Prometheus"),
			node("bk", 12, 545, 150, 64, "Sauvegardes", "Velero"),
			node("net", 178, 545, 150, 64, "Réseau", "Cilium eBPF"),
			node(
				"obj",
				85,
				665,
				170,
				56,
				"Stockage objet UE",
				"copie chiffrée",
				"ok",
			),
		],
		edges: [
			{ id: "e1", d: "M170 56V88", flow: true },
			{ id: "e2", d: "M170 146V223", flow: true },
			{ id: "e4", d: "M87 609V663", flow: true },
			{ id: "chain", d: "M170 28V258", hidden: true },
		],
		packets: [
			{ edge: "chain", dur: 2.8 },
			{ edge: "e4", dur: 1.2, delay: 1.4, gap: 2.4 },
		],
	},
};

/** Souveraineté : où vont (et ne vont pas) vos données. */
export const sovereigntyFlow: DiagramSpec = {
	label:
		"Schéma : vos utilisateurs accèdent en HTTPS à l'application hébergée dans l'Union européenne chez OVHcloud ou Hetzner, avec base de données chiffrée, sauvegardes chiffrées, accès administrateur par clé et journalisé, journaux pour le registre RGPD. Aucun transfert vers un fournisseur soumis au Cloud Act.",
	legend: [
		{ kind: "flow", text: "flux de données" },
		{ kind: "blocked", text: "flux exclu" },
		{ kind: "zone", text: "périmètre Union européenne" },
	],
	wide: {
		size: [640, 580],
		zones: [
			{
				x: 0,
				y: 92,
				w: 640,
				h: 340,
				label: "Union européenne",
				eu: true,
			},
		],
		nodes: [
			node("users", 24, 0, 280, 54, "Vos utilisateurs", undefined, undefined, {
				icon: "users",
			}),
			node(
				"app",
				24,
				146,
				280,
				62,
				"Application",
				"serveur chez OVHcloud ou Hetzner",
				"primary",
				{ icon: "server" },
			),
			node(
				"db",
				336,
				146,
				280,
				62,
				"Base de données",
				"chiffrée au repos",
				undefined,
				{
					icon: "database",
				},
			),
			node(
				"bk",
				24,
				244,
				280,
				62,
				"Sauvegardes",
				"chiffrées, stockées dans l'UE",
				undefined,
				{
					icon: "archive",
				},
			),
			node(
				"adm",
				336,
				244,
				280,
				62,
				"Accès administrateur",
				"par clé, journalisé, révocable",
				undefined,
				{
					icon: "lock",
				},
			),
			node(
				"log",
				180,
				342,
				280,
				62,
				"Journaux",
				"alimentent votre registre RGPD",
				undefined,
				{
					icon: "file",
				},
			),
			node(
				"us",
				180,
				502,
				280,
				62,
				["Fournisseur soumis", "au Cloud Act"],
				undefined,
				"danger",
				{ icon: "ban" },
			),
		],
		edges: [
			{
				id: "e1",
				d: "M164 54V144",
				flow: true,
				label: { text: "HTTPS", x: 164, y: 72 },
			},
			{ id: "e2", d: "M304 177H334", flow: true },
			{ id: "l1", d: "M164 208V242" },
			{ id: "l2", d: "M476 208V242" },
			{ id: "l3", d: "M164 306V324H320V340" },
			{ id: "l4", d: "M476 306V324H320V340" },
			{ id: "x", d: "M320 432V500", blocked: true },
			{ id: "bp", d: "M320 410V470", hidden: true },
		],
		marks: [{ x: 320, y: 466, text: "✕" }],
		packets: [
			{ edge: "e1", dur: 1.4 },
			{ edge: "e2", dur: 0.6, delay: 1.3, gap: 2.2 },
			{ edge: "bp", dur: 1.1, delay: 0.5, gap: 2.4, tone: "danger" },
		],
	},
	tall: {
		size: [340, 610],
		zones: [
			{ x: 0, y: 100, w: 340, h: 350, label: "Union européenne", eu: true },
		],
		nodes: [
			node("users", 85, 0, 170, 56, "Vos utilisateurs"),
			node(
				"app",
				85,
				150,
				170,
				64,
				"Application",
				"serveur en France",
				"primary",
			),
			node("db", 12, 250, 150, 64, "Base de données", "chiffrée"),
			node("adm", 178, 250, 150, 64, "Accès admin", "journalisé"),
			node("bk", 12, 346, 150, 64, "Sauvegardes", "dans l'UE"),
			node("log", 178, 346, 150, 64, "Journaux", "registre RGPD"),
			node(
				"us",
				85,
				530,
				170,
				64,
				["Fournisseur soumis", "au Cloud Act"],
				undefined,
				"danger",
			),
		],
		edges: [
			{ id: "e1", d: "M170 56V148", flow: true },
			{ id: "l1", d: "M170 214V232H87V250" },
			{ id: "l2", d: "M170 232H253V250" },
			{ id: "x", d: "M170 450V528", blocked: true },
			{ id: "bp", d: "M170 440V478", hidden: true },
		],
		marks: [{ x: 170, y: 489, text: "✕" }],
		packets: [
			{ edge: "e1", dur: 1.4 },
			{ edge: "bp", dur: 1, delay: 0.5, gap: 2.4, tone: "danger" },
		],
	},
};

/** Everyloc : pipeline de livraison puis VPS OVHcloud déployé avec Dokploy. */
const everylocArchitecture: DiagramSpec = {
	label:
		"Schéma : le code part de GitHub, passe par une intégration continue (lint, typage, tests, build), produit une image Docker versionnée, déployée par Dokploy sur un VPS OVHcloud en France. Les visiteurs accèdent en HTTPS à l'application Next.js, reliée à PostgreSQL, à un stockage S3 et à un serveur mail.",
	legend: [
		{ kind: "step", text: "ordre de livraison" },
		{ kind: "flow", text: "flux automatisé" },
		{ kind: "zone", text: "serveur de production" },
	],
	wide: {
		size: [740, 350],
		zones: [
			{
				x: 240,
				y: 120,
				w: 480,
				h: 220,
				label: "VPS OVHcloud · France",
				eu: true,
			},
		],
		nodes: [
			node("git", 0, 20, 170, 58, "GitHub", "push, pull request", undefined, {
				icon: "git",
				step: 1,
			}),
			node("ci", 200, 20, 200, 58, "CI", "lint, types, tests", undefined, {
				icon: "zap",
				step: 2,
			}),
			node(
				"img",
				430,
				20,
				170,
				58,
				"Image Docker",
				"GHCR, versionnée",
				undefined,
				{
					icon: "box",
					step: 3,
				},
			),
			node("users", 0, 236, 170, 58, "Visiteurs", "HTTPS", undefined, {
				icon: "users",
			}),
			node("dep", 270, 140, 200, 56, "Dokploy", "déploiement", undefined, {
				icon: "sync",
				step: 4,
			}),
			node("app", 270, 230, 200, 64, "Next.js", "conteneur Docker", "primary", {
				icon: "server",
				step: 5,
			}),
			node("db", 510, 140, 180, 50, "PostgreSQL", "réservations", undefined, {
				icon: "database",
			}),
			node("s3", 510, 205, 180, 50, "Stockage S3", "médias", undefined, {
				icon: "disk",
			}),
			node(
				"mail",
				510,
				270,
				180,
				50,
				"Serveur mail",
				"confirmations",
				undefined,
				{
					icon: "bell",
				},
			),
		],
		edges: [
			{ id: "e1", d: "M170 49H198", flow: true },
			{ id: "e2", d: "M400 49H428", flow: true },
			{ id: "e3", d: "M515 78V108H370V138", flow: true },
			{ id: "e4", d: "M370 196V228", flow: true },
			{ id: "u1", d: "M170 265H268", flow: true },
			{ id: "l1", d: "M470 262H490V165H508" },
			{ id: "l2", d: "M470 262H490V230H508" },
			{ id: "l3", d: "M470 262H490V295H508" },
			{ id: "chain", d: "M85 49H515V108H370V262", hidden: true },
		],
		packets: [
			{ edge: "chain", dur: 3.6 },
			{ edge: "u1", dur: 1.4, delay: 1, gap: 2 },
		],
	},
	tall: {
		size: [340, 590],
		zones: [
			{
				x: 0,
				y: 262,
				w: 340,
				h: 314,
				label: "VPS OVHcloud · France",
				eu: true,
			},
		],
		nodes: [
			node("git", 50, 0, 240, 56, "GitHub", "push, pull request", undefined, {
				step: 1,
			}),
			node("ci", 50, 90, 240, 56, "CI", "lint, types, tests", undefined, {
				step: 2,
			}),
			node("img", 50, 180, 240, 56, "Image Docker", "GHCR", undefined, {
				step: 3,
			}),
			node("dep", 50, 300, 240, 56, "Dokploy", "déploiement", undefined, {
				step: 4,
			}),
			node("app", 50, 390, 240, 64, "Next.js", "conteneur Docker", "primary", {
				step: 5,
			}),
			node("db", 0, 500, 104, 56, "PostgreSQL"),
			node("s3", 118, 500, 104, 56, "S3", "médias"),
			node("mail", 236, 500, 104, 56, "Mail"),
		],
		edges: [
			{ id: "e1", d: "M170 56V88", flow: true },
			{ id: "e2", d: "M170 146V178", flow: true },
			{ id: "e3", d: "M170 236V298", flow: true },
			{ id: "e4", d: "M170 356V388", flow: true },
			{ id: "l1", d: "M170 454V478H52V500" },
			{ id: "l2", d: "M170 454V500" },
			{ id: "l3", d: "M170 454V478H288V500" },
			{ id: "chain", d: "M170 28V420", hidden: true },
		],
		packets: [
			{ edge: "chain", dur: 3.6 },
			{ edge: "chain", dur: 3.6, delay: 1.8 },
		],
	},
};

/** O Cœur du Soi : site autonome et newsletter RGPD sur VPS OVHcloud. */
const ocdsArchitecture: DiagramSpec = {
	label:
		"Schéma : le code part de GitHub, est construit par l'intégration continue en image Docker, puis déployé par Dokploy sur un VPS OVHcloud en France. Visiteurs et praticienne utilisent l'application TanStack Start, reliée à MongoDB, à un cache Valkey, à un stockage S3 pour les médias et à un serveur SMTP qui envoie la newsletter aux abonnés après double confirmation.",
	legend: [
		{ kind: "step", text: "ordre de livraison" },
		{ kind: "flow", text: "flux automatisé" },
		{ kind: "zone", text: "serveur de production" },
	],
	wide: {
		size: [920, 410],
		zones: [
			{
				x: 240,
				y: 120,
				w: 480,
				h: 280,
				label: "VPS OVHcloud · France",
				eu: true,
			},
		],
		nodes: [
			node("git", 0, 20, 170, 58, "GitHub", "push", undefined, {
				icon: "git",
				step: 1,
			}),
			node("ci", 200, 20, 200, 58, "CI", "build vérifié", undefined, {
				icon: "zap",
				step: 2,
			}),
			node("img", 430, 20, 170, 58, "Image Docker", "par version", undefined, {
				icon: "box",
				step: 3,
			}),
			node("users", 0, 212, 170, 58, "Visiteurs", "HTTPS", undefined, {
				icon: "users",
			}),
			node("admin", 0, 290, 170, 58, "Praticienne", "back-office", undefined, {
				icon: "file",
			}),
			node("dep", 270, 140, 200, 56, "Dokploy", "déploiement", undefined, {
				icon: "sync",
				step: 4,
			}),
			node(
				"app",
				270,
				230,
				200,
				64,
				"TanStack Start",
				"rendu serveur",
				"primary",
				{
					icon: "server",
					step: 5,
				},
			),
			node(
				"db",
				510,
				140,
				180,
				50,
				"MongoDB",
				"contenus, contacts",
				undefined,
				{
					icon: "database",
				},
			),
			node("cache", 510, 202, 180, 50, "Valkey", "cache", undefined, {
				icon: "zap",
			}),
			node(
				"s3",
				510,
				264,
				180,
				50,
				"Stockage S3",
				"images, vidéos",
				undefined,
				{
					icon: "disk",
				},
			),
			node("smtp", 510, 326, 180, 50, "SMTP", "newsletter", undefined, {
				icon: "bell",
			}),
			node("subs", 760, 321, 160, 60, "Abonnés", "double opt-in", "ok", {
				icon: "check",
			}),
		],
		edges: [
			{ id: "e1", d: "M170 49H198", flow: true },
			{ id: "e2", d: "M400 49H428", flow: true },
			{ id: "e3", d: "M515 78V108H370V138", flow: true },
			{ id: "e4", d: "M370 196V228", flow: true },
			{ id: "u1", d: "M170 241H268", flow: true },
			{ id: "u2", d: "M170 319H220V282H268", flow: true },
			{ id: "l1", d: "M470 262H490V165H508" },
			{ id: "l2", d: "M470 262H490V227H508" },
			{ id: "l3", d: "M470 262H490V289H508" },
			{ id: "l4", d: "M470 262H490V351H508" },
			{ id: "m1", d: "M690 351H758", flow: true },
			{ id: "chain", d: "M85 49H515V108H370V262", hidden: true },
		],
		packets: [
			{ edge: "chain", dur: 3.6 },
			{ edge: "m1", dur: 1.2, delay: 1.2, gap: 2.4 },
		],
	},
	tall: {
		size: [340, 720],
		zones: [
			{
				x: 0,
				y: 262,
				w: 340,
				h: 374,
				label: "VPS OVHcloud · France",
				eu: true,
			},
		],
		nodes: [
			node("git", 50, 0, 240, 56, "GitHub", "push", undefined, { step: 1 }),
			node("ci", 50, 90, 240, 56, "CI", "build vérifié", undefined, {
				step: 2,
			}),
			node("img", 50, 180, 240, 56, "Image Docker", "par version", undefined, {
				step: 3,
			}),
			node("dep", 50, 300, 240, 56, "Dokploy", "déploiement", undefined, {
				step: 4,
			}),
			node(
				"app",
				50,
				390,
				240,
				64,
				"TanStack Start",
				"rendu serveur",
				"primary",
				{
					step: 5,
				},
			),
			node("db", 0, 500, 160, 52, "MongoDB"),
			node("cache", 180, 500, 160, 52, "Valkey", "cache"),
			node("s3", 0, 566, 160, 52, "Stockage S3", "médias"),
			node("smtp", 180, 566, 160, 52, "SMTP", "newsletter"),
			node("subs", 90, 660, 160, 52, "Abonnés", "double opt-in", "ok"),
		],
		edges: [
			{ id: "e1", d: "M170 56V88", flow: true },
			{ id: "e2", d: "M170 146V178", flow: true },
			{ id: "e3", d: "M170 236V298", flow: true },
			{ id: "e4", d: "M170 356V388", flow: true },
			{ id: "l1", d: "M170 454V592" },
			{ id: "l2", d: "M160 526H180" },
			{ id: "l3", d: "M160 592H180" },
			{ id: "m1", d: "M260 618V640H170V658", flow: true },
			{ id: "chain", d: "M170 28V420", hidden: true },
		],
		packets: [
			{ edge: "chain", dur: 3.6 },
			{ edge: "m1", dur: 1, delay: 1.4, gap: 2.4 },
		],
	},
};

/** Schéma d'architecture de chaque projet client, pour la page Réalisations. */
export const clientProjectDiagrams: Record<ClientProject["id"], DiagramSpec> = {
	everyloc: everylocArchitecture,
	ocds: ocdsArchitecture,
};
