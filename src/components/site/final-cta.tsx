import { Glyph } from "@/components/services/glyph";
import { ExternalButton, RouteButton } from "@/components/site/button";
import { Decor } from "@/components/site/decor";
import { Accent, Container } from "@/components/site/section";
import { BOOKING_LABEL, BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

const PROMISES = [
	"Sans engagement",
	"En visioconférence",
	"Partout en France",
] as const;

/** Déroulé de l'appel de cadrage, par tranche de dix minutes. */
const AGENDA = [
	{
		from: "0",
		title: "Votre contexte",
		text: "Application, équipe, contraintes.",
	},
	{
		from: "10",
		title: "L'infrastructure cible",
		text: "Hébergement, sécurité, coûts.",
	},
	{
		from: "20",
		title: "Les prochaines étapes",
		text: "Priorités, calendrier.",
	},
] as const;

function CallCard() {
	return (
		<div className="relative mx-auto w-full max-w-[440px] lg:mr-0">
			<div
				aria-hidden="true"
				className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] rounded-2xl bg-ink/10"
			/>
			<article className="relative rounded-2xl border border-ink/10 bg-card p-6 shadow-[0_30px_60px_-30px_rgba(18,24,38,0.5)] sm:p-7">
				<span
					aria-hidden="true"
					className="absolute -top-4 -right-3 rotate-[8deg] rounded-xl bg-ink px-3.5 py-1.5 text-[13px] font-bold text-highlight shadow-lg"
				>
					Gratuit
				</span>
				<div className="flex items-center gap-3.5">
					<img
						src="/portrait.webp"
						alt=""
						width={48}
						height={48}
						loading="lazy"
						className="size-12 rounded-full object-cover ring-4 ring-highlight-soft"
					/>
					<div className="min-w-0">
						<h3 className="font-bold">Appel de cadrage</h3>
						<p className="flex items-center gap-1.5 text-[0.88rem] text-ink-soft">
							<Glyph name="users" className="size-3.5 text-signal" />
							30 min · avec Nicolas Sans
						</p>
					</div>
				</div>

				<div aria-hidden="true" className="mt-6 flex gap-[2px]">
					{AGENDA.map((a, i) => (
						<span
							key={a.from}
							className="h-1.5 flex-1 bg-signal first:rounded-l-full last:rounded-r-full"
							style={{ opacity: 1 - i * 0.25 }}
						/>
					))}
				</div>
				<ol className="mt-4 grid gap-4">
					{AGENDA.map((a) => (
						<li key={a.from} className="flex gap-3.5">
							<span className="tabular w-9 shrink-0 pt-0.5 text-[0.82rem] font-semibold text-signal-deep">
								{a.from}′
							</span>
							<span>
								<span className="block leading-tight font-semibold">
									{a.title}
								</span>
								<span className="block text-[0.88rem] text-ink-soft">
									{a.text}
								</span>
							</span>
						</li>
					))}
				</ol>

				<div className="mt-6 rounded-xl bg-highlight-soft p-4">
					<p className="text-[13px] font-semibold text-ink/70">
						Vous repartez avec
					</p>
					<ul className="mt-2 grid gap-1.5 text-[0.92rem]">
						<li className="flex gap-2.5">
							<Glyph name="check" className="mt-[0.2em] size-4 text-ok" />
							Une analyse argumentée de votre besoin
						</li>
						<li className="flex gap-2.5">
							<Glyph name="check" className="mt-[0.2em] size-4 text-ok" />
							Un devis ferme, le cas échéant
						</li>
					</ul>
				</div>
			</article>
		</div>
	);
}

export function FinalCta() {
	return (
		<section
			aria-labelledby="cta-title"
			className="relative overflow-clip bg-highlight py-[var(--space-section)]"
		>
			<Decor variant="rings" />
			<Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
				<div>
					<p className="eyebrow !text-ink/70">Prochaine étape</p>
					<h2
						id="cta-title"
						className="mt-4 text-[clamp(2.3rem,1.4rem+3.6vw,4.2rem)] leading-[1.02]"
					>
						Parlons de votre projet.{" "}
						<Accent onHighlight>Un premier échange de 30 minutes.</Accent>
					</h2>
					<p className="mt-6 max-w-[52ch] text-[1.08rem] text-ink/75">
						Un échange pour comprendre votre application et poser
						l'infrastructure qui lui convient, avant tout engagement.
					</p>

					<ul className="mt-7 flex flex-wrap gap-2">
						{PROMISES.map((p) => (
							<li
								key={p}
								className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-[0.88rem] font-semibold"
							>
								<Glyph name="check" className="size-3.5 text-ok" />
								{p}
							</li>
						))}
					</ul>

					<div className="mt-9 flex flex-wrap gap-3">
						<ExternalButton href={BOOKING_URL} where="final-cta" variant="ink">
							{BOOKING_LABEL}
						</ExternalButton>
						<RouteButton to="/contact" variant="ghost">
							Écrire un message
						</RouteButton>
					</div>
					<p className="mt-5 text-[0.92rem] text-ink/70">
						Ou directement :{" "}
						<a
							href={`mailto:${CONTACT_EMAIL}`}
							className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
						>
							{CONTACT_EMAIL}
						</a>
					</p>
				</div>

				<CallCard />
			</Container>
		</section>
	);
}
