import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { ANALYTICS_ORIGIN, securityHeaders } from "./src/lib/security-headers";

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tanstackStart(),
		devtools(),
		nitro({
			routeRules: { "/**": { headers: securityHeaders(ANALYTICS_ORIGIN) } },
		}),
		viteReact(),
		tailwindcss(),
	],
});
