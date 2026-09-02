import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { projects } from "@/features/home/data/projects";
import {SectionHeader} from "@/features/home/components/section-header";

export function Projects() {
	const ref = useRef<HTMLDivElement>(null);
	const { events } = useDraggable(ref as React.RefObject<HTMLElement>);

	return (
		<section id="projects" className="bg-white">
			<div className="max-w-275 mx-auto px-6 py-16 lg:py-22">
				<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
					<SectionHeader
						prefix="Mes dernières"
						accent="Réalisations"
						description="Produits et outils développés par mes soins"
						containerClassName="max-w-[560px]"
					/>
					<a
						href="https://github.com/frnikho"
						target="_blank"
						rel="noreferrer"
						className="self-start lg:self-auto group inline-flex items-center gap-2 bg-white border border-line rounded-full pl-3 pr-1 py-1 shadow-sm transition-colors"
					>
						<span className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 group-hover:opacity-100 transition-opacity">
							Voir tout sur GitHub
						</span>
						<span className="w-7 h-7 rounded-full bg-primary grid place-items-center group-hover:bg-black transition-colors">
							<img src="/github-mark-white.svg" alt="" width={14} height={14} />
						</span>
					</a>
				</div>
				<div className="hidden md:grid md:grid-cols-2 gap-5 mt-8">
					{projects.map((p) => (
						<a
							key={p.title}
							href={p.href}
							target={p.href ? "_blank" : undefined}
							rel={p.href ? "noreferrer" : undefined}
							className="group bg-white rounded-[1.8rem] border border-line overflow-hidden shadow-[0_8px_24px_rgba(12,46,61,0.06)] hover:shadow-[0_16px_32px_rgba(12,46,61,0.10)] transition p-2"
						>
							<div className="rounded-[1.3rem] overflow-hidden aspect-16/10 bg-surface border border-line/40">
								<img
									src={p.img}
									alt={p.title}
									className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500"
								/>
							</div>
							<div className="px-4 pt-4 pb-3">
								<div className="flex items-center justify-between gap-2">
									<h3 className="font-display font-semibold">{p.title}</h3>
									<span className="inline-flex items-center gap-1.5 bg-surface border border-line rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase">
										<span className="w-1.5 h-1.5 rounded-full bg-primary opacity-60" />
										{p.stack.join(" - ")}
									</span>
								</div>
								<p className="text-sm opacity-60 mt-2 leading-relaxed">
									{p.desc}
								</p>
								<div className="mt-3 flex gap-2">
									{p.stack.map((s) => (
										<span
											key={s}
											className="bg-white border border-line rounded-full px-3 py-1 font-display text-[11px] shadow-sm"
										>
											{s}
										</span>
									))}
								</div>
							</div>
						</a>
					))}
				</div>
				<div
					ref={ref}
					{...events}
					className="md:hidden flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none mt-6 -mx-6 px-6 pb-2"
				>
					{projects.map((p) => (
						<a
							key={p.title}
							href={p.href}
							target={p.href ? "_blank" : undefined}
							rel={p.href ? "noreferrer" : undefined}
							className="shrink-0 snap-start w-[300px] bg-white rounded-[1.8rem] border border-line overflow-hidden p-2 shadow-sm"
						>
							<div className="rounded-[1.3rem] overflow-hidden aspect-16/10 bg-surface">
								<img
									src={p.img}
									alt={p.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="px-3 pt-3 pb-2">
								<h3 className="font-display font-semibold text-sm">
									{p.title}
								</h3>
								<p className="text-xs opacity-60 mt-1 line-clamp-2">{p.desc}</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
