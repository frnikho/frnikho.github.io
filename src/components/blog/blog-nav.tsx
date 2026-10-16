import { Link } from "@tanstack/react-router";
import { blogCategories } from "@/content/blog";
import { RSS_PATH } from "@/features/blog/feeds";
import type { Page } from "@/features/blog/posts";
import { cn } from "@/lib/cn";

const chip =
	"rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] font-medium text-ink-soft transition-colors hover:border-ink/30 hover:text-ink";
const chipActive = "!border-signal !bg-signal-soft !text-signal-deep";

/** Filtre par catégorie, et lien vers le flux RSS. */
export function CategoryNav({ active }: { active?: string }) {
	return (
		<nav aria-label="Catégories du blog" className="flex flex-wrap gap-2">
			<Link
				to="/blog"
				className={cn(chip, !active && chipActive)}
				aria-current={!active ? "page" : undefined}
			>
				Tous les articles
			</Link>
			{blogCategories.map((c) => (
				<Link
					key={c.slug}
					to="/blog/categorie/$category"
					params={{ category: c.slug }}
					className={cn(chip, active === c.slug && chipActive)}
					aria-current={active === c.slug ? "page" : undefined}
				>
					{c.name}
				</Link>
			))}
			<a href={RSS_PATH} className={cn(chip, "ml-auto")}>
				Flux RSS
			</a>
		</nav>
	);
}

/** Pagination par URL (`/blog/page/N`) : chaque page est un lien que Google suit. */
export function Pagination({ page }: { page: Page<unknown> }) {
	if (page.totalPages <= 1) return null;
	const pages = Array.from({ length: page.totalPages }, (_, i) => i + 1);
	const link = (n: number) =>
		n === 1
			? ({ to: "/blog" } as const)
			: ({ to: "/blog/page/$page", params: { page: String(n) } } as const);
	const item =
		"grid min-w-10 place-items-center rounded-lg border border-line px-3 py-2 text-[15px] font-medium";

	return (
		<nav aria-label="Pagination" className="mt-14 flex flex-wrap gap-2">
			{page.page > 1 && (
				<Link
					{...link(page.page - 1)}
					rel="prev"
					className={cn(item, "hover:bg-paper-2")}
				>
					← Plus récents
				</Link>
			)}
			{pages.map((n) =>
				n === page.page ? (
					<span
						key={n}
						aria-current="page"
						className={cn(item, "border-signal bg-signal text-white")}
					>
						{n}
					</span>
				) : (
					<Link key={n} {...link(n)} className={cn(item, "hover:bg-paper-2")}>
						{n}
					</Link>
				),
			)}
			{page.page < page.totalPages && (
				<Link
					{...link(page.page + 1)}
					rel="next"
					className={cn(item, "hover:bg-paper-2")}
				>
					Plus anciens →
				</Link>
			)}
		</nav>
	);
}
