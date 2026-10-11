import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalButton } from "@/components/site/button";
import { Container } from "@/components/site/section";
import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

const links = [
	{ hash: "expertise", label: "Expertise" },
	{ hash: "souverainete", label: "Souveraineté" },
	{ hash: "realisations", label: "Réalisations" },
	{ hash: "avis", label: "Références" },
	{ hash: "contact", label: "Contact" },
] as const;

const linkClass =
	"text-[15px] font-medium text-ink-soft transition-colors hover:text-ink";

export function Nav() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
			<a
				href="#contenu"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
			>
				Aller au contenu
			</a>
			<Container className="flex h-16 items-center justify-between gap-6">
				<Link
					to="/"
					className="flex items-center text-[1.3rem] font-bold"
					onClick={() => setOpen(false)}
				>
					<span>
						nikho<span className="text-signal">.dev</span>
					</span>
				</Link>

				<nav aria-label="Navigation principale" className="hidden lg:block">
					<ul className="flex items-center gap-7">
						{links.map((l) => (
							<li key={l.hash}>
								<Link to="/" hash={l.hash} className={linkClass}>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="hidden lg:block">
					<ExternalButton href={BOOKING_URL} className="!py-2.5">
						Me contacter
					</ExternalButton>
				</div>

				<button
					type="button"
					className="grid size-10 place-items-center rounded-lg border border-line lg:hidden"
					aria-expanded={open}
					aria-controls="menu-mobile"
					aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
					onClick={() => setOpen((v) => !v)}
				>
					<span aria-hidden="true" className=" text-[15px]">
						{open ? "×" : "≡"}
					</span>
				</button>
			</Container>

			{open && (
				<nav
					id="menu-mobile"
					aria-label="Navigation mobile"
					className="border-t border-line bg-paper lg:hidden"
				>
					<Container className="flex flex-col gap-1 py-4">
						{links.map((l) => (
							<Link
								key={l.hash}
								to="/"
								hash={l.hash}
								onClick={() => setOpen(false)}
								className="border-b border-line py-3 text-xl"
							>
								{l.label}
							</Link>
						))}
						<div className="pt-4">
							<ExternalButton href={BOOKING_URL}>
								{BOOKING_LABEL}
							</ExternalButton>
						</div>
					</Container>
				</nav>
			)}
		</header>
	);
}
