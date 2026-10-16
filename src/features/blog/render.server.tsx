import { MDXContent } from "@content-collections/mdx/react";
import { renderToStaticMarkup } from "react-dom/server";
import { mdxComponents } from "./mdx-components";

/**
 * Le MDX compilé s'évalue avec `new Function` : on le fait ici, côté serveur,
 * pour ne pas avoir à autoriser `unsafe-eval` dans la CSP du navigateur. Le
 * client reçoit du HTML. Le contenu ne change pas entre deux builds : le
 * résultat est mis en cache par article.
 */
const cache = new Map<string, string>();

export function renderPostHtml(slug: string, code: string): string {
	const cached = cache.get(slug);
	if (cached !== undefined) return cached;
	const html = renderToStaticMarkup(
		<MDXContent code={code} components={mdxComponents} />,
	);
	if (!import.meta.env.DEV) cache.set(slug, html);
	return html;
}
