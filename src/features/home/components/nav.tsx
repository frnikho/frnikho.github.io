import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useScrollTo } from "@/hooks/use-scroll-to";

const links = [
	{ l: "Services", h: "#services" },
	{ l: "Stack", h: "#stack" },
	{ l: "Parcours", h: "#work" },
	{ l: "Projets", h: "#projects" },
	{ l: "Avis", h: "#feedback" },
];

export function Nav() {
	const [open, setOpen] = useState(false);
	const { scrollTo } = useScrollTo(84);

	const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
		e.preventDefault();
		setOpen(false);
		scrollTo(hash);
	};

	return (
		<div className="sticky top-0 z-50 px-6 pt-4 sm:pt-5 pointer-events-none">
			<header className="pointer-events-auto max-w-[1160px] mx-auto bg-white/70 backdrop-blur-xl border border-primary/[0.06] rounded-full shadow-[0_2px_24px_rgba(12,46,61,0.06),0_1px_0_rgba(12,46,61,0.04)] px-1.5 py-1.5 sm:px-2 flex items-center justify-between gap-3">
				<a
					href="#top"
					onClick={(e) => handleNav(e, "#top")}
					id="top"
					className="flex items-center gap-3 pl-2 sm:pl-3 group shrink-0"
					aria-label="Haut de page"
				>
					<span className="font-display font-semibold text-[13px] tracking-[-0.02em] text-primary">
						Nicolas Sans
					</span>
				</a>
				<nav
					className="hidden lg:flex items-center gap-5 xl:gap-6"
					aria-label="Navigation principale"
				>
					{links.map((a) => (
						<a
							key={a.h}
							href={a.h}
							onClick={(e) => handleNav(e, a.h)}
							className="group relative py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase font-medium opacity-40 hover:opacity-100 transition-opacity"
						>
							{a.l}
							<span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
						</a>
					))}
				</nav>
				<div className="flex items-center gap-2 shrink-0">
					<a
						href="#contact"
						onClick={(e) => handleNav(e, "#contact")}
						className="hidden lg:inline-flex group items-center gap-2.5 pl-4 pr-1 py-1 rounded-full border-primary/10 bg-white/60 hover:bg-white hover:border-primary/15 transition-colors"
					>
						<span className="font-mono text-[10.5px] tracking-[0.09em] uppercase font-bold text-primary">
							Me contacter
						</span>
					</a>
					<button
						type="button"
						onClick={() => setOpen(!open)}
						aria-expanded={open}
						aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
						className="lg:hidden w-8 h-8 rounded-full border border-primary/10 bg-white/60 grid place-items-center text-primary hover:bg-white hover:border-primary/15 transition-colors"
					>
						<span className="relative block w-3.5 h-3">
							<span
								className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${open ? "top-[6px] rotate-45" : "top-0"}`}
							/>
							<span
								className={`absolute left-0 right-0 top-[6px] h-px bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
							/>
							<span
								className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${open ? "top-[6px] -rotate-45" : "top-[12px]"}`}
							/>
						</span>
					</button>
				</div>
			</header>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.98 }}
						transition={{ duration: 0.2 }}
						className="pointer-events-auto lg:hidden max-w-[1160px] mx-auto mt-2 bg-white/90 backdrop-blur-xl border border-primary/[0.06] rounded-2xl shadow-[0_12px_32px_rgba(12,46,61,0.10)] overflow-hidden"
					>
						<div className="px-2 py-2 flex flex-col">
							{links.map((a) => (
								<a
									key={a.h}
									href={a.h}
									onClick={(e) => handleNav(e, a.h)}
									className="px-4 py-3.5 rounded-xl font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:bg-paper transition-colors"
								>
									{a.l}
								</a>
							))}
							<a
								href="#contact"
								onClick={(e) => handleNav(e, "#contact")}
								className="mt-1 bg-primary text-white rounded-xl text-center py-3.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-black transition-colors"
							>
								Me contacter →
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
