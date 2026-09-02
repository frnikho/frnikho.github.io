import { motion } from "motion/react";

function HeroCredentials() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.34 }}
			className="mt-3 flex items-center gap-3 sm:gap-3.5"
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.4 }}
				className="group relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-primary grid place-items-center shrink-0 shadow-[0_10px_28px_rgba(12,46,61,0.22)] ring-1 ring-white/10 hover:scale-[1.15] transition-transform"
				aria-label="5 ans d'expérience"
			>
				<span className="absolute inset-[7px] rounded-full border border-dashed border-white/20 pointer-events-none" />
				<span className="absolute inset-[3px] rounded-full border border-white/10 pointer-events-none" />
				<div className="flex flex-col items-center leading-none">
					<span className="font-display font-bold text-[26px] sm:text-[28px] leading-none tracking-[-0.04em] text-white">
						5+
					</span>
					<span className="font-display text-[8px] sm:text-[8.5px] tracking-[0.22em] uppercase text-white/60 leading-none mt-[1px]">
						ans
					</span>
				</div>
			</motion.div>

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.48 }}
				className="group relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white grid place-items-center shrink-0 border border-line shadow-[0_10px_28px_rgba(12,46,61,0.08)] hover:scale-[1.15] hover:shadow-[0_14px_32px_rgba(12,46,61,0.10)] transition-all"
				aria-label="RNCP 35075 certifié"
			>
				<span className="absolute inset-[3px] rounded-full border border-primary/8 pointer-events-none" />
				<span className="absolute inset-[7px] rounded-full border border-dashed border-primary/10 pointer-events-none" />
				<div className="flex flex-col items-center leading-none gap-1">
					<img
						src="/rncp.png"
						alt=""
						className="w-[22px] h-[22px] object-contain opacity-90"
					/>
					<span className="font-display font-bold text-[10px] tracking-[0.08em] leading-none text-primary">
						RNCP
					</span>
					<span className="font-display text-[7.5px] tracking-[0.14em] uppercase leading-none text-primary/40">
						35075
					</span>
				</div>
			</motion.div>

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.56 }}
				className="group relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white grid place-items-center shrink-0 border border-[#0176D3]/15 shadow-[0_10px_28px_rgba(1,118,211,0.12)] p-[5px] hover:scale-[1.15] hover:shadow-[0_14px_32px_rgba(1,118,211,0.16)] hover:border-[#0176D3]/25 transition-all"
				aria-label="Salesforce Platform Developer I certifié"
			>
				<span className="absolute inset-[3px] rounded-full border border-[#0176D3]/10 pointer-events-none" />
				<img
					src="/pd1.png"
					alt="Salesforce Platform Developer I"
					className=""
				/>
			</motion.div>
		</motion.div>
	);
}

export function Hero() {
	return (
		<section className="relative">
			<div className="pointer-events-none absolute -top-28 -left-24 w-[520px] h-[520px] bg-peach rounded-full blur-[90px] opacity-25" />
			<div className="pointer-events-none absolute top-12 -right-32 w-[580px] h-[580px] bg-[#DDE7FF] rounded-full blur-[90px] opacity-20" />
			<div className="max-w-[1160px] mx-auto px-6 pt-10 lg:pt-14 relative">
				<div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-end">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col gap-6 lg:pr-4 pb-10 lg:pb-16"
					>
						<div>
							<h1 className="font-display tracking-[-0.045em] leading-[0.88] text-[38px] sm:text-[52px] lg:text-[62px]">
								Développeur
								<br />
								<span className="font-extrabold text-accent">Fullstack</span>
							</h1>
							<div className={"flex flex-col gap-0 mt-3"}>
								<p className={"font-display text-[13px] opacity-60"}>
									React - Rust - K8s - Salesforce
								</p>
							</div>
						</div>
						<div className={"flex flex-col gap-2"}>
							<p
								className={"max-w-[54ch] text-[16px] leading-[1.7] opacity-70"}
							>
								Bienvenue sur mon portfolio 👋
							</p>
							<p className="max-w-[54ch] text-[16px] leading-[1.7] opacity-70">
								Depuis plusieurs années, j’accompagne des entreprises, de la
								startup aux projets à fort trafic, dans la conception de
								solutions robustes, scalables, et parfaitement intégrées à leur
								écosystème.
							</p>
						</div>
						<div className="flex flex-wrap gap-3 pt-1">
							<a
								href="#contact"
								className="bg-primary text-white rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:bg-black transition shadow-[0_10px_24px_rgba(12,46,61,0.16)]"
							>
								Contact
							</a>
							<a
								href="#projects"
								className="bg-white border border-primary/15 rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:bg-white transition shadow-sm"
							>
								Voir mes projets
							</a>
						</div>
						<HeroCredentials />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.08 }}
						className="relative self-end flex flex-col w-full"
					>
						<div className="bg-white rounded-t-[2.2rem] rounded-b-none border border-b-0 border-line shadow-[0_24px_64px_rgba(12,46,61,0.10)] overflow-hidden flex flex-col z-10">
							<div className="relative bg-[#EDE9E2] aspect-[3.8/4.85] overflow-hidden rounded-t-[2.2rem]">
								<img
									src="/pp.jpg"
									alt="Nicolas Sans"
									className="absolute inset-0 w-full h-full object-cover object-top z-20"
								/>
								<div
									className="absolute inset-0 opacity-[0.04]"
									style={{
										backgroundImage:
											"linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)",
										backgroundSize: "28px 28px",
									}}
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
