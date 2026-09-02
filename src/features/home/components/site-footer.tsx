export function SiteFooter() {
	return (
		<footer className="border-t border-line/60 py-8">
			<div className="max-w-[1160px] mx-auto px-6 flex flex-col gap-6">
				<nav
					aria-label="Sections"
					className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-widest uppercase opacity-60"
				>
					<a
						href="/services"
						className="hover:opacity-100 hover:underline underline-offset-4"
					>
						Services
					</a>
					<a
						href="/stack"
						className="hover:opacity-100 hover:underline underline-offset-4"
					>
						Stack
					</a>
					<a
						href="/parcours"
						className="hover:opacity-100 hover:underline underline-offset-4"
					>
						Parcours
					</a>
					<a
						href="/projets"
						className="hover:opacity-100 hover:underline underline-offset-4"
					>
						Projets
					</a>
					<a
						href="/recommandations"
						className="hover:opacity-100 hover:underline underline-offset-4"
					>
						Recommandations
					</a>
					<a
						href="/contact"
						className="hover:opacity-100 hover:underline underline-offset-4"
					>
						Contact
					</a>
				</nav>
				<div className="flex flex-col md:flex-row justify-between gap-3 font-display text-[11px] tracking-widest uppercase opacity-80">
					<span className="flex items-center gap-2">
						<img
							src="/android-chrome-192x192.png"
							alt=""
							width={24}
							height={24}
							className="rounded-full"
						/>
						© {new Date().getFullYear()} Nicolas Sans - Nantes
					</span>
					<a
						href={"https://github.com/frnikho"}
						className={"flex flex-row items-center gap-2"}
					>
						<span>Github</span>
						<span className="w-7 h-7 rounded-full bg-primary grid place-items-center group-hover:bg-black transition-colors">
							<img src="/github-mark-white.svg" alt="" width={14} height={14} />
						</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
