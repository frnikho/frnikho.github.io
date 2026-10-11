import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ExternalButton } from "@/components/site/button";
import { cn } from "@/lib/cn";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

const links = [
	{ hash: "expertise", label: "Expertise" },
	{ hash: "souverainete", label: "Souveraineté" },
	{ hash: "realisations", label: "Réalisations" },
	{ hash: "offres", label: "Tarifs" },
	{ hash: "avis", label: "Références" },
	{ hash: "contact", label: "Contact" },
] as const;

const SCROLLED_AT = 24;

/** Section de la page d'accueil actuellement à l'écran (scroll-spy). */
function useActiveSection(enabled: boolean) {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		if (!enabled) {
			setActive(null);
			return;
		}
		const sections = links
			.map((l) => document.getElementById(l.hash))
			.filter((el): el is HTMLElement => el !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) setActive(e.target.id);
					else setActive((cur) => (cur === e.target.id ? null : cur));
				}
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);
		for (const s of sections) observer.observe(s);
		return () => observer.disconnect();
	}, [enabled]);

	return active;
}

type Indicator = { x: number; w: number; animate: boolean };

/** Position du repère coulissant sous le lien actif, dans la liste `ul`. */
function useIndicator(active: string | null) {
	const items = useRef<Record<string, HTMLLIElement | null>>({});
	const [rect, setRect] = useState<Indicator>({ x: 0, w: 0, animate: false });

	useEffect(() => {
		const measure = () => {
			const li = active ? items.current[active] : null;
			if (!li) return;
			setRect((prev) => ({
				x: li.offsetLeft,
				w: li.offsetWidth,
				animate: prev.w > 0,
			}));
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [active]);

	return { items, rect };
}

function useScrolled() {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return scrolled;
}

export function Nav() {
	const [open, setOpen] = useState(false);
	const scrolled = useScrolled();
	const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });
	const active = useActiveSection(isHome);
	const { items, rect } = useIndicator(active);

	return (
		// Hauteur réservée dans le flux ; la capsule flotte par-dessus le contenu.
		<header className="sticky top-0 z-40 h-[76px] pointer-events-none">
			<a
				href="#contenu"
				className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
			>
				Aller au contenu
			</a>
			<div className="flex justify-center px-3 pt-3 sm:px-4">
				<div className="pointer-events-auto relative w-full max-w-[26rem] lg:w-auto lg:max-w-fit">
					<div
						className={cn(
							"flex w-full items-center justify-between gap-2 rounded-full border border-line/80 bg-white/70 pl-5 backdrop-blur-xl transition-all duration-300 ease-out lg:w-auto lg:justify-start",
							scrolled
								? "h-12 gap-1 shadow-[0_10px_34px_-10px_rgba(15,23,42,0.3)] lg:gap-2"
								: "h-14 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.18)]",
						)}
					>
						<Link
							to="/"
							className="mr-2 flex items-center text-[1.15rem] font-bold lg:mr-4"
							onClick={() => setOpen(false)}
						>
							<span>
								nikho<span className="text-signal">.dev</span>
							</span>
						</Link>

						<nav aria-label="Navigation principale" className="hidden lg:block">
							<ul className="relative flex items-center gap-0.5">
								<li
									aria-hidden="true"
									className={cn(
										"pointer-events-none absolute inset-y-0 left-0 rounded-full bg-signal-soft",
										rect.animate &&
											"transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.34,1.35,0.64,1)]",
										!rect.animate && "transition-opacity duration-300",
									)}
									style={{
										width: rect.w,
										transform: `translateX(${rect.x}px)`,
										opacity: active ? 1 : 0,
									}}
								/>
								{links.map((l) => (
									<li
										key={l.hash}
										ref={(el) => {
											items.current[l.hash] = el;
										}}
										className="relative"
									>
										<Link
											to="/"
											hash={l.hash}
											aria-current={active === l.hash ? "location" : undefined}
											className={cn(
												"rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors",
												active === l.hash
													? "text-signal-deep"
													: "text-ink-soft hover:bg-paper-2 hover:text-ink",
											)}
										>
											{l.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<div className="hidden pr-1.5 pl-2 lg:block">
							<ExternalButton
								href={BOOKING_URL}
								where="nav"
								className="!rounded-full !px-4 !py-2 !text-[14px]"
							>
								Me contacter
							</ExternalButton>
						</div>

						<button
							type="button"
							className="mr-1.5 ml-3 grid size-9 place-items-center rounded-full bg-paper-2 lg:hidden"
							aria-expanded={open}
							aria-controls="menu-mobile"
							aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
							onClick={() => setOpen((v) => !v)}
						>
							<span aria-hidden="true" className="text-[15px]">
								{open ? "×" : "≡"}
							</span>
						</button>
					</div>

					{open && (
						<nav
							id="menu-mobile"
							aria-label="Navigation mobile"
							className="absolute top-full right-0 left-0 mt-2 rounded-3xl border border-line/80 bg-white/90 p-3 shadow-[0_18px_48px_-16px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:hidden"
						>
							<ul className="grid">
								{links.map((l) => (
									<li key={l.hash}>
										<Link
											to="/"
											hash={l.hash}
											onClick={() => setOpen(false)}
											className={cn(
												"block rounded-2xl px-4 py-3 text-lg",
												active === l.hash
													? "bg-signal-soft text-signal-deep"
													: "hover:bg-paper-2",
											)}
										>
											{l.label}
										</Link>
									</li>
								))}
							</ul>
							<div className="p-1 pt-3">
								<ExternalButton
									href={BOOKING_URL}
									where="nav-mobile"
									className="!w-full !rounded-full"
								>
									{BOOKING_LABEL}
								</ExternalButton>
							</div>
						</nav>
					)}
				</div>
			</div>
		</header>
	);
}
