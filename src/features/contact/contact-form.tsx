import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { submitContact } from "@/features/contact/contact";
import {
	PROJECT_TYPE_LABELS,
	PROJECT_TYPES,
	type ProjectType,
} from "@/features/contact/validation";
import { CONTACT_EMAIL } from "@/lib/site";

const fieldClass =
	"w-full rounded-lg border border-line bg-card px-3.5 py-3 text-[0.95rem] outline-none transition placeholder:text-ink-soft/60 focus:border-signal focus:ring-2 focus:ring-signal/25 disabled:opacity-60";
const labelClass = "eyebrow";

type Props = { defaultProjectType?: ProjectType };

export function ContactForm({ defaultProjectType = "startup" }: Props) {
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
		projectType: defaultProjectType,
		website: "",
	});
	const [sent, setSent] = useState(false);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { success, error: toastError } = useToast();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setPending(true);
		setError(null);
		try {
			await submitContact({ data: form });
			success("Message envoyé. Réponse sous 24 h ouvrées.");
			setSent(true);
		} catch (err) {
			const msg = (
				err instanceof Error ? err.message : "Envoi impossible."
			).replace(/^VALIDATION_ERROR:\s*/, "");
			setError(msg);
			toastError(msg, "Votre message n'a pas pu être envoyé.");
		} finally {
			setPending(false);
		}
	};

	if (sent) {
		return (
			<div role="status" className="border border-signal/40 surface p-8">
				<h2 className=" text-[1.6rem] font-semibold">Message envoyé</h2>
				<p className="mt-2 text-ink-soft">
					Merci. Réponse sous 24 h ouvrées à l'adresse {form.email}.
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={onSubmit}
			aria-busy={pending}
			className="relative flex flex-col gap-5 surface p-6 sm:p-8"
		>
			<label className="flex flex-col gap-1.5">
				<span className={labelClass}>Vous êtes</span>
				<select
					disabled={pending}
					value={form.projectType}
					onChange={(e) =>
						setForm({ ...form, projectType: e.target.value as ProjectType })
					}
					className={fieldClass}
				>
					{PROJECT_TYPES.map((t) => (
						<option key={t} value={t}>
							{PROJECT_TYPE_LABELS[t]}
						</option>
					))}
				</select>
			</label>
			<label className="flex flex-col gap-1.5">
				<span className={labelClass}>Nom</span>
				<input
					required
					minLength={2}
					maxLength={80}
					autoComplete="name"
					disabled={pending}
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
					placeholder="Votre nom"
					className={fieldClass}
				/>
			</label>
			<label className="flex flex-col gap-1.5">
				<span className={labelClass}>Email</span>
				<input
					required
					type="email"
					autoComplete="email"
					disabled={pending}
					value={form.email}
					onChange={(e) => setForm({ ...form, email: e.target.value })}
					placeholder="vous@exemple.fr"
					className={fieldClass}
				/>
			</label>
			<label className="flex flex-col gap-1.5">
				<span className={labelClass}>Votre projet</span>
				<textarea
					required
					minLength={10}
					maxLength={4000}
					rows={5}
					disabled={pending}
					value={form.message}
					onChange={(e) => setForm({ ...form, message: e.target.value })}
					placeholder="Votre application, où elle est hébergée aujourd'hui, ce que vous attendez, vos délais…"
					className={`${fieldClass} resize-none`}
				/>
			</label>
			{/* Honeypot : invisible pour les humains, rempli par les robots. */}
			<div className="absolute -left-[9999px]" aria-hidden="true">
				<label>
					Ne pas remplir
					<input
						tabIndex={-1}
						autoComplete="off"
						value={form.website}
						onChange={(e) => setForm({ ...form, website: e.target.value })}
					/>
				</label>
			</div>
			{error && (
				<p role="alert" className="text-sm text-alert">
					{error}{" "}
					<a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
						{CONTACT_EMAIL}
					</a>
				</p>
			)}
			<p className="text-[12.5px] leading-relaxed text-ink-soft">
				Vos informations servent uniquement à vous répondre. Voir la{" "}
				<a href="/confidentialite" className="underline">
					politique de confidentialité
				</a>
				.
			</p>
			<button
				type="submit"
				disabled={pending}
				className="inline-flex items-center justify-center rounded-lg bg-signal px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep disabled:opacity-60"
			>
				{pending ? "Envoi…" : "Envoyer mon message"}
			</button>
		</form>
	);
}
