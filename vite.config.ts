import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import {
	ANALYTICS_ORIGIN,
	securityHeaders,
} from "./src/lib/security-headers.ts";

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		// En premier : il annote le code source avant toute transformation, sinon
		// les attributs `data-tsd-source` diffèrent entre SSR et client (hydratation).
		devtools(),
		contentCollections(),
		tanstackStart(),
		nitro({
			routeRules: { "/**": { headers: securityHeaders(ANALYTICS_ORIGIN) } },
		}),
		viteReact(),
		tailwindcss(),
	],
});
