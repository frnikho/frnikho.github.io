import { join } from "node:path";
import type { Image, Root } from "mdast";
import sharp from "sharp";
import { visit } from "unist-util-visit";
import {
	assetUrl,
	BLOG_CONTENT_DIR,
	isRelativeAsset,
	MAX_IMAGE_WIDTH,
} from "./assets";

type Options = { slug: string };

/** Dimensions affichées : celles du fichier, réduites comme lors de la conversion. */
async function displaySize(file: string) {
	const { width, height } = await sharp(file).metadata();
	if (!width || !height) return null;
	const ratio = Math.min(1, MAX_IMAGE_WIDTH / width);
	return {
		width: Math.round(width * ratio),
		height: Math.round(height * ratio),
	};
}

/**
 * Réécrit les images relatives d'un article vers leur URL publiée et ajoute
 * largeur, hauteur et chargement différé (pas de décalage de mise en page).
 * Une image introuvable fait échouer la compilation.
 */
export function remarkBlogAssets({ slug }: Options) {
	return async (tree: Root) => {
		const images: Image[] = [];
		visit(tree, "image", (node) => {
			if (isRelativeAsset(node.url)) images.push(node);
		});
		await Promise.all(
			images.map(async (node) => {
				const file = join(
					BLOG_CONTENT_DIR,
					slug,
					node.url.replace(/^\.\//, ""),
				);
				const size = await displaySize(file).catch(() => {
					throw new Error(`[blog:${slug}] image introuvable : ${node.url}`);
				});
				node.url = assetUrl(slug, node.url);
				node.data = {
					...node.data,
					hProperties: {
						...(size ?? {}),
						loading: "lazy",
						decoding: "async",
					},
				};
			}),
		);
	};
}
