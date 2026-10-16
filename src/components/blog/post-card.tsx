import { Link } from "@tanstack/react-router";
import { getBlogCategory } from "@/content/blog";
import { formatPostDate, type PostSummary } from "@/features/blog/posts";
import { cn } from "@/lib/cn";

export function PostMeta({
	post,
	className,
}: {
	post: PostSummary;
	className?: string;
}) {
	const category = getBlogCategory(post.category);
	return (
		<p
			className={cn(
				"flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.88rem] text-ink-soft",
				className,
			)}
		>
			{category && (
				<Link
					to="/blog/categorie/$category"
					params={{ category: category.slug }}
					className="relative z-10 font-semibold text-signal hover:text-signal-deep"
				>
					{category.name}
				</Link>
			)}
			<span aria-hidden="true">·</span>
			<time dateTime={post.publishedAt}>
				{formatPostDate(post.publishedAt)}
			</time>
			<span aria-hidden="true">·</span>
			<span>{post.readingTime} min de lecture</span>
		</p>
	);
}

/**
 * Carte d'article. Toute la carte est cliquable (lien étiré sur le titre), le
 * lien de catégorie reste accessible au-dessus.
 */
export function PostCard({
	post,
	featured = false,
	headingLevel = "h2",
}: {
	post: PostSummary;
	featured?: boolean;
	headingLevel?: "h2" | "h3";
}) {
	const Heading = headingLevel;
	return (
		<article
			className={cn(
				"group relative flex h-full flex-col transition-shadow duration-200 hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)]",
				featured
					? "surface overflow-hidden lg:grid lg:grid-cols-[1.15fr_1fr]"
					: "surface overflow-hidden",
			)}
		>
			{post.cover && (
				<img
					src={post.cover}
					alt={post.coverAlt ?? ""}
					loading={featured ? "eager" : "lazy"}
					decoding="async"
					width={1200}
					height={630}
					className={cn(
						"aspect-[1200/630] w-full border-b border-line object-cover",
						featured && "lg:h-full lg:border-r lg:border-b-0",
					)}
				/>
			)}
			<div
				className={cn(
					"flex flex-1 flex-col p-6 sm:p-7",
					featured && "lg:justify-center lg:p-10",
				)}
			>
				<PostMeta post={post} />
				<Heading
					className={cn(
						"mt-3 font-semibold leading-tight",
						featured
							? "text-[clamp(1.45rem,1.15rem+1vw,2rem)]"
							: "text-[1.3rem]",
					)}
				>
					<Link
						to="/blog/$slug"
						params={{ slug: post.slug }}
						className="after:absolute after:inset-0 group-hover:text-signal-deep"
					>
						{post.title}
					</Link>
				</Heading>
				<p
					className={cn(
						"mt-3 text-ink-soft",
						featured ? "text-[1.08rem]" : "text-[0.98rem]",
					)}
				>
					{post.description}
				</p>
				<span
					aria-hidden="true"
					className="mt-auto pt-5 text-[0.92rem] font-semibold text-signal transition-transform duration-150 group-hover:translate-x-0.5"
				>
					Lire l'article →
				</span>
			</div>
		</article>
	);
}

/**
 * Ligne de liste dense, façon revue de presse : date en marge, titre,
 * extrait. Toute la ligne est cliquable (lien étiré sur le titre).
 */
export function PostRow({
	post,
	headingLevel = "h2",
}: {
	post: PostSummary;
	headingLevel?: "h2" | "h3";
}) {
	const Heading = headingLevel;
	return (
		<article className="group relative grid gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[8.5rem_1fr]">
			<time
				dateTime={post.publishedAt}
				className="pt-1 text-[0.88rem] text-ink-soft tabular"
			>
				{formatPostDate(post.publishedAt)}
			</time>
			<div>
				<Heading className="text-[1.2rem] leading-snug font-semibold">
					<Link
						to="/blog/$slug"
						params={{ slug: post.slug }}
						className="after:absolute after:inset-0 group-hover:text-signal-deep"
					>
						{post.title}
					</Link>
				</Heading>
				<p className="mt-1.5 line-clamp-2 max-w-[75ch] text-[0.98rem] text-ink-soft">
					{post.description}
				</p>
				<RowMeta post={post} />
			</div>
		</article>
	);
}

function RowMeta({ post }: { post: PostSummary }) {
	const category = getBlogCategory(post.category);
	return (
		<p className="mt-2 flex flex-wrap items-center gap-x-2.5 text-[0.85rem] text-ink-soft">
			{category && (
				<Link
					to="/blog/categorie/$category"
					params={{ category: category.slug }}
					className="relative z-10 font-semibold text-signal hover:text-signal-deep"
				>
					{category.name}
				</Link>
			)}
			<span aria-hidden="true">·</span>
			<span>{post.readingTime} min de lecture</span>
		</p>
	);
}

/**
 * Fil d'articles : le plus récent mis en avant (si `featureFirst`), les
 * suivants en liste dense.
 */
export function PostFeed({
	posts,
	featureFirst = false,
	headingLevel = "h2",
}: {
	posts: PostSummary[];
	featureFirst?: boolean;
	headingLevel?: "h2" | "h3";
}) {
	const [first, ...rest] = posts;
	const list = featureFirst ? rest : posts;
	return (
		<div className="grid gap-8">
			{featureFirst && first && (
				<PostCard post={first} featured headingLevel={headingLevel} />
			)}
			{list.length > 0 && (
				<ol className="border-t border-line">
					{list.map((p) => (
						<li key={p.slug}>
							<PostRow post={p} headingLevel={headingLevel} />
						</li>
					))}
				</ol>
			)}
		</div>
	);
}
