import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/footer";

/**
 * Contenu et pied de page d'une page. La navbar n'est pas ici : elle est
 * montée une seule fois dans `__root.tsx` pour survivre aux navigations
 * (sinon ses transitions repartiraient de zéro à chaque page).
 */
export function PageShell({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-[calc(100svh-var(--nav-height))] flex-col bg-paper text-ink">
			<main id="contenu" className="flex-1">
				{children}
			</main>
			<SiteFooter />
		</div>
	);
}
