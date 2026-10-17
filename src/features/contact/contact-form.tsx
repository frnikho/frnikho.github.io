import { useState } from "react";
import type { IconName } from "@/components/diagrams/types";
import { Glyph } from "@/components/services/glyph";
import { useToast } from "@/components/ui/toast";
import { submitContact } from "@/features/contact/contact";
import {
	PROJECT_TYPE_LABELS,
	PROJECT_TYPES,
	type ProjectType,
} from "@/features/contact/validation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { CONTACT_EMAIL } from "@/lib/site";

const fieldClass =
	"w-full rounded-lg border border-line bg-card px-3.5 py-3 text-[0.95rem] outline-none transition placeholder:text-ink-soft/60 focus:border-signal focus:ring-2 focus:ring-signal/25 disabled:opacity-60";
const labelClass = "text-[0.92rem] font-semibold";

const MESSAGE_MAX = 4000;

/** Présentation des types de projet en cartes : titre court et précision. */
const PROJECT_TYPE_CARDS: Record<
	ProjectType,
	{ title: string; hint: string; icon: IconName }
> = {
	startup: {
		title: "Startup ou PME",
		hint: "Une application à mettre en ligne ou fiabiliser",
		icon: "zap",
	},
	"appli-ia": {
		title: "Application IA",
		hint: "Créée avec Lovable, Bolt ou Supabase",
		icon: "box",
	},
	agence: {
		title: "Agence ou freelance",
		hint: "Sous-traitance, marque blanche",
		icon: "users",
	},
	autre: { title: "Autre", hint: "Association, collectivité…", icon: "file" },
};

/** Ordre d'affichage : le cas le plus courant d'abord. */
const CARD_ORDER: ProjectType[] = ["startup", "appli-ia", "agence", "autre"];

const HINTS = [
	"Où l'application est hébergée aujourd'hui",
	"Ce qui coince ou ce que vous visez",
	"Vos délais",
] as const;

type Props = { defaultProjectType?: ProjectType; defaultMessage?: string };

function ProjectTypePicker({
	value,
	disabled,
	onChange,
}: {
	value: ProjectType;
	disabled: boolean;
	onChange: (t: ProjectType) => void;
}) {
	return (
		<fieldset className="grid gap-2.5">
			<legend className={cn(labelClass, "mb-2.5")}>Vous êtes</legend>
			<div className="grid gap-2.5 sm:grid-cols-2">
				{CARD_ORDER.filter((t) => PROJECT_TYPES.includes(t)).map((t) => {
					const card = PROJECT_TYPE_CARDS[t];
					const checked = value === t;
					return (
						<label
							key={t}
							className={cn(
								"flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
								checked
									? "border-signal bg-signal-soft"
									: "border-line bg-card hover:border-signal/50",
								disabled && "cursor-not-allowed opacity-60",
							)}
						>
							<input
								type="radio"
								name="projectType"
								value={t}
								checked={checked}
								disabled={disabled}
								onChange={() => onChange(t)}
								aria-label={PROJECT_TYPE_LABELS[t]}
								className="peer sr-only"
							/>
							<span
								className={cn(
									"grid size-9 shrink-0 place-items-center rounded-lg transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-signal",
									checked ? "bg-signal text-white" : "bg-paper-2 text-signal",
								)}
							>
								<Glyph name={card.icon} className="size-4" />
							</span>
							<span className="min-w-0">
								<span className="block text-[0.93rem] leading-tight font-semibold">
									{card.title}
								</span>
								<span className="block text-[0.8rem] leading-snug text-ink-soft">
									{card.hint}
								</span>
							</span>
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}

function Sent({ email }: { email: string }) {
	return (
		<div role="status" className="surface rise-in p-8 sm:p-10">
			<span className="grid size-14 place-items-center rounded-2xl bg-ok/10 text-ok">
				<Glyph name="check" className="size-7" />
			</span>
			<h2 className="mt-5 text-[1.7rem] font-bold">Message envoyé</h2>
			<p className="mt-2 max-w-[48ch] text-ink-soft">
				Merci. Réponse sous 24 h ouvrées à l'adresse{" "}
				<strong className="text-ink">{email}</strong>, avec des questions de
				cadrage et une première estimation.
			</p>
			<p className="mt-6 text-[0.92rem] text-ink-soft">
				Rien reçu ? Vérifiez vos indésirables ou écrivez à{" "}
				<a
					className="font-semibold text-signal-deep underline underline-offset-4"
					href={`mailto:${CONTACT_EMAIL}`}
				>
					{CONTACT_EMAIL}
				</a>
				.
			</p>
		</div>
	);
}

export function ContactForm({
	defaultProjectType = "startup",
	defaultMessage = "",
}: Props) {
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: defaultMessage,
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
			trackEvent("contact-submit", { type: form.projectType });
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

	if (sent) return <Sent email={form.email} />;

	return (
		<form
			onSubmit={onSubmit}
			aria-busy={pending}
			className="surface relative flex flex-col gap-6 p-6 sm:p-8"
		>
			<ProjectTypePicker
				value={form.projectType}
				disabled={pending}
				onChange={(projectType) => setForm({ ...form, projectType })}
			/>
			<div className="grid gap-5 sm:grid-cols-2">
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
			</div>
			<label className="flex flex-col gap-1.5">
				<span className="flex items-baseline justify-between gap-4">
					<span className={labelClass}>Votre projet</span>
					<span
						className={cn(
							"tabular text-[12px]",
							form.message.length > MESSAGE_MAX * 0.9
								? "text-alert"
								: "text-ink-soft",
						)}
					>
						{form.message.length} / {MESSAGE_MAX}
					</span>
				</span>
				<textarea
					required
					minLength={10}
					maxLength={MESSAGE_MAX}
					rows={6}
					disabled={pending}
					value={form.message}
					onChange={(e) => setForm({ ...form, message: e.target.value })}
					placeholder="Votre application, où elle est hébergée aujourd'hui, ce que vous attendez, vos délais…"
					className={cn(fieldClass, "resize-y")}
				/>
				<span className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] text-ink-soft">
					Pour une réponse précise :
					{HINTS.map((h) => (
						<span key={h} className="rounded-full bg-paper-2 px-2 py-0.5">
							{h}
						</span>
					))}
				</span>
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
				<p
					role="alert"
					className="rounded-lg border border-alert/30 bg-[#fff4ed] px-4 py-3 text-sm text-alert"
				>
					{error}{" "}
					<a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
						{CONTACT_EMAIL}
					</a>
				</p>
			)}
			<div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-[12.5px] leading-relaxed text-ink-soft sm:max-w-[38ch]">
					Vos informations servent uniquement à vous répondre. Voir la{" "}
					<a href="/confidentialite" className="underline">
						politique de confidentialité
					</a>
					.
				</p>
				<button
					type="submit"
					disabled={pending}
					className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-signal px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-signal-deep disabled:opacity-60"
				>
					{pending ? "Envoi…" : "Envoyer mon message"}
					{!pending && (
						<span
							aria-hidden="true"
							className="transition-transform duration-150 group-hover:translate-x-0.5"
						>
							→
						</span>
					)}
				</button>
			</div>
		</form>
	);
}
