import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SITE_URL } from "@/lib/seo";

/**
 * Composants disponibles dans les articles. Le MDX est rendu en HTML côté
 * serveur (voir `render.server.tsx`) : ces composants doivent être statiques,
 * sans état ni effet. Toute interaction passe par `ArticleBody`.
 */

const calloutStyles = {
	info: { label: "À noter", className: "border-signal bg-signal-soft" },
	astuce: {
		label: "Astuce",
		className: "border-highlight-deep bg-highlight-soft",
	},
	attention: { label: "Attention", className: "border-alert bg-[#fff4ed]" },
} as const;

type CalloutProps = {
	type?: keyof typeof calloutStyles;
	title?: string;
	children: ReactNode;
};

function Callout({ type = "info", title, children }: CalloutProps) {
	const style = calloutStyles[type];
	return (
		<aside className={cn("callout", style.className)}>
			<p className="callout-title">{title ?? style.label}</p>
			<div className="callout-body">{children}</div>
		</aside>
	);
}

const isExternal = (href?: string) =>
	!!href && /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);

function Anchor({ href, children, ...props }: ComponentProps<"a">) {
	return isExternal(href) ? (
		<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
			{children}
		</a>
	) : (
		<a href={href} {...props}>
			{children}
		</a>
	);
}

/** Intertitre avec lien d'ancre, pour partager une section précise. */
function heading(Tag: "h2" | "h3") {
	return function Heading({ id, children }: ComponentProps<"h2">) {
		return (
			<Tag id={id}>
				{children}
				{id && (
					<a
						href={`#${id}`}
						className="heading-anchor"
						aria-label="Lien vers cette section"
					>
						#
					</a>
				)}
			</Tag>
		);
	};
}

/** Bloc de code avec bouton « Copier », branché par `ArticleBody`. */
function Pre(props: ComponentProps<"pre">) {
	return (
		<div className="code-block">
			<button type="button" data-copy-code className="code-copy">
				Copier
			</button>
			<pre {...props} />
		</div>
	);
}

function Image({ alt, ...props }: ComponentProps<"img">) {
	return <img alt={alt ?? ""} {...props} />;
}

export const mdxComponents = {
	Callout,
	a: Anchor,
	h2: heading("h2"),
	h3: heading("h3"),
	pre: Pre,
	img: Image,
};
