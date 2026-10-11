import { ExternalButton, RouteButton } from "@/components/site/button";
import { Decor } from "@/components/site/decor";
import { PortraitOrbit } from "@/components/site/portrait-orbit";
import { Accent, Container } from "@/components/site/section";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

const facts = [
	{ value: "5+", label: "ans d'expérience" },
	{ value: "99,9 %", label: "d'objectif de disponibilité" },
	{ value: "Kubernetes", label: "opéré en production" },
	{ value: "Données souveraines", label: "Hébergement UE et conformité RGPD" },
] as const;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
	return (
		<section
			aria-labelledby="hero-title"
			className="relative overflow-clip bg-paper"
		>
			<Decor variant="hero" shapes={false} />
			<Container className="grid items-center gap-10 pt-10 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-16 lg:pb-16">
				<div>
					<p className="rise-in eyebrow">
						Ingénieur DevOps et fullstack · Freelance · 100 % à distance
					</p>
					<h1
						id="hero-title"
						className="rise-in mt-3 text-[clamp(2.6rem,1.4rem+4.2vw,4.4rem)] leading-[1.04]"
						style={delay(60)}
					>
						Nicolas Sans
					</h1>
					<p
						className="rise-in mt-5 max-w-[28ch] text-[clamp(1.4rem,1rem+1.4vw,2rem)] leading-[1.25] font-semibold"
						style={delay(120)}
					>
						Infrastructure souveraine,{" "}
						<Accent>sécurité et conformité RGPD.</Accent>
					</p>
					<p
						className="rise-in mt-5 max-w-[54ch] text-[1.1rem] leading-relaxed text-ink-soft"
						style={delay(180)}
					>
						Ingénieur certifié RNCP 35075, spécialisé en infrastructure.
						Conception, déploiement et exploitation de plateformes applicatives,
						de l'application jusqu'au serveur, sur une infrastructure européenne
						dont vous restez propriétaire.
					</p>

					<div className="rise-in mt-8 flex flex-wrap gap-3" style={delay(240)}>
						<ExternalButton href={BOOKING_URL} where="hero">
							{BOOKING_LABEL}
						</ExternalButton>
						<RouteButton to="/" hash="expertise" variant="ghost">
							Expertise et services
						</RouteButton>
					</div>
				</div>

				<div
					className="rise-in relative mx-auto w-full max-w-[26rem] py-16 lg:max-w-none"
					style={delay(140)}
				>
					<PortraitOrbit />
					<picture>
						<source srcSet="/portrait.webp" type="image/webp" />
						<img
							src="/portrait.jpg"
							alt="Portrait de Nicolas Sans"
							width={960}
							height={1063}
							fetchPriority="high"
							decoding="async"
							className="relative aspect-[4/4.4] w-full rounded-3xl object-cover object-[50%_20%] shadow-[var(--shadow-card)]"
						/>
					</picture>
				</div>
			</Container>

			<Container className="pb-12">
				<dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 lg:grid-cols-4">
					{facts.map((f) => (
						<div key={f.label}>
							<dt className="text-[1.35rem] leading-tight font-bold">
								{f.value}
							</dt>
							<dd className="text-[0.95rem] text-ink-soft">{f.label}</dd>
						</div>
					))}
				</dl>
			</Container>
		</section>
	);
}
