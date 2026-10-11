import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

export function PageShell({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-paper text-ink">
			<Nav />
			<main id="contenu" className="flex-1">
				{children}
			</main>
			<SiteFooter />
		</div>
	);
}
