import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/toast";
import { submitContact } from "@/features/contact/contact";

function ContactModal({
	open,
	setOpen,
	form,
	setForm,
	sent,
	pending,
	error,
	onSubmit,
}: {
	open: boolean;
	setOpen: (v: boolean) => void;
	form: { name: string; email: string; message: string };
	setForm: (v: { name: string; email: string; message: string }) => void;
	sent: boolean;
	pending: boolean;
	error: string | null;
	onSubmit: (e: React.FormEvent) => void;
}) {
	if (!open) return null;
	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={() => setOpen(false)}
						className="fixed inset-0 z-[80] bg-primary/40 backdrop-blur-sm"
						aria-hidden="true"
					/>
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.98 }}
						transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
						className="fixed inset-0 z-[81] grid place-items-center p-4 pointer-events-none"
					>
						<div className="pointer-events-auto w-full max-w-140 bg-white rounded-[1.8rem] border border-line shadow-[0_24px_64px_rgba(12,46,61,0.18)] overflow-hidden">
							<div className="px-6 sm:px-8 pt-7 pb-4 flex items-start justify-between gap-4 border-b border-line/60">
								<div>
									<h3 className="mt-1 font-display font-bold tracking-[-0.02em] text-[20px] leading-none">
										Contacter moi
									</h3>
									<p className="mt-1.5 font-display text-sm opacity-60">
										Je vous recontacte en général sous 24h ou écrivez moi
										directement:{" "}
										<a
											href="mailto:nicolas.sansd@gmail.com"
											className="text-primary hover:underline"
										>
											nicolas.sansd@gmail.com
										</a>
									</p>
								</div>
								<button
									type="button"
									onClick={() => setOpen(false)}
									aria-label="Fermer"
									className="w-8 h-8 rounded-full border border-line grid place-items-center hover:bg-paper transition"
								>
									✕
								</button>
							</div>
							<form
								onSubmit={onSubmit}
								aria-busy={pending}
								className="px-6 sm:px-8 py-6 flex flex-col gap-5"
							>
								<label className="flex flex-col gap-1.5">
									<span className="text-[10px] tracking-[0.14em] font-medium opacity-50">
										Nom
									</span>
									<input
										required
										disabled={pending || sent}
										value={form.name}
										onChange={(e) => setForm({ ...form, name: e.target.value })}
										placeholder="Votre nom"
										className="w-full bg-surface border border-line rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-primary/25 focus:bg-white transition placeholder:opacity-40 disabled:opacity-60"
									/>
								</label>
								<label className="flex flex-col gap-1.5">
									<span className="text-[10px] tracking-[0.14em] font-medium opacity-50">
										Email
									</span>
									<input
										required
										type="email"
										disabled={pending || sent}
										value={form.email}
										onChange={(e) =>
											setForm({ ...form, email: e.target.value })
										}
										placeholder="vous@exemple.com"
										className="w-full bg-surface border border-line rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-primary/25 focus:bg-white transition placeholder:opacity-40 disabled:opacity-60"
									/>
								</label>
								<label className="flex flex-col gap-1.5">
									<span className="text-[10px] tracking-[0.14em] font-medium opacity-50">
										Message
									</span>
									<textarea
										required
										rows={4}
										disabled={pending || sent}
										value={form.message}
										onChange={(e) =>
											setForm({ ...form, message: e.target.value })
										}
										placeholder="Contexte, objectifs, budget / timing..."
										className="w-full bg-surface border border-line rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-primary/25 focus:bg-white transition placeholder:opacity-40 resize-none disabled:opacity-60"
									/>
								</label>
								{error ? (
									<p role="alert" className="text-sm text-red-600 font-display">
										{error.replace(/^VALIDATION_ERROR:\s*/, "")}
									</p>
								) : null}
								<button
									type="submit"
									disabled={pending || sent}
									className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium transition-colors disabled:opacity-60 ${sent ? "bg-forest text-white" : "bg-primary text-white hover:bg-black"}`}
								>
									{pending ? "Envoi…" : sent ? "✓ Envoyé" : "Envoyer →"}
								</button>
							</form>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

export function Contact() {
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [sent, setSent] = useState(false);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const timeoutRef = useRef<number | undefined>(undefined);
	const { success, error: toastError } = useToast();

	useEffect(
		() => () => {
			clearTimeout(timeoutRef.current);
		},
		[],
	);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setPending(true);
		setError(null);
		try {
			await submitContact({
				data: {
					name: form.name.trim(),
					email: form.email.trim(),
					message: form.message.trim(),
				},
			});
			success("Message envoyé, je vous recontacte sous 24h.");
			setSent(true);
			timeoutRef.current = window.setTimeout(() => {
				setSent(false);
				setOpen(false);
				setForm({ name: "", email: "", message: "" });
			}, 1400);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Envoi échoué";
			setError(msg);
			toastError(
				msg.replace(/^VALIDATION_ERROR:\s*/, ""),
				"Veuillez corriger le formulaire.",
			);
		} finally {
			setPending(false);
		}
	};

	return (
		<>
			<section
				id="contact"
				className="max-w-[760px] mx-auto px-6 py-16 lg:py-22"
			>
				<div className="text-center">
					<h2 className="mt-4 font-display font-bold tracking-[-0.04em] text-[32px] lg:text-[46px] leading-[0.92]">
						Un projet en tête ?
						<br />
						<span className="font-serif italic font-normal text-accent">
							Concrétisons-le ensemble.
						</span>
					</h2>
					<p className="mt-4 text-[15px] leading-relaxed opacity-60">
						Réponse sous 24h
					</p>
					<div className="mt-8 flex flex-col items-center gap-3">
						<button
							type="button"
							onClick={() => setOpen(true)}
							className="group inline-flex items-center gap-2 bg-primary text-white rounded-full pl-6 pr-1.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-black transition-colors shadow-[0_8px_24px_rgba(12,46,61,0.16)]"
						>
							<span>Me contacter</span>
							<span className="w-8 h-8 rounded-full bg-white text-primary grid place-items-center group-hover:bg-paper transition-colors">
								<svg
									width="14"
									height="14"
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.7"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M4 8h8" />
									<path d="M8 4 12.5 8 8 12" />
								</svg>
							</span>
						</button>
					</div>
					<div className="mt-8 flex flex-wrap justify-center gap-2">
						<a
							href="https://linkedin.com/in/nicosans/"
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-1.5 bg-white border border-line rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:border-primary/15 transition shadow-sm"
						>
							<img src="/icons/linkedin.png" alt="" width={14} height={14} />
							LinkedIn
						</a>
						<a
							href="https://github.com/frnikho"
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-1.5 bg-white border border-line rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:border-primary/15 transition shadow-sm"
						>
							<img src="/github.png" alt="" width={14} height={14} />
							GitHub
						</a>
					</div>
				</div>
			</section>

			<ContactModal
				open={open}
				setOpen={setOpen}
				form={form}
				setForm={setForm}
				sent={sent}
				pending={pending}
				error={error}
				onSubmit={onSubmit}
			/>
		</>
	);
}
