/**
 * Crée un brouillon d'article : `content/blog/<slug>/index.mdx`.
 *
 * Usage : bun run new-post "Titre de l'article" [--cat ia] [--slug mon-slug]
 * Catégories : dev, ia, selfhost, outils, retex (défaut : dev).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { BLOG_CATEGORY_SLUGS } from "../src/content/blog";
import { BLOG_CONTENT_DIR } from "../src/features/blog/assets";
import { slugify } from "../src/features/blog/posts";
import { SLUG_PATTERN } from "../src/features/blog/schema";

const { values, positionals } = parseArgs({
	args: Bun.argv.slice(2),
	options: {
		cat: { type: "string", default: "dev" },
		slug: { type: "string" },
	},
	allowPositionals: true,
});

const title = positionals.join(" ").trim();
const category = values.cat ?? "dev";
const slug = values.slug ?? slugify(title);

const fail = (message: string): never => {
	console.error(`[new-post] ${message}`);
	process.exit(1);
};

if (!title) fail('Titre manquant : bun run new-post "Titre de l\'article"');
if (!(BLOG_CATEGORY_SLUGS as readonly string[]).includes(category)) {
	fail(`Catégorie inconnue « ${category} » : ${BLOG_CATEGORY_SLUGS.join(", ")}`);
}
if (!SLUG_PATTERN.test(slug)) fail(`Slug invalide « ${slug} »`);

const dir = join(BLOG_CONTENT_DIR, slug);
if (existsSync(dir)) fail(`${dir} existe déjà`);

const today = new Date().toISOString().slice(0, 10);
const quoted = JSON.stringify(title);

mkdirSync(dir, { recursive: true });
writeFileSync(
	join(dir, "index.mdx"),
	`---
title: ${quoted}
description: "À écrire : 50 à 160 caractères, ce qui s'affiche sous le titre dans Google."
publishedAt: ${today}
category: ${category}
tags: []
draft: true
# service: mise-en-production   # prestation liée (CTA + encart sur sa page)
# seoTitle: ""                   # si le titre dépasse 65 caractères
# cover: ./cover.png             # image à côté de ce fichier
# coverAlt: ""
---

Accroche : le problème, en deux ou trois phrases.

## Première partie

<Callout type="astuce">
  Encart optionnel : info, astuce ou attention.
</Callout>

\`\`\`bash title="Terminal"
echo "bloc de code avec nom de fichier"
\`\`\`
`,
);

console.log(`[new-post] ${dir}/index.mdx créé (brouillon, visible en dev uniquement).
Passez draft à false pour publier.`);
