import { motion } from "motion/react";
import { SectionHeader } from "@/features/home/components/section-header";
import { timeline } from "@/features/home/data/timeline";

export function Experience() {
	return (
		<section
			id="work"
			className="relative bg-paper border-y border-line/60 overflow-hidden"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.035]"
				style={{
					backgroundImage:
						"linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)",
					backgroundSize: "36px 36px",
				}}
			/>
			<div className="pointer-events-none absolute -top-28 -right-24 w-130 h-130 bg-peach rounded-full blur-[90px] opacity-[0.10]" />
			<div className="relative max-w-275 mx-auto px-6 py-16 lg:py-22">
				<SectionHeader
					prefix="Mon"
					accent="Expérience"
					description="Retrouver l’ensemble de mon parcours professionnel et académique, ainsi que mes expériences et compétences acquises au fil des années."
					withDot
					size="lg"
				/>
				<div className="relative mt-10 lg:mt-12 max-w-[980px]">
					<div
						className="absolute left-[7px] lg:left-[164px] top-3 bottom-3 w-px bg-line"
						aria-hidden="true"
					/>
					<div className="grid gap-7 lg:gap-6">
						{timeline.map((t, idx) => (
							<motion.div
								key={t.title}
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.4, delay: idx * 0.04 }}
								className="relative grid lg:grid-cols-[148px_32px_1fr] items-start gap-0"
							>
								<div className="hidden lg:block text-right pr-6 pt-2">
									<div
										className="font-extrabold text-accent text-[38px]"
										style={{ color: t.accent }}
									>
										{t.year}
									</div>
									<div className="font-mono text-[11px] tracking-wide opacity-60 mt-1 leading-tight">
										{t.end_date}
									</div>
									<div className="font-mono text-[11px] tracking-wide opacity-60 mt-1 leading-tight">
										{t.start_date}
									</div>
									{t.duration && (
										<span className="inline-flex mt-2 bg-white border border-line rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase shadow-sm">
											{t.duration}
										</span>
									)}
								</div>
								<div className="hidden lg:flex justify-center pt-7">
									<span
										className="w-[18px] h-[18px] rounded-full bg-white border-2 grid place-items-center shadow-sm"
										style={{ borderColor: t.accent }}
									>
										<span
											className="w-2 h-2 rounded-full"
											style={{ background: t.accent }}
										/>
									</span>
								</div>
								<span
									className="lg:hidden absolute left-0 top-7 w-[15px] h-[15px] rounded-full bg-white border-2 grid place-items-center shadow-sm"
									style={{ borderColor: t.accent }}
									aria-hidden="true"
								>
									<span
										className="w-1.5 h-1.5 rounded-full"
										style={{ background: t.accent }}
									/>
								</span>
								<div className="pl-8 lg:pl-0">
									<div className="lg:hidden flex flex-wrap items-baseline gap-2 mb-2.5">
										<span
											className="italic text-[22px]"
											style={{ color: t.accent }}
										>
											{t.year}
										</span>
										<span className="font-mono text-[11px] tracking-wide opacity-60">
											{t.start_date} · {t.end_date}
										</span>
									</div>
									<div className="group relative bg-white rounded-[1.7rem] border border-line overflow-hidden hover:shadow-[0_12px_32px_rgba(12,46,61,0.08)] hover:border-primary/10 transition">
										<div className="p-6">
											<div className="flex items-start justify-between gap-3">
												<div>
													<h3 className="font-display font-bold text-[18px] lg:text-[19px] leading-tight">
														{t.title}
													</h3>
													<p className="font-display text-[12px] tracking-widest uppercase opacity-40 mt-1">
														{t.company} <span className="opacity-30">-</span>{" "}
														{t.type}
													</p>
												</div>
												<span className="hidden sm:inline-flex shrink-0 bg-surface border border-line rounded-full px-2.5 py-1 font-mono text-[11px] opacity-60">
													{t.year}
													{t.endYear &&
													t.endYear !== "-" &&
													t.endYear !== t.year
														? ` → ${t.endYear}`
														: ""}
												</span>
											</div>
											<p className="mt-3 text-[14.5px] leading-relaxed opacity-65">
												{t.desc}
											</p>
											<div className="mt-5">
												<ul className="mt-3 grid gap-2.5">
													{t.mastered.map((m) => (
														<li
															key={m.k}
															className="flex gap-2 bg-surface border border-line/60 rounded-2xl px-3.5 py-3"
														>
															<span
																className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
																style={{ background: t.accent }}
																aria-hidden="true"
															/>
															<span className="text-[13.5px] leading-relaxed">
																<span className="font-display font-semibold">
																	{m.k}
																</span>
																<span className="opacity-60"> - {m.d}</span>
															</span>
														</li>
													))}
												</ul>
											</div>
											<div className="mt-4 flex flex-wrap gap-1.5">
												{t.tech.map((x) => (
													<span
														key={x}
														className="bg-white border border-line rounded-full px-3 py-1 font-display text-[11px] shadow-sm"
													>
														{x}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export const Work = Experience;
