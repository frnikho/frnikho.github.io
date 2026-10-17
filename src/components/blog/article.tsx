import { Link } from "@tanstack/react-router";
import { type MouseEvent, useRef } from "react";
import {
	buttonClass,
	ExternalButton,
	RouteButton,
} from "@/components/site/button";
import { getFamily } from "@/content/services";
import type { TocEntry } from "@/features/blog/posts";
import { cn } from "@/lib/cn";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

const COPIED_FOR_MS = 1800;

/**
 * Corps de l'article, rendu en HTML côté serveur. Les boutons « Copier » des
 * blocs de code sont gérés par délégation d'événement : le HTML n'a pas
 * besoin d'être hydraté composant par composant.
 */
export function ArticleBody({ html }: { html: string }) {
	const timers = useRef(new WeakMap<HTMLElement, number>());

	const onClick = async (event: MouseEvent<HTMLDivElement>) => {
		const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
			"[data-copy-code]",
		);
		const code = button?.parentElement?.querySelector("pre");
		if (!button || !code) return;
		try {
			await navigator.clipboard.writeText(code.innerText);
			button.textContent = "Copié";
		} catch {
			button.textContent = "Échec";
		}
		window.clearTimeout(timers.current.get(button));
		timers.current.set(
			button,
			window.setTimeout(() => {
				button.textContent = "Copier";
			}, COPIED_FOR_MS),
		);
	};

	return (
		<div
			className="prose-article"
			onClick={onClick}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: HTML produit au build depuis les fichiers MDX du dépôt, jamais depuis une saisie utilisateur
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

export function TableOfContents({
	entries,
	className,
}: {
	entries: TocEntry[];
	className?: string;
}) {
	return (
		<nav aria-label="Sommaire" className={className}>
			<p className="eyebrow">Sommaire</p>
			<ol className="mt-4 grid gap-2 border-l border-line text-[0.94rem]">
				{entries.map((e) => (
					<li key={e.id} className={cn(e.depth === 3 && "pl-4")}>
						<a
							href={`#${e.id}`}
							className="-ml-px block border-l border-transparent pl-4 text-ink-soft transition-colors hover:border-signal hover:text-ink"
						>
							{e.text}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}

export function AuthorBox() {
	return (
		<aside
			aria-label="À propos de l'auteur"
			className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7"
		>
			<img
				src="/portrait.webp"
				alt="Nicolas Sans"
				width={72}
				height={72}
				loading="lazy"
				className="size-[72px] shrink-0 rounded-full object-cover"
			/>
			<div>
				<p className="font-semibold">Nicolas Sans</p>
				<p className="mt-1 text-[0.96rem] text-ink-soft">
					Ingénieur DevOps freelance. J'aide les équipes à mettre leurs
					applications en production sur une infrastructure fiable, hébergée en
					Europe.{" "}
					<Link
						to="/a-propos"
						className="font-medium text-signal underline-offset-4 hover:underline"
					>
						En savoir plus
					</Link>
				</p>
			</div>
		</aside>
	);
}

/** Appel à l'action discret, lié au service de l'article quand il en a un. */
export function PostCta({ service }: { service?: string }) {
	const family = service ? getFamily(service) : undefined;
	return (
		<aside className="rounded-2xl border border-signal/25 bg-signal-soft p-6 sm:p-8">
			<p className="eyebrow">Besoin d'un coup de main ?</p>
			<p className="mt-3 max-w-[56ch] text-[1.08rem]">
				{family
					? `C'est précisément ce que je fais pour mes clients : ${family.name.toLowerCase()}. Parlons de votre projet.`
					: "Je mets en production et j'exploite des applications pour des équipes qui veulent une infrastructure fiable, en Europe."}
			</p>
			<div className="mt-6 flex flex-wrap gap-3">
				{family ? (
					<Link to="/services" hash={family.slug} className={buttonClass()}>
						Voir la prestation <span aria-hidden="true">→</span>
					</Link>
				) : (
					<RouteButton to="/services">Voir les prestations</RouteButton>
				)}
				<ExternalButton href={BOOKING_URL} where="blog" variant="ghost">
					{BOOKING_LABEL}
				</ExternalButton>
			</div>
		</aside>
	);
}

/**
 * Encart de la colonne latérale : qui écrit, ce qu'il fait, et le lien vers
 * la prestation liée à l'article quand il y en a une.
 */
export function ServicesAside({ service }: { service?: string }) {
	const family = service ? getFamily(service) : undefined;
	return (
		<section
			aria-label="Travailler avec moi"
			className="rounded-2xl border border-signal/25 bg-signal-soft p-6"
		>
			<div className="flex items-center gap-3">
				<img
					src="/portrait.webp"
					alt=""
					width={44}
					height={44}
					loading="lazy"
					className="size-11 shrink-0 rounded-full object-cover"
				/>
				<p className="leading-tight">
					<span className="block font-semibold">Nicolas Sans</span>
					<span className="text-[0.88rem] text-ink-soft">DevOps freelance</span>
				</p>
			</div>
			<p className="mt-4 text-[0.95rem] text-ink-soft">
				Mise en production, Kubernetes, sécurité et auto-hébergement, sur une
				infrastructure européenne dont vous restez propriétaire.
			</p>
			<div className="mt-5 grid gap-2">
				{family ? (
					<Link
						to="/services"
						hash={family.slug}
						className={cn(buttonClass(), "w-full !text-[14px]")}
					>
						{family.name} <span aria-hidden="true">→</span>
					</Link>
				) : (
					<Link
						to="/services"
						className={cn(buttonClass(), "w-full !text-[14px]")}
					>
						Travailler avec moi <span aria-hidden="true">→</span>
					</Link>
				)}
				<ExternalButton
					href={BOOKING_URL}
					where="blog-aside"
					variant="ghost"
					className="w-full !text-[14px]"
				>
					Réserver un appel
				</ExternalButton>
			</div>
		</section>
	);
}
