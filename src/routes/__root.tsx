import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { Toaster, ToastProvider } from "@/components/ui/toast";
import { getAnalyticsScript } from "@/lib/analytics-config";
import {
	personJsonLd,
	siteNavigationJsonLd,
	websiteJsonLd,
} from "@/lib/jsonld";

import "../styles/app.css";

export const Route = createRootRoute({
	loader: () => getAnalyticsScript(),
	// La configuration d'audience ne change pas en cours de navigation.
	shouldReload: false,
	head: ({ loaderData }) => ({
		meta: [
			{ charSet: "utf-8" as const },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		scripts: loaderData
			? [
					{
						src: loaderData.src,
						defer: true,
						"data-website-id": loaderData.websiteId,
						"data-domains": loaderData.domains,
						"data-do-not-track": String(loaderData.respectDoNotTrack),
					},
				]
			: [],
	}),
	component: RootComponent,
});
function RootComponent() {
	return (
		<RootDocument>
			<ToastProvider>
				<Outlet />
				<Toaster />
			</ToastProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	const personLd = personJsonLd();
	const websiteLd = websiteJsonLd();
	const navLd = siteNavigationJsonLd();
	return (
		<html lang={"fr"}>
			<head>
				<HeadContent />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(navLd) }}
				/>
			</head>
			<body>
				{children}
				{import.meta.env.DEV && (
					<TanStackDevtools
						plugins={[
							{
								name: "TanStack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
