import { Link } from "@tanstack/react-router";
import { SchemaDiagram } from "@/components/diagrams/schema-diagram";
import { clientProjectDiagrams } from "@/components/diagrams/specs";
import { type ClientProject, clientResults } from "@/content/projects";

function Tags({ items }: { items: string[] }) {
	return (
		<ul className="flex flex-wrap gap-1.5">
			{items.map((t) => (
				<li
					key={t}
					className="rounded-full bg-signal-soft px-2.5 py-0.5 text-[13px] font-medium text-signal-deep"
				>
					{t}
				</li>
			))}
		</ul>
	);
}

/** Carte courte pour l'accueil. */
export function ClientProjectCard({ project }: { project: ClientProject }) {
	return (
		<article className="surface flex flex-col overflow-hidden">
			<img
				src={project.image}
				alt={project.imageAlt}
				width={1100}
				height={600}
				loading="lazy"
				className="aspect-[16/9] w-full object-cover object-top"
			/>
			<div className="flex flex-1 flex-col p-6">
				<p className="text-[0.9rem] text-ink-soft">{project.kind}</p>
				<h3 className="mt-1 text-[1.3rem] font-semibold">{project.name}</h3>
				<p className="mt-3 flex-1 text-[0.98rem] text-ink-soft">
					{project.summary}
				</p>
				<div className="mt-4">
					<Tags items={project.stack.slice(0, 5)} />
				</div>
				<Link
					to="/realisations"
					hash={project.id}
					className="mt-5 inline-block text-[15px] font-semibold text-signal-deep underline underline-offset-4"
				>
					Voir le détail →
				</Link>
			</div>
		</article>
	);
}

/** Version complète pour la page Réalisations. */
export function ClientProjectDetail({ project }: { project: ClientProject }) {
	return (
		<article id={project.id} className="surface overflow-hidden">
			<div className="grid lg:grid-cols-[0.9fr_1.1fr]">
				<img
					src={project.image}
					alt={project.imageAlt}
					width={1100}
					height={600}
					loading="lazy"
					className="h-full max-h-[420px] w-full object-cover object-top lg:max-h-none"
				/>
				<div className="p-6 sm:p-8">
					<p className="text-[0.9rem] text-ink-soft">
						{project.kind} · {project.since}
					</p>
					<h3 className="mt-1 text-[1.6rem] font-bold">{project.name}</h3>
					<p className="mt-3 text-ink-soft">{project.summary}</p>
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-3 inline-block text-[15px] font-semibold text-signal-deep underline underline-offset-4"
					>
						{project.host} ↗
					</a>
				</div>
			</div>
			<div className="grid gap-6 border-t border-line p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
				<div>
					<h4 className="font-semibold">Contexte et enjeux</h4>
					<p className="mt-3 text-[0.97rem] text-ink-soft">
						{project.challenge}
					</p>
				</div>
				<SchemaDiagram spec={clientProjectDiagrams[project.id]} />
			</div>
			<div className="grid gap-6 border-t border-line p-6 sm:p-8 md:grid-cols-2">
				<div>
					<h4 className="font-semibold">Développement fullstack</h4>
					<ul className="mt-3 grid gap-2 text-[0.97rem] text-ink-soft">
						{project.built.map((b) => (
							<li key={b} className="flex gap-2.5">
								<span aria-hidden="true" className="text-signal">
									✓
								</span>
								<span>{b}</span>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h4 className="font-semibold">Infrastructure et déploiement</h4>
					<ul className="mt-3 grid gap-2 text-[0.97rem] text-ink-soft">
						{project.infra.map((b) => (
							<li key={b} className="flex gap-2.5">
								<span aria-hidden="true" className="text-signal">
									✓
								</span>
								<span>{b}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="border-t border-line bg-paper-2 px-6 py-4 sm:px-8">
				<Tags items={project.stack} />
			</div>
		</article>
	);
}

/** Résultats chiffrés des deux projets clients. */
export function ClientResults() {
	return (
		<dl className="grid grid-cols-3 gap-4 rounded-2xl bg-signal-soft p-5 sm:p-6">
			{clientResults.map((r) => (
				<div key={r.label} className="flex flex-col-reverse text-center">
					<dt className="mt-1 text-[0.9rem] text-ink-soft">{r.label}</dt>
					<dd className="text-[clamp(1.4rem,1rem+1.8vw,2.2rem)] leading-tight font-bold text-signal-deep">
						{r.value}
					</dd>
				</div>
			))}
		</dl>
	);
}
