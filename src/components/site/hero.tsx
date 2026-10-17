import { Link } from "@tanstack/react-router";
import { Glyph } from "@/components/services/glyph";
import { ABOUT_ANCHOR } from "@/components/site/about-brief";
import { ExternalButton, RouteButton } from "@/components/site/button";
import { JellyField } from "@/components/site/jelly-field";
import { PortraitOrbit } from "@/components/site/portrait-orbit";
import { Accent, Container } from "@/components/site/section";
import { servicePoles } from "@/content/service-poles";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

/** Expérience en chiffres, chacun sur une tuile d'une teinte pastel du thème. */
const facts = [
	{
		value: "5+ ans",
		label: "en production, en freelance et en entreprise",
		tint: "bg-signal-soft",
	},
	{
		value: "Epitech",
		label: "RNCP 35075, Expert en Technologies de l'Information",
		tint: "bg-pastel-lilac",
	},
	{
		value: "Du code au serveur",
		label: "développement, infrastructure et exploitation",
		tint: "bg-pastel-green",
	},
] as const;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * Présentation du portrait : `compact` (photo réduite, carte jaune derrière)
 * ou `orbit` (grande photo entourée de l'orbite animée et de ses pastilles).
 */
const PORTRAIT_STYLE: "compact" | "orbit" = "compact";

function PortraitImage({ className }: { className?: string }) {
	return (
		<picture>
			<source srcSet="/portrait.webp" type="image/webp" />
			<img
				src="/portrait.jpg"
				alt="Portrait de Nicolas Sans"
				width={960}
				height={1063}
				fetchPriority="high"
				decoding="async"
				className={`relative aspect-[4/4.4] w-full rounded-3xl object-cover object-[50%_20%] shadow-[var(--shadow-card)] ${className ?? ""}`}
			/>
		</picture>
	);
}

/** Carte jaune décalée derrière le portrait, comme une photo collée. */
function Sticker({ className }: { className: string }) {
	return (
		<div
			aria-hidden="true"
			className={`absolute translate-x-3 translate-y-3 rotate-3 rounded-3xl bg-highlight ${className}`}
		/>
	);
}

function Portrait() {
	if (PORTRAIT_STYLE === "orbit") {
		return (
			<div
				className="rise-in relative mx-auto w-full max-w-[26rem] py-16 lg:max-w-none"
				style={delay(140)}
			>
				<PortraitOrbit />
				<Sticker className="inset-x-0 inset-y-16" />
				<PortraitImage />
			</div>
		);
	}
	return (
		<div
			className="rise-in relative mx-auto w-full max-w-[15rem] sm:max-w-[17rem] lg:mr-[8%] lg:ml-auto lg:max-w-[19rem]"
			style={delay(140)}
		>
			<Sticker className="inset-0" />
			<PortraitImage />
		</div>
	);
}

export function Hero() {
	return (
		<section
			aria-labelledby="hero-title"
			className="under-nav relative isolate overflow-clip bg-paper"
		>
			<JellyField />
			<Container className="grid items-center gap-10 pt-10 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-14 lg:pb-16">
				<div>
					<p className="rise-in inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-[0.88rem] font-semibold text-signal-deep backdrop-blur">
						<span
							aria-hidden="true"
							className="size-2 rounded-full bg-ok shadow-[0_0_0_3px_rgba(15,122,84,0.15)]"
						/>
						Disponible en freelance · 100 % à distance, partout en France
					</p>
					<h1 id="hero-title" className="mt-3">
						<span
							className="rise-in block text-[clamp(2.6rem,1.4rem+4.2vw,4.4rem)] leading-[1.04]"
							style={delay(60)}
						>
							Nicolas Sans
						</span>
						<span
							className="rise-in mt-5 block max-w-[28ch] text-[clamp(1.4rem,1rem+1.4vw,2rem)] leading-[1.25] font-semibold"
							style={delay(120)}
						>
							Ingénieur <Accent>DevOps et fullstack.</Accent>
						</span>
					</h1>
					<p
						className="rise-in mt-5 max-w-[54ch] text-[1.1rem] leading-relaxed text-ink-soft"
						style={delay(180)}
					>
						Je développe, mets en production et exploite vos applications de
						bout en bout, du code jusqu'au serveur, sur une infrastructure
						européenne dont vous restez propriétaire.
					</p>

					<div className="rise-in mt-6" style={delay(210)}>
						<p className="text-[0.88rem] font-semibold text-ink-soft">
							Ce que je fais
						</p>
						<ul className="mt-2.5 flex flex-wrap gap-2">
							{servicePoles.map((p) => (
								<li key={p.id}>
									<Link
										to="/services"
										hash={p.id}
										className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-[0.9rem] font-semibold backdrop-blur transition-colors hover:border-signal/50 hover:text-signal-deep"
									>
										<Glyph name={p.icon} className="size-4 text-signal" />
										{p.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="rise-in mt-8 flex flex-wrap gap-3" style={delay(270)}>
						<ExternalButton href={BOOKING_URL} where="hero">
							{BOOKING_LABEL}
						</ExternalButton>
						<RouteButton to="/" hash={ABOUT_ANCHOR} variant="ghost">
							Découvrir mon parcours
						</RouteButton>
					</div>
				</div>

				<Portrait />
			</Container>

			<Container className="pb-12">
				<h2 className="mb-3 text-[0.88rem] font-semibold text-ink-soft">
					Expérience
				</h2>
				<dl className="grid gap-3 sm:grid-cols-3 sm:gap-4">
					{facts.map((f) => (
						<div key={f.label} className={`rounded-2xl p-5 ${f.tint}`}>
							<dt className="text-[1.35rem] leading-tight font-bold">
								{f.value}
							</dt>
							<dd className="mt-1 text-[0.95rem] text-ink-soft">{f.label}</dd>
						</div>
					))}
				</dl>
			</Container>
		</section>
	);
}
