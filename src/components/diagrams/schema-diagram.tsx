import { useId, useMemo, useRef } from "react";
import { ICONS } from "@/components/diagrams/icons";
import type {
	DiagramSpec,
	DNode,
	DVariant,
	IconName,
	LegendKind,
	Tone,
} from "@/components/diagrams/types";
import { cn } from "@/lib/cn";
import { polarPoint } from "@/lib/geometry";
import { type GsapKit, useGsap } from "@/lib/use-gsap";

type ToneStyle = {
	box: string;
	badge: string;
	icon: string;
	title: string;
	sub: string;
	filter: "soft" | "glow";
};

const nodeTone: Record<Tone, ToneStyle> = {
	default: {
		box: "fill-card stroke-line",
		badge: "fill-signal-soft",
		icon: "stroke-signal",
		title: "fill-ink",
		sub: "fill-ink-soft",
		filter: "soft",
	},
	primary: {
		box: "fill-signal stroke-signal-deep",
		badge: "fill-white/20",
		icon: "stroke-white",
		title: "fill-white",
		sub: "fill-white/80",
		filter: "glow",
	},
	ok: {
		box: "fill-[#ecfdf3] stroke-ok",
		badge: "fill-ok/15",
		icon: "stroke-ok",
		title: "fill-ink",
		sub: "fill-ink-soft",
		filter: "soft",
	},
	danger: {
		box: "fill-[#fff4ed] stroke-alert",
		badge: "fill-alert/15",
		icon: "stroke-alert",
		title: "fill-ink",
		sub: "fill-ink-soft",
		filter: "soft",
	},
	night: {
		box: "fill-night stroke-night-line",
		badge: "fill-white/10",
		icon: "stroke-signal-glow",
		title: "fill-night-ink",
		sub: "fill-night-soft",
		filter: "soft",
	},
};

const LINE_HEIGHT = 18;
const BADGE = 30;
const BADGE_STACK = 34;
const ICON_SCALE = 0.7;

function Icon({
	name,
	x,
	y,
	size,
	tone,
}: {
	name: IconName;
	x: number;
	y: number;
	size: number;
	tone: ToneStyle;
}) {
	const scale = (size * ICON_SCALE) / 24;
	const inset = (size - 24 * scale) / 2;
	return (
		<g>
			<rect
				x={x}
				y={y}
				width={size}
				height={size}
				rx={9}
				className={tone.badge}
			/>
			<path
				d={ICONS[name]}
				transform={`translate(${x + inset} ${y + inset}) scale(${scale})`}
				fill="none"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				className={tone.icon}
			/>
		</g>
	);
}

function NodeText({
	node,
	tone,
	x,
	cy,
	anchor,
}: {
	node: DNode;
	tone: ToneStyle;
	x: number;
	cy: number;
	anchor: "start" | "middle";
}) {
	const lines = Array.isArray(node.title) ? node.title : [node.title];
	const count = lines.length + (node.sub ? 1 : 0);
	const top = cy - ((count - 1) * LINE_HEIGHT) / 2 - (node.sub ? 1 : 0);
	return (
		<>
			{lines.map((line, i) => (
				<text
					key={line}
					x={x}
					y={top + i * LINE_HEIGHT}
					textAnchor={anchor}
					dominantBaseline="central"
					className={cn("text-[14px] font-semibold", tone.title)}
				>
					{line}
				</text>
			))}
			{node.sub && (
				<text
					x={x}
					y={top + lines.length * LINE_HEIGHT}
					textAnchor={anchor}
					dominantBaseline="central"
					className={cn("text-[11.5px]", tone.sub)}
				>
					{node.sub}
				</text>
			)}
		</>
	);
}

function NodeBox({ node, filterId }: { node: DNode; filterId: string }) {
	const tone = nodeTone[node.tone ?? "default"];
	const stacked = node.layout === "stack" && node.icon;
	const cx = node.x + node.w / 2;
	const cy = node.y + node.h / 2;
	return (
		<g data-reveal filter={`url(#${filterId}-${tone.filter})`}>
			<rect
				x={node.x}
				y={node.y}
				width={node.w}
				height={node.h}
				rx={14}
				strokeWidth={1.5}
				className={tone.box}
			/>
			{stacked && node.icon ? (
				<>
					<Icon
						name={node.icon}
						x={cx - BADGE_STACK / 2}
						y={node.y + 14}
						size={BADGE_STACK}
						tone={tone}
					/>
					<NodeText
						node={node}
						tone={tone}
						x={cx}
						cy={node.y + 14 + BADGE_STACK + (node.h - 14 - BADGE_STACK) / 2}
						anchor="middle"
					/>
				</>
			) : node.icon ? (
				<>
					<Icon
						name={node.icon}
						x={node.x + 12}
						y={cy - BADGE / 2}
						size={BADGE}
						tone={tone}
					/>
					<NodeText
						node={node}
						tone={tone}
						x={node.x + 12 + BADGE + 10}
						cy={cy}
						anchor="start"
					/>
				</>
			) : (
				<NodeText node={node} tone={tone} x={cx} cy={cy} anchor="middle" />
			)}
			{node.step !== undefined && (
				<g>
					<circle
						cx={node.x}
						cy={node.y}
						r={11}
						strokeWidth={2.5}
						className="fill-ink stroke-white"
					/>
					<text
						x={node.x}
						y={node.y}
						textAnchor="middle"
						dominantBaseline="central"
						className="fill-white text-[11px] font-bold"
					>
						{node.step}
					</text>
				</g>
			)}
		</g>
	);
}

const EU_STARS = Array.from({ length: 12 }, (_, i) =>
	polarPoint((i / 12) * Math.PI * 2 - Math.PI / 2, 9),
);

function EuBadge({ x, y }: { x: number; y: number }) {
	return (
		<g transform={`translate(${x} ${y})`}>
			<circle r={17} className="fill-[#1d4ed8]" />
			{EU_STARS.map((s) => (
				<circle
					key={`${s.x}-${s.y}`}
					cx={s.x}
					cy={s.y}
					r={1.6}
					fill="#facc15"
				/>
			))}
		</g>
	);
}

function EdgeLabel({ text, x, y }: { text: string; x: number; y: number }) {
	const w = text.length * 6.4 + 18;
	return (
		<g data-reveal>
			<rect
				x={x - w / 2}
				y={y - 11}
				width={w}
				height={22}
				rx={11}
				strokeWidth={1.25}
				className="fill-white stroke-signal/40"
			/>
			<text
				x={x}
				y={y}
				textAnchor="middle"
				dominantBaseline="central"
				className="fill-signal-deep text-[11px] font-semibold"
			>
				{text}
			</text>
		</g>
	);
}

function Variant({ id, v }: { id: string; v: DVariant }) {
	const marker = `${id}-arrow`;
	return (
		<>
			<defs>
				<marker
					id={marker}
					viewBox="0 0 9 9"
					markerWidth="6"
					markerHeight="6"
					refX="7"
					refY="4.5"
					orient="auto"
				>
					<path d="M0 0L9 4.5L0 9z" className="fill-signal" />
				</marker>
				<filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="130%">
					<feDropShadow
						dx="0"
						dy="3"
						stdDeviation="4"
						floodColor="#0f172a"
						floodOpacity="0.09"
					/>
				</filter>
				<filter id={`${id}-glow`} x="-20%" y="-30%" width="140%" height="170%">
					<feDropShadow
						dx="0"
						dy="6"
						stdDeviation="8"
						floodColor="#2563eb"
						floodOpacity="0.38"
					/>
				</filter>
				<linearGradient id={`${id}-zone`} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#2563eb" stopOpacity="0.10" />
					<stop offset="1" stopColor="#2563eb" stopOpacity="0.02" />
				</linearGradient>
			</defs>

			{v.zones?.map((z) => (
				<g key={z.label} data-reveal>
					<rect
						x={z.x}
						y={z.y}
						width={z.w}
						height={z.h}
						rx={22}
						strokeDasharray="7 6"
						fill={`url(#${id}-zone)`}
						className="stroke-signal/55"
						strokeWidth={1.5}
					/>
					<text
						x={z.x + 20}
						y={z.labelAt === "bottom" ? z.y + z.h - 16 : z.y + 26}
						className="fill-signal-deep text-[12px] font-bold tracking-[0.08em] uppercase"
					>
						{z.label}
					</text>
					{z.eu && <EuBadge x={z.x + z.w - 36} y={z.y + 34} />}
				</g>
			))}

			{v.edges.map((e) => (
				<path
					key={e.id}
					id={`${id}-${e.id}`}
					d={e.d}
					fill="none"
					strokeWidth={2}
					data-reveal={e.hidden ? undefined : ""}
					strokeLinecap="round"
					strokeLinejoin="round"
					markerEnd={e.flow ? `url(#${marker})` : undefined}
					strokeDasharray={e.blocked ? "4 6" : undefined}
					className={cn(
						e.flow && "flow-line stroke-signal",
						e.blocked && "stroke-alert",
						!e.flow && !e.blocked && !e.hidden && "stroke-slate-300",
						e.hidden && "stroke-transparent",
					)}
				/>
			))}

			{/* Paquets sous les nœuds : ils semblent traverser les boîtes. */}
			{v.packets?.map((p) => (
				<circle
					key={`${p.edge}-${p.delay ?? 0}`}
					r={5.5}
					cx={0}
					cy={0}
					opacity={0}
					data-packet
					data-path={`#${id}-${p.edge}`}
					data-dur={p.dur}
					data-delay={p.delay ?? 0}
					data-gap={p.gap ?? 1.4}
					className={p.tone === "danger" ? "fill-alert" : "fill-signal"}
				/>
			))}

			{v.nodes.map((n) => (
				<NodeBox key={n.id} node={n} filterId={id} />
			))}

			{v.edges.map(
				(e) => e.label && <EdgeLabel key={`${e.id}-label`} {...e.label} />,
			)}

			{v.marks?.map((m) => (
				<g key={`${m.x}-${m.y}`} data-reveal>
					<circle
						cx={m.x}
						cy={m.y}
						r={13}
						className="fill-white stroke-alert"
						strokeWidth={2}
					/>
					<text
						x={m.x}
						y={m.y}
						textAnchor="middle"
						dominantBaseline="central"
						className="fill-alert text-[15px] font-bold"
					>
						{m.text}
					</text>
				</g>
			))}
		</>
	);
}

function isVisible(el: Element) {
	return el.getClientRects().length > 0;
}

function animate(root: Element, { gsap, ScrollTrigger }: GsapKit) {
	const reveals = gsap.utils
		.toArray<SVGElement>("[data-reveal]", root)
		.filter(isVisible);
	gsap.from(reveals, {
		opacity: 0,
		y: 10,
		duration: 0.6,
		ease: "power2.out",
		stagger: 0.06,
		scrollTrigger: { trigger: root, start: "top 80%", once: true },
	});

	const timelines = gsap.utils
		.toArray<SVGElement>("[data-packet]", root)
		.filter(isVisible)
		.map((el) => {
			const path = root.querySelector<SVGPathElement>(el.dataset.path ?? "");
			if (!path) return null;
			const dur = Number(el.dataset.dur);
			return gsap
				.timeline({
					repeat: -1,
					repeatDelay: Number(el.dataset.gap),
					delay: 0.8 + Number(el.dataset.delay),
					paused: true,
				})
				.set(el, { opacity: 0 })
				.to(el, { opacity: 1, duration: 0.2 })
				.to(
					el,
					{
						duration: dur,
						ease: "none",
						motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
					},
					"<",
				)
				.to(el, { opacity: 0, duration: 0.2 }, `>-0.2`);
		});

	// Les paquets ne tournent que lorsque le schéma est visible à l'écran.
	ScrollTrigger.create({
		trigger: root,
		start: "top bottom",
		end: "bottom top",
		onToggle: (self) => {
			for (const tl of timelines) {
				if (self.isActive) tl?.play();
				else tl?.pause();
			}
		},
	});
}

const legendSample: Record<LegendKind, React.ReactNode> = {
	flow: (
		<path
			d="M1 6H27"
			strokeWidth={2}
			strokeDasharray="6 5"
			strokeLinecap="round"
			className="stroke-signal"
		/>
	),
	blocked: (
		<path
			d="M1 6H27"
			strokeWidth={2}
			strokeDasharray="4 5"
			strokeLinecap="round"
			className="stroke-alert"
		/>
	),
	zone: (
		<rect
			x={1}
			y={1}
			width={26}
			height={10}
			rx={4}
			strokeDasharray="4 3"
			className="fill-signal-soft stroke-signal/60"
		/>
	),
	step: <circle cx={14} cy={6} r={5.5} className="fill-ink stroke-white" />,
};

function Legend({ items }: { items: NonNullable<DiagramSpec["legend"]> }) {
	return (
		<ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[12.5px] text-ink-soft">
			{items.map((i) => (
				<li key={i.text} className="flex items-center gap-2">
					<svg width="28" height="12" viewBox="0 0 28 12" aria-hidden="true">
						{legendSample[i.kind]}
					</svg>
					{i.text}
				</li>
			))}
		</ul>
	);
}

export function SchemaDiagram({
	spec,
	className,
}: {
	spec: DiagramSpec;
	className?: string;
}) {
	const uid = useId().replace(/:/g, "");
	const ref = useRef<HTMLDivElement>(null);
	const setup = useMemo(
		() => (kit: GsapKit) => {
			if (ref.current) animate(ref.current, kit);
		},
		[],
	);
	useGsap(ref, setup);

	const variants = [
		{ key: "wide", v: spec.wide, show: "hidden md:block" },
		{ key: "tall", v: spec.tall, show: "md:hidden" },
	] as const;

	return (
		<div ref={ref} className={className}>
			<div className="rounded-xl bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1.2px)] bg-[length:18px_18px] p-2 sm:p-4">
				{variants.map(({ key, v, show }) => (
					<svg
						key={key}
						viewBox={`0 0 ${v.size[0]} ${v.size[1]}`}
						role="img"
						aria-label={spec.label}
						className={cn("h-auto w-full overflow-visible", show)}
					>
						<Variant id={`${uid}${key}`} v={v} />
					</svg>
				))}
			</div>
			{spec.legend && <Legend items={spec.legend} />}
		</div>
	);
}
