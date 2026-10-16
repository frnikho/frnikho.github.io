/**
 * Images des articles : rangées à côté du `.mdx`, publiées dans
 * `public/blog-assets/<slug>/` par `scripts/build-blog-assets.ts`. Les PNG et
 * JPEG y sont convertis en WebP. Ce module est la source unique de ces règles,
 * partagée entre le script et la compilation MDX.
 */
export const BLOG_CONTENT_DIR = "content/blog";
export const BLOG_ASSETS_DIR = "public/blog-assets";
export const BLOG_ASSETS_URL = "/blog-assets";
/** Largeur maximale des images converties : au-delà, elles sont réduites. */
export const MAX_IMAGE_WIDTH = 1600;

const CONVERTED = /\.(png|jpe?g)$/i;
export const IMAGE_FILE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;

/** Nom du fichier publié : les PNG et JPEG deviennent des WebP. */
export const publishedName = (file: string) =>
	CONVERTED.test(file) ? file.replace(CONVERTED, ".webp") : file;

export const isRelativeAsset = (src: string) =>
	src.startsWith("./") || !/^([a-z]+:|\/|#)/i.test(src);

/** URL publique d'une image référencée en relatif (`./capture.png`) dans l'article `slug`. */
export function assetUrl(slug: string, src: string): string {
	const file = src.replace(/^\.\//, "");
	return `${BLOG_ASSETS_URL}/${slug}/${publishedName(file)}`;
}

export const ogImagePath = (slug: string) =>
	`${BLOG_ASSETS_URL}/${slug}/og.png`;
