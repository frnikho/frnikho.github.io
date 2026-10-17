import { useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import { Glyph } from "@/components/services/glyph";
import { RouteButton } from "@/components/site/button";
import { familyIcons } from "@/content/service-poles";
import type { ServiceFamily } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Une famille du catalogue, dépliable sur place. Le détail reste dans le DOM
 * (indexable) et s'ouvre aussi quand l'URL pointe sur son ancre
 * (`/services#kubernetes`, cible des anciennes pages de détail).
 */
export function FamilyDisclosure({ family: f }: { family: ServiceFamily }) {
	const hash = useRouterState({ select: (s) => s.location.hash });
	const [open, setOpen] = useState(false);
	const panelId = useId();

	useEffect(() => {
		if (hash === f.slug) setOpen(true);
	}, [hash, f.slug]);

	return (
		<li
			id={f.slug}
			className={cn(
				"surface overflow-clip transition-colors",
				open ? "border-signal/50" : "hover:border-signal/50",
			)}
		>
			<h3>
				<button
					type="button"
					aria-expanded={open}
					aria-controls={panelId}
					onClick={() => setOpen((o) => !o)}
					className="group flex w-full items-center gap-4 p-4 text-left"
				>
					<span
						className={cn(
							"grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
							open
								? "bg-signal text-white"
								: "bg-signal-soft text-signal group-hover:bg-signal group-hover:text-white",
						)}
					>
						<Glyph name={familyIcons[f.slug] ?? "check"} />
					</span>
					<span className="min-w-0 flex-1">
						<span className="block font-semibold group-hover:text-signal-deep">
							{f.name}
						</span>
						<span className="block text-[0.93rem] leading-snug font-normal text-ink-soft">
							{f.short}
						</span>
					</span>
					<span
						aria-hidden="true"
						className={cn(
							"grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-transform duration-300",
							open && "rotate-45 border-signal text-signal",
						)}
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 16 16"
							className="size-3.5"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
						>
							<path d="M8 3v10M3 8h10" />
						</svg>
					</span>
				</button>
			</h3>
			<div
				id={panelId}
				inert={!open}
				className={cn(
					"grid transition-[grid-template-rows] duration-300 ease-out",
					open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
				)}
			>
				<div className="overflow-hidden">
					<FamilyDetail family={f} />
				</div>
			</div>
		</li>
	);
}

function FamilyDetail({ family: f }: { family: ServiceFamily }) {
	return (
		<div className="border-t border-line px-4 pt-5 pb-6 sm:px-5">
			<p className="font-semibold leading-snug">{f.headline}</p>
			<p className="mt-2 text-[0.95rem] text-ink-soft">{f.intro}</p>

			<ul className="mt-5 grid gap-3">
				{f.items.map((it) => (
					<li key={it.title} className="border-l-2 border-signal/40 pl-3.5">
						<p className="text-[0.95rem] font-semibold">{it.title}</p>
						<p className="text-[0.9rem] leading-snug text-ink-soft">
							{it.desc}
						</p>
					</li>
				))}
			</ul>

			<div className="mt-5 rounded-xl bg-signal-soft p-4">
				<p className="text-[13px] font-semibold text-signal-deep">
					Vous recevez
				</p>
				<ul className="mt-2.5 grid gap-1.5 text-[0.9rem]">
					{f.deliverables.map((d) => (
						<li key={d} className="flex gap-2.5">
							<Glyph name="check" className="mt-[0.2em] size-4 text-ok" />
							<span>{d}</span>
						</li>
					))}
				</ul>
			</div>

			<p className="mt-5 text-[0.9rem]">
				<span className="font-semibold">Pour qui : </span>
				<span className="text-ink-soft">{f.forWho}</span>
			</p>

			<div className="mt-5 flex flex-wrap items-center justify-between gap-4">
				<ul className="flex flex-wrap gap-1.5">
					{f.tools.map((t) => (
						<li
							key={t}
							className="rounded-full border border-line bg-paper-2 px-2.5 py-0.5 text-[12px] font-medium"
						>
							{t}
						</li>
					))}
				</ul>
				<RouteButton
					to="/contact"
					variant="ghost"
					className="px-4 py-2 text-[14px]"
				>
					En parler
				</RouteButton>
			</div>
		</div>
	);
}
