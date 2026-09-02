import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "@/features/home/components/section-header";
import { services } from "@/features/home/data/services";

export function Services() {
	const [open, setOpen] = useState("01");
	return (
		<section id="services" className="max-w-275 mx-auto px-6 py-16 lg:py-22">
			<SectionHeader
				prefix="Mes"
				accent="Services"
				description={
					<>
						Mon expertise ainsi que mes compétences techniques me permettent{" "}
						<br />
						de vous accompagner sur l’ensemble de votre projet, de la conception
						à la mise en production.
					</>
				}
			/>
			<div className="mt-10 bg-white rounded-[2rem] border border-line overflow-hidden shadow-[0_16px_40px_rgba(12,46,61,0.06)]">
				{services.map((s) => {
					const isOpen = open === s.n;
					return (
						<div key={s.n} className="border-b last:border-0 border-line/60">
							<button
								type="button"
								onClick={() => setOpen(isOpen ? "" : s.n)}
								className="w-full flex items-center gap-4 lg:gap-5 p-5 lg:p-7 text-left hover:bg-surface/60 transition group"
							>
								<span className="relative w-14 h-14 rounded-2xl bg-surface border border-line grid place-items-center shrink-0">
									<img
										src={s.icon}
										alt=""
										width={26}
										height={26}
										className="object-contain"
									/>
									<span
										className="absolute -top-2 -left-2 w-6 h-6 rounded-full grid place-items-center font-mono text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border-2 border-white"
										style={{ background: s.accent }}
									>
										{s.n}
									</span>
								</span>
								<div className="flex-1 min-w-0">
									<h3 className="font-display font-semibold text-[17px] leading-tight">
										{s.title}
									</h3>
									<p className="font-display text-sm leading-relaxed opacity-60 mt-1 max-w-[52ch]">
										{s.desc}
									</p>
								</div>
								<span
									className={`w-9 h-9 rounded-full grid place-items-center border text-sm shrink-0 transition ${isOpen ? "bg-primary text-white border-primary" : "bg-white border-line text-primary group-hover:border-primary/15"}`}
								>
									<span
										className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
									>
										{isOpen ? "×" : "+"}
									</span>
								</span>
							</button>
							<AnimatePresence initial={false}>
								{isOpen && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
										className="overflow-hidden"
									>
										<div className="px-5 lg:px-7 pb-7">
											<div className="pt-5 border-t border-dashed border-line/70">
												<div className="grid sm:grid-cols-2 gap-3">
													{s.items.map((it) => (
														<div
															key={it.t}
															className="relative rounded-2xl bg-surface border border-line/55 p-4 flex flex-col gap-2 hover:bg-white hover:border-line hover:shadow-[0_4px_16px_rgba(12,46,61,0.06)] transition"
														>
															<div className="flex items-start justify-between gap-3">
																<h4 className="font-display text-[13.5px] font-semibold leading-tight pr-2">
																	{it.t}
																</h4>
																<span
																	className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
																	style={{ background: s.accent }}
																/>
															</div>
															<p className="font-display text-[12.5px] leading-relaxed opacity-60">
																{it.d}
															</p>
														</div>
													))}
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>
		</section>
	);
}
