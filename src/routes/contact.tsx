import { createFileRoute } from "@tanstack/react-router";
import { Glyph } from "@/components/services/glyph";
import { Decor } from "@/components/site/decor";
import { FaqSection } from "@/components/site/faq-section";
import { PageShell } from "@/components/site/page-shell";
import { Accent, Container } from "@/components/site/section";
import { faq } from "@/content/faq";
import { type Offer, offers } from "@/content/offers";
import { ContactForm } from "@/features/contact/contact-form";
import type { ProjectType } from "@/features/contact/validation";
import { cn } from "@/lib/cn";
import { faqJsonLd } from "@/lib/jsonld";
import { buildHead } from "@/lib/seo";
import {
	BOOKING_LABEL,
	BOOKING_URL,
	CONTACT_EMAIL,
	SOCIAL_LINKS,
} from "@/lib/site";

type ContactSearch = { offre?: string; estimation?: string };

const MAX_ESTIMATION_LENGTH = 600;

const SOCIALS = [
	{ label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
	{ label: "Malt", href: SOCIAL_LINKS.malt },
	{ label: "GitHub", href: SOCIAL_LINKS.github },
] as const;

export const Route = createFileRoute("/contact")({
	validateSearch: (search: Record<string, unknown>): ContactSearch => ({
		offre: typeof search.offre === "string" ? search.offre : undefined,
		estimation:
			typeof search.estimation === "string"
				? search.estimation.slice(0, MAX_ESTIMATION_LENGTH)
				: undefined,
	}),
	head: () =>
		buildHead({
			title: "Contact : échangeons sur votre infrastructure | Nicolas Sans",
			description:
				"Décrivez votre projet : développement, mise en production, migration, sécurité ou maintenance. Réponse sous 24 h ouvrées, partout en France.",
			canonical: "/contact",
		}),
	component: ContactPage,
});

const NEXT_STEPS = [
	{
		title: "Je lis votre message",
		text: "Réponse sous 24 h ouvrées, avec des questions de cadrage.",
	},
	{
		title: "Appel de cadrage",
		text: "30 minutes en visioconférence pour comprendre votre application.",
	},
	{
		title: "Devis ferme",
		text: "Un périmètre et un prix clairs, sans engagement de votre part.",
	},
] as const;

const channelBase =
	"group relative flex h-full flex-col rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.4)]";

function Channels() {
	return (
		<ul className="mt-12 grid gap-4 md:grid-cols-3">
			<li>
				<a
					href={BOOKING_URL}
					target="_blank"
					rel="noopener noreferrer"
					data-umami-event="booking-click"
					data-umami-event-location="contact-page"
					className={cn(channelBase, "border-ink bg-ink text-night-ink")}
				>
					<span className="grid size-11 place-items-center rounded-xl bg-highlight text-ink">
						<Glyph name="users" />
					</span>
					<span className="mt-5 text-[1.2rem] font-bold">
						Réserver un appel
					</span>
					<span className="mt-1 text-[0.93rem] text-night-soft">
						30 minutes en visio, gratuit. Le plus rapide pour cadrer.
					</span>
					<span className="mt-5 inline-flex items-center gap-2 text-[0.93rem] font-semibold text-highlight">
						{BOOKING_LABEL}
						<span
							aria-hidden="true"
							className="transition-transform group-hover:translate-x-0.5"
						>
							↗
						</span>
					</span>
				</a>
			</li>
			<li>
				<a
					href="#formulaire"
					className={cn(
						channelBase,
						"border-line bg-card hover:border-signal/50",
					)}
				>
					<span className="grid size-11 place-items-center rounded-xl bg-signal-soft text-signal">
						<Glyph name="file" />
					</span>
					<span className="mt-5 text-[1.2rem] font-bold">
						Écrire un message
					</span>
					<span className="mt-1 text-[0.93rem] text-ink-soft">
						Décrivez votre besoin, réponse sous 24 h ouvrées.
					</span>
					<span className="mt-5 inline-flex items-center gap-2 text-[0.93rem] font-semibold text-signal-deep">
						Remplir le formulaire
						<span
							aria-hidden="true"
							className="transition-transform group-hover:translate-y-0.5"
						>
							↓
						</span>
					</span>
				</a>
			</li>
			<li>
				<a
					href={`mailto:${CONTACT_EMAIL}`}
					className={cn(
						channelBase,
						"border-line bg-card hover:border-signal/50",
					)}
				>
					<span className="grid size-11 place-items-center rounded-xl bg-signal-soft text-signal">
						<Glyph name="bell" />
					</span>
					<span className="mt-5 text-[1.2rem] font-bold">Par e-mail</span>
					<span className="mt-1 text-[0.93rem] text-ink-soft">
						Avec vos pièces jointes, schémas ou cahier des charges.
					</span>
					<span className="mt-5 inline-flex items-center gap-2 text-[0.93rem] font-semibold text-signal-deep">
						{CONTACT_EMAIL}
					</span>
				</a>
			</li>
		</ul>
	);
}

function Attachments({
	offer,
	estimation,
}: {
	offer?: Offer;
	estimation?: string;
}) {
	if (!offer && !estimation) return null;
	return (
		<div className="mb-5 grid gap-3">
			{offer && (
				<p className="flex items-center gap-3 rounded-xl border border-signal/30 bg-signal-soft px-4 py-3 text-[0.93rem]">
					<Glyph name="check" className="size-4 text-signal" />
					<span>
						Formule sélectionnée : <strong>{offer.name}</strong>
						{!offer.quote && (
							<span className="text-ink-soft">
								{" "}
								({offer.prefix} {offer.price})
							</span>
						)}
					</span>
				</p>
			)}
			{estimation && (
				<div className="flex gap-3 rounded-xl border border-line bg-paper-2 px-4 py-3 text-[0.9rem]">
					<Glyph name="cpu" className="mt-0.5 size-4 text-signal" />
					<p>
						<strong>Estimation jointe</strong>
						<span className="text-ink-soft">
							{" "}
							: elle est déjà dans votre message, complétez-la si besoin.
						</span>
					</p>
				</div>
			)}
		</div>
	);
}

function ContactPage() {
	const { offre, estimation } = Route.useSearch();
	const defaultProjectType: ProjectType =
		offre === "agence" ? "agence" : "startup";
	const offer =
		offre && offre !== "agence"
			? offers.find((o) => o.id === offre)
			: undefined;
	return (
		<PageShell>
			<section className="under-nav relative overflow-clip border-b border-line">
				<Decor variant="hero" />
				<Container className="py-16 lg:py-20">
					<p className="eyebrow">Contact</p>
					<h1 className="mt-5 max-w-[20ch] text-[clamp(2.3rem,1.4rem+3.6vw,4.2rem)] leading-[1.02]">
						Échangeons sur <Accent>votre projet.</Accent>
					</h1>
					<p className="mt-6 max-w-[56ch] text-[1.1rem] text-ink-soft">
						Trois façons de me joindre, selon votre préférence. Le premier
						échange est gratuit et sans engagement.
					</p>
					<Channels />
				</Container>
			</section>

			<Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 lg:py-24">
				<div id="formulaire" className="scroll-mt-28">
					<h2 className="text-[length:var(--text-h2)] leading-[1.1]">
						Décrivez votre besoin
					</h2>
					<p className="mt-3 mb-8 text-ink-soft">
						Quelques lignes suffisent : je reviens vers vous avec des questions
						précises.
					</p>
					<Attachments offer={offer} estimation={estimation} />
					<ContactForm
						defaultProjectType={defaultProjectType}
						defaultMessage={estimation}
					/>
				</div>

				<aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
					<div className="rounded-2xl bg-signal-soft p-6 sm:p-7">
						<h2 className="text-[1.15rem] font-bold">Et ensuite ?</h2>
						<ol className="mt-5 grid gap-5">
							{NEXT_STEPS.map((s, i) => (
								<li key={s.title} className="relative flex gap-4">
									{i < NEXT_STEPS.length - 1 && (
										<span
											aria-hidden="true"
											className="absolute top-9 bottom-[-1.25rem] left-4 w-px bg-signal/25"
										/>
									)}
									<span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-signal text-[14px] font-bold text-white">
										{i + 1}
									</span>
									<span>
										<span className="block font-semibold">{s.title}</span>
										<span className="block text-[0.9rem] text-ink-soft">
											{s.text}
										</span>
									</span>
								</li>
							))}
						</ol>
					</div>

					<div className="surface p-6">
						<div className="flex items-center gap-3.5">
							<img
								src="/portrait.webp"
								alt=""
								width={52}
								height={52}
								loading="lazy"
								className="size-13 rounded-full object-cover"
							/>
							<p className="leading-tight">
								<span className="block font-semibold">Nicolas Sans</span>
								<span className="text-[0.9rem] text-ink-soft">
									DevOps freelance, à distance partout en France
								</span>
							</p>
						</div>
						<ul className="mt-5 flex flex-wrap gap-2">
							{SOCIALS.map((l) => (
								<li key={l.label}>
									<a
										href={l.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.88rem] font-medium transition-colors hover:border-signal hover:text-signal-deep"
									>
										{l.label} <span aria-hidden="true">↗</span>
									</a>
								</li>
							))}
						</ul>
					</div>

					<p className="flex gap-3 px-1 text-[13px] leading-relaxed text-ink-soft">
						<Glyph name="lock" className="mt-0.5 size-4 text-ok" />
						Vos données ne servent qu'à vous répondre. Mesure d'audience
						anonyme, auto-hébergée et sans cookie ; aucune police externe, aucun
						script tiers.
					</p>
				</aside>
			</Container>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
			/>
			<FaqSection />
		</PageShell>
	);
}
