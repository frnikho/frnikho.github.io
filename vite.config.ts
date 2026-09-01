import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

export default defineConfig({
	server: {
		port: 3000,
		allowedHosts: [".trycloudflare.com"],
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [devtools(), tanstackStart(), viteReact(), tailwindcss()],
});
