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
import {
	personJsonLd,
	siteNavigationJsonLd,
	websiteJsonLd,
} from "@/lib/jsonld";
import { getHead } from "@/lib/seo";

import "../styles/app.css";

export const Route = createRootRoute({
	head: () => getHead(),
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
