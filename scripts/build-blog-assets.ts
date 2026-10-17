/**
 * Publie les images des articles dans `public/blog-assets/<slug>/` :
 * - PNG et JPEG convertis en WebP (largeur max. `MAX_IMAGE_WIDTH`),
 *   les autres formats copiés tels quels ;
 * - image de partage `og.png` générée depuis le titre et la catégorie.
 *
 * Incrémental : un fichier déjà à jour n'est pas régénéré. Lancé avant
 * `dev` et `build`.
 *
 * Usage : bun run blog:assets
 */
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { parse } from "yaml";
import { getBlogCategory } from "../src/content/blog";
import {
	BLOG_ASSETS_DIR,
	BLOG_CONTENT_DIR,
	IMAGE_FILE,
	MAX_IMAGE_WIDTH,
	publishedName,
} from "../src/features/blog/assets";
import { renderOgImage } from "./og-image";

const isFresh = (output: string, ...sources: string[]) =>
	existsSync(output) &&
	sources.every((s) => statSync(s).mtimeMs <= statSync(output).mtimeMs);

function frontmatter(file: string): Record<string, unknown> {
	const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(file, "utf8"));
	if (!match) throw new Error(`${file} : frontmatter manquant`);
	return parse(match[1]) ?? {};
}

async function publishImages(slug: string, outDir: string): Promise<number> {
	const srcDir = join(BLOG_CONTENT_DIR, slug);
	const images = readdirSync(srcDir).filter((f) => IMAGE_FILE.test(f));
	let written = 0;
	for (const file of images) {
		const src = join(srcDir, file);
		const out = join(outDir, publishedName(file));
		if (isFresh(out, src)) continue;
		if (out.endsWith(".webp") && !file.endsWith(".webp")) {
			await sharp(src)
				.resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
				.webp({ quality: 82 })
				.toFile(out);
		} else {
			copyFileSync(src, out);
		}
		written++;
	}
	return written;
}

async function publishOgImage(slug: string, outDir: string): Promise<boolean> {
	const source = join(BLOG_CONTENT_DIR, slug, "index.mdx");
	const out = join(outDir, "og.png");
	if (isFresh(out, source, "scripts/og-image.tsx")) return false;
	const data = frontmatter(source);
	const title = String(data.title ?? slug);
	const found = getBlogCategory(String(data.category));
	const category = found?.name ?? "Blog";
	const tone = found?.tone ?? { ink: "#2c5be6", soft: "#eaf0ff" };
	writeFileSync(out, await renderOgImage({ title, category, tone }));
	return true;
}

async function main() {
	if (!existsSync(BLOG_CONTENT_DIR)) return;
	const slugs = readdirSync(BLOG_CONTENT_DIR).filter((d) =>
		existsSync(join(BLOG_CONTENT_DIR, d, "index.mdx")),
	);

	// Dossiers d'articles supprimés ou renommés : leurs images publiées partent aussi.
	if (existsSync(BLOG_ASSETS_DIR)) {
		for (const dir of readdirSync(BLOG_ASSETS_DIR)) {
			if (!slugs.includes(dir)) {
				rmSync(join(BLOG_ASSETS_DIR, dir), { recursive: true, force: true });
			}
		}
	}

	let images = 0;
	let og = 0;
	for (const slug of slugs) {
		const outDir = join(BLOG_ASSETS_DIR, slug);
		mkdirSync(outDir, { recursive: true });
		images += await publishImages(slug, outDir);
		if (await publishOgImage(slug, outDir)) og++;
	}
	console.log(
		`[blog:assets] ${slugs.length} article(s) · ${images} image(s) · ${og} image(s) OG générée(s)`,
	);
}

main().catch((err) => {
	console.error("[blog:assets]", err);
	process.exit(1);
});
