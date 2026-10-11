import { Link } from "@tanstack/react-router";
import { ExternalButton } from "@/components/site/button";
import { Accent, Section } from "@/components/site/section";
import { steps } from "@/content/process";
import { ContactForm } from "@/features/contact/contact-form";
import { BOOKING_LABEL, BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

export function ContactSection() {
	return (
		<Section tone="alt" id="contact" labelledBy="contact-title">
			<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
				<div>
					<p className="eyebrow">Contact et réservation</p>
					<h2
						id="contact-title"
						className="mt-3 text-[length:var(--text-h2)] leading-[1.1]"
					>
						Échangeons sur votre projet.{" "}
						<Accent>Trente minutes suffisent.</Accent>
					</h2>
					<p className="mt-4 max-w-[52ch] text-[1.05rem] text-ink-soft">
						Appel gratuit et sans engagement pour cadrer votre besoin. Vous
						repartez avec une analyse argumentée et, le cas échéant, un devis
						ferme. Réponse sous 24 h ouvrées.
					</p>
					<div className="mt-6 flex flex-wrap items-center gap-4">
						<ExternalButton href={BOOKING_URL}>{BOOKING_LABEL}</ExternalButton>
						<a
							href={`mailto:${CONTACT_EMAIL}`}
							className="text-[15px] font-medium text-signal-deep underline underline-offset-4"
						>
							{CONTACT_EMAIL}
						</a>
					</div>

					<ol className="mt-10 grid gap-4">
						{steps.slice(0, 3).map((s, i) => (
							<li key={s.title} className="flex gap-4">
								<span className="grid size-8 shrink-0 place-items-center rounded-full bg-signal-soft text-[15px] font-bold text-signal">
									{i + 1}
								</span>
								<span>
									<span className="font-semibold">{s.title}.</span>{" "}
									<span className="text-ink-soft">{s.desc}</span>
								</span>
							</li>
						))}
					</ol>
					<p className="mt-8 text-[0.95rem] text-ink-soft">
						Vous êtes une agence ?{" "}
						<Link
							to="/agences"
							className="font-medium text-signal-deep underline underline-offset-4"
						>
							Infogérance en marque blanche
						</Link>
					</p>
				</div>
				<ContactForm />
			</div>
		</Section>
	);
}
