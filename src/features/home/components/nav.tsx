import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useScrollTo } from "@/hooks/use-scroll-to";

const links = [
	{ l: "Services", h: "#services" },
	{ l: "Ma stack", h: "#stack" },
	{ l: "Mon parcours", h: "#work" },
	{ l: "Mes projets", h: "#projects" },
	{ l: "Recommandations", h: "#feedback" },
] as const;

// ── SVG lens — must be in DOM once ──
function LiquidLensDefs() {
	return (
		<svg
			width={0}
			height={0}
			aria-hidden
			className="absolute pointer-events-none"
			style={{ position: "absolute" }}
		>
			<defs>
				{/* Main liquid refraction — subtle warp of the backdrop */}
				<filter
					id="liquid-glass-lens"
					x="-20%"
					y="-20%"
					width="140%"
					height="140%"
					colorInterpolationFilters="sRGB"
				>
					<feImage
						href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='50%25' stop-color='%23888'/%3E%3Cstop offset='100%25' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='80' rx='40' fill='url(%23g)' opacity='0'/%3E%3C/svg%3E"
						result="srcMap"
					/>
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.015 0.015"
						numOctaves={1}
						seed={2}
						result="turb"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="turb"
						scale={8}
						xChannelSelector="R"
						yChannelSelector="G"
						result="disp"
					/>
					<feGaussianBlur in="disp" stdDeviation={0.6} result="soft" />
				</filter>
				{/* Highlight blur for specular edge */}
				<filter
					id="liquid-highlight"
					x="-20%"
					y="-20%"
					width="140%"
					height="140%"
				>
					<feGaussianBlur stdDeviation={0.8} />
				</filter>
			</defs>
		</svg>
	);
}

// ── shared gradient helpers ──

function GlassBackground({
	variant = "pill",
}: {
	variant?: "pill" | "dock" | "sheet";
}) {
	const isDock = variant === "dock";
	const isSheet = variant === "sheet";
	return (
		<>
			{/* 1 — translucent blurred backdrop + lens */}
			<span
				aria-hidden
				className={`absolute inset-0 ${isSheet ? "rounded-[28px]" : "rounded-full"} overflow-hidden`}
				style={{
					background: isDock
						? "rgba(255,255,255,0.20)"
						: isSheet
							? "rgba(255,255,255,0.32)"
							: "rgba(255,255,255,0.18)",
					backdropFilter: "blur(36px) saturate(200%) brightness(1.08)",
					WebkitBackdropFilter: "blur(36px) saturate(200%) brightness(1.08)",
					// subtle lens warping via SVG filter is applied as CSS filter on the backdrop layer only
					// text stays sharp because content is in a sibling layer above
				}}
			/>
			{/* 2 — refraction warp layer (warps backdrop behind, not text) */}
			<span
				aria-hidden
				className={`absolute inset-0 ${isSheet ? "rounded-[28px]" : "rounded-full"} overflow-hidden pointer-events-none`}
				style={{
					backdropFilter: "blur(1px)",
					WebkitBackdropFilter: "blur(1px)",
					filter: "url(#liquid-glass-lens)",
					opacity: 0.55,
				}}
			/>
			{/* 3 — inner bevel + outer depth shadow */}
			<span
				aria-hidden
				className={`absolute inset-0 ${isSheet ? "rounded-[28px]" : "rounded-full"} pointer-events-none`}
				style={{
					borderRadius: "inherit",
					boxShadow: isSheet
						? "inset 0 1px 1.5px rgba(255,255,255,0.95), inset 0 -1px 1px rgba(255,255,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.55), 0 24px 48px rgba(12,46,61,0.14), 0 8px 20px rgba(12,46,61,0.10)"
						: "inset 0 1px 1.5px rgba(255,255,255,0.92), inset 0 -1px 0.5px rgba(255,255,255,0.35), inset 0 0 18px rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.48)",
				}}
			/>
			{/* 4 — 1px specular top edge (the iOS highlight) */}
			<span
				aria-hidden
				className={`pointer-events-none absolute inset-x-0 top-0 h-px ${isSheet ? "rounded-t-[28px]" : "rounded-full"}`}
				style={{
					background:
						"linear-gradient(90deg, transparent 4%, rgba(255,255,255,0.95) 22%, rgba(255,255,255,0.95) 78%, transparent 96%)",
					margin: isSheet ? "1px 18px 0" : "1px 14% 0",
					filter: "blur(0.2px)",
				}}
			/>
			{/* 5 — soft top sheen (curved glossy highlight) */}
			<span
				aria-hidden
				className={`pointer-events-none absolute inset-x-0 top-0 ${isSheet ? "h-[56%] rounded-t-[28px]" : "h-[62%] rounded-full"} overflow-hidden`}
				style={{
					background:
						"linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.22) 42%, rgba(255,255,255,0.0) 100%)",
					opacity: isSheet ? 0.5 : 0.62,
					filter: "blur(0.6px)",
				}}
			/>
			{/* 6 — faint chromatic edge (prismatic fringe like real glass) */}
			<span
				aria-hidden
				className={`pointer-events-none absolute inset-0 ${isSheet ? "rounded-[28px]" : "rounded-full"}`}
				style={{
					borderRadius: "inherit",
					background:
						"linear-gradient(100deg, rgba(180,210,255,0.10) 0%, transparent 28%, transparent 72%, rgba(255,200,180,0.09) 100%)",
					mixBlendMode: "screen" as const,
					opacity: 0.7,
				}}
			/>
			{/* 7 — thin outer stroke (hairline) */}
			<span
				aria-hidden
				className={`pointer-events-none absolute inset-0 ${isSheet ? "rounded-[28px]" : "rounded-full"}`}
				style={{
					borderRadius: "inherit",
					border: "1px solid rgba(255,255,255,0.58)",
				}}
			/>
		</>
	);
}

export function Nav() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<string>("");
	const [hovered, setHovered] = useState<string | null>(null);
	const [scrolled, setScrolled] = useState(false);
	const { scrollTo } = useScrollTo(84);

	const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
		e.preventDefault();
		setOpen(false);
		scrollTo(hash);
		setActive(hash);
	};

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		const ids = links.map((l) => l.h.slice(1)).concat("contact", "top");
		const els = ids
			.map((id) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];
		if (!els.length)
			return () => window.removeEventListener("scroll", onScroll);
		const obs = new IntersectionObserver(
			(entries) => {
				const vis = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (vis?.target?.id) {
					const h = `#${vis.target.id}`;
					setActive(h === "#top" ? "" : h);
				}
			},
			{ rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
		);
		for (const el of els) obs.observe(el);
		return () => {
			window.removeEventListener("scroll", onScroll);
			obs.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	// lock body scroll when sheet open on mobile (optional)
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	return (
		<>
			<LiquidLensDefs />

			{/* ── DESKTOP — floating liquid capsule ── */}
			<div className="sticky top-0 z-50 hidden lg:block pointer-events-none px-6 pt-5">
				<motion.div
					initial={{ y: -14, opacity: 0, scale: 0.97 }}
					animate={{ y: 0, opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className="pointer-events-auto relative mx-auto flex items-center gap-1.5 p-1.25 rounded-full max-w-275"
					style={{
						// outer floating shadow — detached from glass
						filter: scrolled
							? "drop-shadow(0 16px 36px rgba(12,46,61,0.12)) drop-shadow(0 4px 10px rgba(12,46,61,0.08))"
							: "drop-shadow(0 10px 28px rgba(12,46,61,0.08)) drop-shadow(0 2px 6px rgba(12,46,61,0.06))",
						transform: scrolled
							? "scale(0.985) translateY(0px)"
							: "scale(1) translateY(0px)",
						transition:
							"transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.35s ease",
					}}
				>
					{/* glass chrome */}
					<GlassBackground variant="pill" />

					{/* brand */}
					<a
						href="#top"
						onClick={(e) => handleNav(e, "#top")}
						className="relative flex items-center gap-2.5 pl-2.5 pr-3 shrink-0"
						aria-label="Haut de page"
					>
						<span className="w-8 h-8 rounded-full text-white shrink-0 overflow-hidden shadow-[0_2px_10px_rgba(12,46,61,0.18),inset_0_1px_0_rgba(255,255,255,0.18)]">
							<img src="/android-chrome-192x192.ico" alt=""/>
						</span>
						<span className="flex flex-col leading-none">
							<span className="font-display font-semibold text-[13.5px] tracking-[-0.025em] text-primary">
								Nicolas Sans
							</span>
						</span>
						<span
							className="ml-2 hidden xl:block h-7 w-px bg-primary/[0.07]"
							aria-hidden
						/>
					</a>
					{/* nav links — liquid capsule follows hover */}
					<nav
						className="relative flex items-center gap-0 flex-1 justify-center px-1"
						aria-label="Navigation principale"
						onMouseLeave={() => setHovered(null)}
					>
						{links.map((a) => {
							const isHovered = hovered === a.h;
							const isActive = active === a.h;
							return (
								<a
									key={a.h}
									href={a.h}
									onClick={(e) => handleNav(e, a.h)}
									onMouseEnter={() => setHovered(a.h)}
									onFocus={() => setHovered(a.h)}
									onBlur={() => setHovered(null)}
									className={`relative px-[14px] py-[8px] rounded-full font-mono text-[10.5px] tracking-[0.13em] uppercase font-medium transition-colors duration-200 ${isHovered ? "text-primary" : isActive ? "text-primary/70" : "text-primary/42 hover:text-primary/75"}`}
								>
									{isHovered && (
										<motion.span
											layoutId="liquid-pill"
											className="absolute inset-0 rounded-full overflow-hidden"
											initial={{ opacity: 0, scale: 0.86, filter: "blur(8px)" }}
											animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
											exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
											style={{
												background:
													"linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.76) 100%)",
												backdropFilter: "blur(10px) saturate(150%)",
												WebkitBackdropFilter: "blur(10px) saturate(150%)",
												boxShadow:
													"0 1px 2px rgba(12,46,61,0.06), 0 2px 10px rgba(12,46,61,0.07), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(12,46,61,0.04), inset 0 0 0 1px rgba(255,255,255,0.5)",
												border: "1px solid rgba(255,255,255,0.62)",
											}}
											transition={{
												type: "spring",
												stiffness: 420,
												damping: 32,
												mass: 0.6,
												opacity: { duration: 0.18 },
												filter: { duration: 0.22 },
											}}
										>
											{/* tiny inner highlight */}
											<span
												aria-hidden
												className="absolute inset-x-0 top-0 h-px bg-white/80 rounded-full"
												style={{ margin: "1px 14% 0" }}
											/>
										</motion.span>
									)}
									<span className="relative">{a.l}</span>
								</a>
							);
						})}
					</nav>

					{/* CTA — dark glass button */}
					<a
						href="#contact"
						onClick={(e) => handleNav(e, "#contact")}
						className="relative shrink-0 inline-flex items-center gap-2 pl-4 pr-[5px] py-[5px] rounded-full bg-primary text-white overflow-hidden group hover:bg-[#0a2533] transition-colors duration-200 shadow-[0_4px_16px_rgba(12,46,61,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]"
					>
						<span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/[0.02] to-transparent" />
						<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20 rounded-full mx-[10%]" />
						<span className="relative font-mono text-[10.5px] tracking-[0.08em] uppercase font-semibold pr-1">
							Me contacter
						</span>
						<span className="relative grid place-items-center w-[30px] h-[30px] rounded-full bg-white text-primary shadow-[0_1px_6px_rgba(12,46,61,0.12),inset_0_1px_0_rgba(255,255,255,1)] group-hover:rotate-[-10deg] group-hover:scale-[1.04] transition-transform duration-300">
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								aria-hidden
							>
								<path
									d="M3.2 6H8.8M8.8 6L6.6 3.8M8.8 6L6.6 8.2"
									stroke="currentColor"
									strokeWidth="1.35"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					</a>
				</motion.div>
				{/* ambient glow under pill */}
				<div
					aria-hidden
					className={`mx-auto h-3 max-w-[640px] rounded-full blur-[20px] transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
					style={{
						background:
							"radial-gradient(60% 100% at 50% 0%, rgba(12,46,61,0.10), transparent 70%)",
					}}
				/>
			</div>

			{/* ── MOBILE TOP — tiny glass brand chip ── */}
			<div className="lg:hidden sticky top-0 z-50 pointer-events-none px-4 pt-3 sm:px-6">
				<motion.div
					initial={{ y: -10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					className="pointer-events-auto mx-auto max-w-[1160px] flex items-center justify-between gap-2"
				>
					<a
						href="#top"
						onClick={(e) => handleNav(e, "#top")}
						className="relative inline-flex items-center gap-2.5 pl-[5px] pr-3.5 py-[5px] rounded-full"
						style={{
							filter: "drop-shadow(0 6px 18px rgba(12,46,61,0.08))",
						}}
						aria-label="Haut de page"
					>
						<span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
							<GlassBackground variant="pill" />
						</span>
						<span className="relative grid place-items-center w-8 h-8 rounded-full bg-primary text-white text-[10px] font-display font-bold shadow-[0_2px_8px_rgba(12,46,61,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] overflow-hidden">
							<span className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-full" />
							<span className="relative">NS</span>
						</span>
						<span className="relative font-display font-semibold text-[13px] tracking-[-0.02em] text-primary">
							Nicolas Sans
						</span>
						<span
							className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.55)] animate-pulse"
							aria-hidden
						/>
					</a>

					<div className="relative flex items-center gap-2">
						<a
							href="#contact"
							onClick={(e) => handleNav(e, "#contact")}
							className="relative inline-flex items-center gap-1.5 pl-3.5 pr-[5px] py-[5px] rounded-full bg-primary text-white shadow-[0_6px_20px_rgba(12,46,61,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]"
						>
							<span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
							<span className="relative font-mono text-[10.5px] tracking-[0.08em] uppercase font-semibold">
								Contact
							</span>
							<span className="relative grid place-items-center w-[26px] h-[26px] rounded-full bg-white text-primary shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
								<svg
									width="10"
									height="10"
									viewBox="0 0 10 10"
									fill="none"
									aria-hidden
								>
									<path
										d="M2.6 5H7.4M7.4 5L5.4 3M7.4 5L5.4 7"
										stroke="currentColor"
										strokeWidth="1.3"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</a>
						<button
							type="button"
							onClick={() => setOpen((v) => !v)}
							aria-expanded={open}
							aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
							className="relative w-[42px] h-[42px] rounded-full grid place-items-center text-primary"
							style={{
								filter: "drop-shadow(0 6px 18px rgba(12,46,61,0.08))",
							}}
						>
							<span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
								<GlassBackground variant="pill" />
							</span>
							<span className="relative block w-[18px] h-[14px]">
								<motion.span
									animate={
										open ? { top: 6, rotate: 45 } : { top: 1, rotate: 0 }
									}
									transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
									className="absolute left-0 right-0 h-[1.6px] bg-current rounded-full"
								/>
								<motion.span
									animate={
										open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
									}
									transition={{ duration: 0.16 }}
									className="absolute left-0 right-0 top-[6px] h-[1.6px] bg-current rounded-full origin-center"
								/>
								<motion.span
									animate={
										open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }
									}
									transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
									className="absolute left-0 right-0 h-[1.6px] bg-current rounded-full"
								/>
							</span>
						</button>
					</div>
				</motion.div>
			</div>

			{/* ── MOBILE SHEET ── */}
			<AnimatePresence>
				{open && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.22 }}
							className="lg:hidden fixed inset-0 z-40 bg-primary/[0.08] backdrop-blur-[3px]"
							onClick={() => setOpen(false)}
							aria-hidden
						/>
						<motion.div
							initial={{ opacity: 0, y: 18, scale: 0.97 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 12, scale: 0.98 }}
							transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
							className="lg:hidden fixed z-50 left-4 right-4 sm:left-6 sm:right-6 overflow-hidden rounded-[28px]"
							style={{
								top: "66px",
								filter:
									"drop-shadow(0 24px 48px rgba(12,46,61,0.14)) drop-shadow(0 8px 16px rgba(12,46,61,0.10))",
							}}
						>
							<span className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
								<GlassBackground variant="sheet" />
							</span>
							<div className="relative px-2.5 py-2.5">
								<div className="grid gap-1">
									{links.map((a, i) => {
										const isActive = active === a.h;
										return (
											<motion.a
												key={a.h}
												href={a.h}
												onClick={(e) => handleNav(e, a.h)}
												initial={{ opacity: 0, y: 6 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													delay: 0.04 * i,
													duration: 0.32,
													ease: [0.22, 1, 0.36, 1],
												}}
												className={`group relative flex items-center justify-between px-4 py-[15px] rounded-2xl font-mono text-[11px] tracking-[0.14em] uppercase font-medium transition-all ${isActive ? "text-primary bg-white/90 shadow-[0_2px_12px_rgba(12,46,61,0.08),inset_0_1px_0_rgba(255,255,255,1)] border border-white/60" : "text-primary/55 hover:text-primary hover:bg-white/55 hover:shadow-[0_1px_8px_rgba(12,46,61,0.04)]"}`}
											>
												<span>{a.l}</span>
												<span
													className={`grid place-items-center w-8 h-8 rounded-full border transition-all duration-200 ${isActive ? "bg-primary text-white border-primary shadow-[0_2px_8px_rgba(12,46,61,0.18)]" : "bg-white/70 text-primary/30 group-hover:text-primary group-hover:bg-white border-white/60"}`}
												>
													<svg
														width="10"
														height="10"
														viewBox="0 0 10 10"
														fill="none"
														aria-hidden
													>
														<path
															d="M3 5H7M7 5L5 3M7 5L5 7"
															stroke="currentColor"
															strokeWidth="1.3"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</span>
											</motion.a>
										);
									})}
								</div>
								<motion.a
									href="#contact"
									onClick={(e) => handleNav(e, "#contact")}
									initial={{ opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.26, duration: 0.32 }}
									className="relative mt-2.5 flex items-center justify-center gap-2 py-[15px] rounded-2xl bg-primary text-white overflow-hidden shadow-[0_8px_20px_rgba(12,46,61,0.18),inset_0_1px_0_rgba(255,255,255,0.14)]"
								>
									<span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
									<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20 rounded-full mx-[12%]" />
									<span className="relative font-mono text-[11px] tracking-[0.14em] uppercase font-semibold">
										Me contacter
									</span>
									<span className="relative text-white/80">→</span>
								</motion.a>
								<p className="text-center font-mono text-[9px] tracking-[0.14em] uppercase text-primary/25 pt-3 pb-1">
									Disponible pour nouvelles missions
								</p>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* ── BOTTOM LIQUID DOCK — mobile only ── */}
			<div className="lg:hidden fixed bottom-0 inset-x-0 z-40 pointer-events-none px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2">
				<motion.nav
					initial={{ y: 24, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
					aria-label="Navigation principale"
					className="pointer-events-auto relative mx-auto flex items-center justify-between gap-1 p-[5px] rounded-full max-w-[420px]"
					style={{
						filter:
							"drop-shadow(0 16px 36px rgba(12,46,61,0.14)) drop-shadow(0 4px 12px rgba(12,46,61,0.10))",
					}}
				>
					<span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
						<GlassBackground variant="dock" />
					</span>
					{links.map((a) => {
						const isActive = active === a.h;
						return (
							<a
								key={a.h}
								href={a.h}
								onClick={(e) => handleNav(e, a.h)}
								className={`relative flex-1 flex items-center justify-center py-[9px] rounded-full transition-colors duration-200 ${isActive ? "text-primary" : "text-primary/38 hover:text-primary/65"}`}
							>
								{isActive && (
									<motion.span
										layoutId="liquid-dock-pill"
										className="absolute inset-0 rounded-full overflow-hidden"
										style={{
											background:
												"linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 100%)",
											backdropFilter: "blur(10px) saturate(160%)",
											WebkitBackdropFilter: "blur(10px) saturate(160%)",
											boxShadow:
												"0 1px 2px rgba(12,46,61,0.06), 0 2px 10px rgba(12,46,61,0.07), inset 0 1px 0 rgba(255,255,255,1), inset 0 0 0 1px rgba(255,255,255,0.5)",
											border: "1px solid rgba(255,255,255,0.62)",
										}}
										transition={{
											type: "spring",
											stiffness: 420,
											damping: 32,
											mass: 0.6,
										}}
									>
										<span
											aria-hidden
											className="absolute inset-x-0 top-0 h-px bg-white/85 rounded-full"
											style={{ margin: "1px 16% 0" }}
										/>
									</motion.span>
								)}
								<span className="relative font-mono text-[9.5px] sm:text-[10px] tracking-[0.09em] uppercase font-semibold leading-none">
									{a.l}
								</span>
							</a>
						);
					})}
				</motion.nav>
			</div>
		</>
	);
}
