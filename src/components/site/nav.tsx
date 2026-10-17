import { Link, useRouterState } from "@tanstack/react-router";
import {
	type CSSProperties,
	type RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { ExternalButton, RouteButton } from "@/components/site/button";
import { blogCategories } from "@/content/blog";
import { cn } from "@/lib/cn";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

/**
 * Le site a deux parties : le Blog (tout ce qui commence par `/blog`) et le
 * Portfolio (le reste, accueil compris). L'interrupteur de la navbar indique
 * la partie courante, et les liens affichés à côté sont ceux de cette partie.
 */
export type SiteArea = "blog" | "portfolio";

export const siteArea = (pathname: string): SiteArea =>
	pathname === "/blog" || pathname.startsWith("/blog/") ? "blog" : "portfolio";

/** Destination du logo : l'accueil de la partie où l'on se trouve. */
export const areaHome = (area: SiteArea) =>
	area === "blog" ? ("/blog" as const) : ("/" as const);

const portfolioLinks = [
	{ to: "/services", label: "Services" },
	{ to: "/realisations", label: "Réalisations" },
	{ to: "/a-propos", label: "À propos" },
] as const;

const ALL_POSTS = "all";

/** Lien actif dans la partie courante : une page du portfolio, « Tous les articles » ou une catégorie. */
function activeLink(pathname: string, area: SiteArea): string | null {
	if (area === "portfolio") {
		return (
			portfolioLinks.find(
				(l) => pathname === l.to || pathname.startsWith(`${l.to}/`),
			)?.to ?? null
		);
	}
	const category = /^\/blog\/categorie\/([^/]+)/.exec(pathname)?.[1];
	if (category) return category;
	return pathname === "/blog" || pathname.startsWith("/blog/page/")
		? ALL_POSTS
		: null;
}

const SCROLLED_AT = 24;

type Indicator = { x: number; w: number; animate: boolean };

/** Position du repère coulissant sous le lien actif, dans la liste `ul`. */
function useIndicator(active: string | null, area: SiteArea) {
	const items = useRef<Record<string, HTMLLIElement | null>>({});
	const [rect, setRect] = useState<Indicator>({ x: 0, w: 0, animate: false });

	useEffect(() => {
		const measure = () => {
			const li = active ? items.current[`${area}:${active}`] : null;
			if (!li || li.offsetWidth === 0) return;
			setRect((prev) => ({
				x: li.offsetLeft,
				w: li.offsetWidth,
				animate: prev.w > 0,
			}));
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [active, area]);

	return { items, rect };
}

/**
 * Nombre de changements de partie depuis le chargement. Calculé pendant le
 * rendu (et non dans un effet) pour que les animations démarrent dès la
 * première image de la nouvelle partie ; vaut 0 au chargement, sans animation.
 */
function useAreaChanges(area: SiteArea): number {
	const previous = useRef(area);
	const changes = useRef(0);
	if (previous.current !== area) {
		previous.current = area;
		changes.current += 1;
	}
	return changes.current;
}

const DESKTOP = "(min-width: 1024px)";

/**
 * Largeur de la capsule sur ordinateur, mesurée sur son contenu : posée en
 * style, elle peut être animée quand le contenu change (changement de
 * partie, catégories qui apparaissent sur grand écran). Sur mobile, la
 * capsule garde sa largeur fluide.
 */
function useCapsuleWidth(row: RefObject<HTMLDivElement | null>) {
	const [width, setWidth] = useState<number | undefined>(undefined);

	useEffect(() => {
		const el = row.current;
		if (!el) return;
		const media = window.matchMedia(DESKTOP);
		const measure = () =>
			setWidth(media.matches ? Math.ceil(el.scrollWidth) + 2 : undefined);
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		media.addEventListener("change", measure);
		measure();
		return () => {
			observer.disconnect();
			media.removeEventListener("change", measure);
		};
	}, [row]);

	return width;
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

/** Interrupteur Portfolio / Blog : la pastille coulisse vers la partie courante (jaune ou bleue). */
function AreaSwitch({
	area,
	changes,
	onNavigate,
	className,
}: {
	area: SiteArea;
	/** Nombre de changements de partie : relance l'effet gélatine de la pastille. */
	changes: number;
	onNavigate?: () => void;
	className?: string;
}) {
	const segment =
		"relative z-10 rounded-full px-3.5 py-1.5 text-center transition-colors duration-300";
	return (
		<nav
			aria-label="Partie du site"
			className={cn(
				"relative grid grid-cols-2 rounded-full bg-paper-2 p-1 text-[13.5px] font-semibold",
				className,
			)}
		>
			{/* La pastille coulisse (span extérieur) et s'étire comme une gelée (span intérieur). */}
			<span
				aria-hidden="true"
				className={cn(
					"absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] transition-[translate] duration-500 ease-[cubic-bezier(0.34,1.35,0.64,1)]",
					area === "portfolio" ? "translate-x-0" : "translate-x-full",
				)}
			>
				<span
					key={changes}
					className={cn(
						"block size-full rounded-full shadow-sm transition-[background-color] duration-300",
						area === "blog" ? "bg-highlight" : "bg-signal",
						changes > 0 && "switch-squish",
					)}
				/>
			</span>
			<Link
				to="/"
				onClick={onNavigate}
				aria-current={area === "portfolio" ? "true" : undefined}
				className={cn(
					segment,
					area === "portfolio" ? "text-white" : "text-ink-soft hover:text-ink",
				)}
			>
				Portfolio
			</Link>
			<Link
				to="/blog"
				onClick={onNavigate}
				aria-current={area === "blog" ? "true" : undefined}
				className={cn(
					segment,
					area === "blog" ? "text-ink" : "text-ink-soft hover:text-ink",
				)}
			>
				Blog
			</Link>
		</nav>
	);
}

const desktopLink = (on: boolean) =>
	cn(
		"rounded-full px-3.5 py-2 text-[14.5px] font-medium whitespace-nowrap transition-colors",
		on ? "text-signal-deep" : "text-ink-soft hover:bg-paper-2 hover:text-ink",
	);

const mobileLink = (on: boolean) =>
	cn(
		"block rounded-2xl px-4 py-3 text-lg",
		on ? "bg-signal-soft text-signal-deep" : "hover:bg-paper-2",
	);

export function Nav() {
	const [open, setOpen] = useState(false);
	const scrolled = useScrolled();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const area = siteArea(pathname);
	const active = activeLink(pathname, area);
	const { items, rect } = useIndicator(active, area);
	const changes = useAreaChanges(area);
	const row = useRef<HTMLDivElement>(null);
	const capsuleWidth = useCapsuleWidth(row);
	const close = () => setOpen(false);
	// La navbar survit aux navigations : le menu mobile se referme à chaque page (retour arrière compris).
	useEffect(() => setOpen(false), [pathname]);
	/** Liens de la partie : apparition en cascade après un changement de partie. */
	const swapIn = (index: number) =>
		changes > 0
			? {
					className: "nav-swap-in",
					style: { "--i": index } as CSSProperties,
				}
			: { className: undefined, style: undefined };
	const register = (key: string) => (el: HTMLLIElement | null) => {
		items.current[`${area}:${key}`] = el;
	};

	return (
		// Hauteur réservée dans le flux ; la capsule flotte par-dessus le contenu.
		<header className="sticky top-0 z-40 h-[var(--nav-height)] pointer-events-none">
			<a
				href="#contenu"
				className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
			>
				Aller au contenu
			</a>
			<div className="flex justify-center px-3 pt-3 sm:px-4">
				<div className="pointer-events-auto relative w-full max-w-[28rem] lg:w-auto lg:max-w-fit">
					<div
						className={cn(
							"w-full overflow-hidden rounded-full border border-line/80 bg-white/70 backdrop-blur-xl transition-[width,height,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
							scrolled
								? "h-12 shadow-[0_10px_34px_-10px_rgba(15,23,42,0.3)]"
								: "h-14 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.18)]",
						)}
						style={{ width: capsuleWidth }}
					>
						<div
							ref={row}
							className="flex h-full w-full items-center justify-between gap-2 pl-5 lg:w-max lg:justify-start"
						>
							<Link
								to={areaHome(area)}
								className="group mr-1 flex items-center gap-2 text-[1.15rem] font-bold lg:mr-3"
								onClick={close}
							>
								<img
									src="/logo-64.webp"
									alt=""
									width={28}
									height={28}
									className="size-7 shrink-0 transition-transform duration-300 group-hover:-rotate-6"
								/>
								<span>
									nikho<span className="text-signal">.dev</span>
								</span>
							</Link>

							<AreaSwitch area={area} changes={changes} onNavigate={close} />

							<nav
								aria-label={
									area === "blog"
										? "Navigation du blog"
										: "Navigation du portfolio"
								}
								className="ml-2 hidden lg:block"
							>
								<ul key={area} className="relative flex items-center gap-0.5">
									<li
										aria-hidden="true"
										className={cn(
											"pointer-events-none absolute inset-y-0 left-0 rounded-full",
											area === "blog" ? "bg-highlight-soft" : "bg-signal-soft",
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
									{area === "portfolio" ? (
										portfolioLinks.map((l, i) => (
											<li
												key={l.to}
												ref={register(l.to)}
												className={cn("relative", swapIn(i).className)}
												style={swapIn(i).style}
											>
												<Link
													to={l.to}
													aria-current={active === l.to ? "page" : undefined}
													className={desktopLink(active === l.to)}
												>
													{l.label}
												</Link>
											</li>
										))
									) : (
										<>
											<li
												ref={register(ALL_POSTS)}
												className={cn("relative", swapIn(0).className)}
												style={swapIn(0).style}
											>
												<Link
													to="/blog"
													aria-current={
														active === ALL_POSTS ? "page" : undefined
													}
													className={desktopLink(active === ALL_POSTS)}
												>
													Tous les articles
												</Link>
											</li>
											{/* Catégories : seulement sur grand écran, les filtres du blog prennent le relais ailleurs. */}
											{blogCategories.map((c, i) => (
												<li
													key={c.slug}
													ref={register(c.slug)}
													className={cn(
														"relative hidden xl:block",
														swapIn(i + 1).className,
													)}
													style={swapIn(i + 1).style}
												>
													<Link
														to="/blog/categorie/$category"
														params={{ category: c.slug }}
														aria-current={
															active === c.slug ? "page" : undefined
														}
														className={desktopLink(active === c.slug)}
													>
														{c.name}
													</Link>
												</li>
											))}
										</>
									)}
								</ul>
							</nav>

							<div className="hidden pr-1.5 pl-2 lg:block">
								<RouteButton
									to="/contact"
									className="!rounded-full !px-4 !py-2 !text-[14px]"
								>
									Me contacter
								</RouteButton>
							</div>

							<button
								type="button"
								className="mr-1.5 ml-1 grid size-9 shrink-0 place-items-center rounded-full bg-paper-2 lg:hidden"
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
					</div>

					{open && (
						<nav
							id="menu-mobile"
							aria-label="Navigation mobile"
							className="absolute top-full right-0 left-0 mt-2 rounded-3xl border border-line/80 bg-white/90 p-3 shadow-[0_18px_48px_-16px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:hidden"
						>
							<p className="px-4 pt-1 pb-2 text-[0.8rem] font-semibold text-ink-soft">
								{area === "blog" ? "Blog" : "Portfolio"}
							</p>
							<ul className="grid">
								{area === "portfolio" ? (
									portfolioLinks.map((l) => (
										<li key={l.to}>
											<Link
												to={l.to}
												onClick={close}
												aria-current={active === l.to ? "page" : undefined}
												className={mobileLink(active === l.to)}
											>
												{l.label}
											</Link>
										</li>
									))
								) : (
									<>
										<li>
											<Link
												to="/blog"
												onClick={close}
												aria-current={active === ALL_POSTS ? "page" : undefined}
												className={mobileLink(active === ALL_POSTS)}
											>
												Tous les articles
											</Link>
										</li>
										{blogCategories.map((c) => (
											<li key={c.slug}>
												<Link
													to="/blog/categorie/$category"
													params={{ category: c.slug }}
													onClick={close}
													aria-current={active === c.slug ? "page" : undefined}
													className={mobileLink(active === c.slug)}
												>
													{c.name}
												</Link>
											</li>
										))}
									</>
								)}
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
