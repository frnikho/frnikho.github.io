import Magnet from "@/components/lib/magnet";
import { useHold } from "@/features/home/hooks/use-hold";
import type { SkillColor, SkillEntry } from "@/features/home/types";
import { cn } from "@/lib/cn";

const bg: Record<SkillColor, string> = {
	blue: "bg-blue-50",
	red: "bg-red-50",
	green: "bg-green-50",
	black: "bg-zinc-100",
	purple: "bg-purple-50",
	pink: "bg-pink-50",
	orange: "bg-orange-50",
	yellow: "bg-yellow-50",
};

const fillBg: Record<SkillColor, string> = {
	blue: "bg-blue-100",
	red: "bg-red-100",
	green: "bg-green-100",
	black: "bg-zinc-200",
	purple: "bg-purple-100",
	pink: "bg-pink-100",
	orange: "bg-orange-100",
	yellow: "bg-yellow-100",
};

const bubbleColor: Record<SkillColor, string> = {
	blue: "rgba(96,165,250,0.32)",
	red: "rgba(248,113,113,0.32)",
	green: "rgba(74,222,128,0.32)",
	black: "rgba(161,161,170,0.24)",
	purple: "rgba(167,139,250,0.32)",
	pink: "rgba(244,114,182,0.32)",
	orange: "rgba(251,146,60,0.32)",
	yellow: "rgba(250,204,21,0.32)",
};

const baseBubbles = [
	{ l: "12%", s: 10, d: 0, dur: 900 },
	{ l: "28%", s: 6, d: 120, dur: 820 },
	{ l: "42%", s: 12, d: 60, dur: 1000 },
	{ l: "62%", s: 7, d: 180, dur: 860 },
	{ l: "78%", s: 9, d: 40, dur: 950 },
	{ l: "18%", s: 5, d: 200, dur: 740 },
	{ l: "52%", s: 8, d: 90, dur: 920 },
	{ l: "88%", s: 6, d: 150, dur: 800 },
];

const extraBubblesXl = [
	{ l: "6%", s: 8, d: 30, dur: 880 },
	{ l: "35%", s: 5, d: 100, dur: 780 },
	{ l: "48%", s: 7, d: 140, dur: 860 },
	{ l: "70%", s: 11, d: 20, dur: 980 },
	{ l: "82%", s: 4, d: 170, dur: 760 },
	{ l: "25%", s: 9, d: 50, dur: 940 },
];

const extraBubblesLg = [
	{ l: "6%", s: 8, d: 30, dur: 880 },
	{ l: "48%", s: 7, d: 140, dur: 860 },
	{ l: "70%", s: 11, d: 20, dur: 980 },
];

export function SkillCard({
	skill,
	className,
	size,
	favorite,
}: {
	skill: SkillEntry;
	className?: string;
	size: "sm" | "md" | "lg" | "xl";
	favorite?: boolean;
}) {
	const { holding, showBubbles, startHold, cancelHold } = useHold(1000);

	const cardBubbles =
		size === "xl"
			? [...baseBubbles, ...extraBubblesXl]
			: size === "lg"
				? [...baseBubbles, ...extraBubblesLg]
				: baseBubbles;

	return (
		<div
			data-skill={skill.name}
			onPointerDown={startHold}
			onPointerUp={cancelHold}
			onPointerLeave={cancelHold}
			onPointerCancel={cancelHold}
			onContextMenu={(e) => e.preventDefault()}
			className={cn(
				"bg-surface border border-line rounded-[1.6rem] relative overflow-hidden transition select-none touch-manipulation",
				holding ? "scale-[0.98]" : "scale-100",
				className,
			)}
			style={{
				transition: holding ? "transform 120ms ease" : "transform 200ms ease",
			}}
		>
			<div
				aria-hidden
				className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.6rem]"
				style={{ opacity: holding ? 1 : 0, transition: "opacity 380ms ease" }}
			>
				{showBubbles &&
					cardBubbles.map((b, i) => (
						<span
							key={i}
							className="absolute bottom-0 rounded-full"
							style={{
								left: b.l,
								width: b.s,
								height: b.s,
								background: bubbleColor[skill.color] ?? "rgba(12,46,61,0.10)",
								border: "1px solid rgba(255,255,255,0.45)",
								animation: `bubbleRise ${b.dur}ms ease-in ${b.d}ms forwards`,
							}}
						/>
					))}
			</div>
			<div
				aria-hidden
				className="absolute inset-0 pointer-events-none rounded-[1.6rem] ring-1 ring-black/5"
			/>
			{favorite && (
				<img
					alt="fav"
					src="/star.png"
					className="absolute top-2 right-2 w-4 h-4 pointer-events-none z-10"
				/>
			)}
			<Magnet
				padding={48}
				magnetStrength={5}
				wrapperClassName="flex items-center w-full h-full p-3 relative z-10 cursor-pointer"
				innerClassName="w-full h-full"
			>
				<div className="w-full h-full flex flex-col items-center justify-center gap-2 py-2">
					<div
						className={cn(
							"rounded-2xl p-2 border border-black/5 relative overflow-hidden",
							bg[skill.color] ?? "bg-white",
						)}
					>
						<div
							aria-hidden
							className={cn(
								"absolute inset-x-0 bottom-0 pointer-events-none",
								fillBg[skill.color] ?? "bg-line",
							)}
							style={{
								height: holding ? "100%" : "0%",
								opacity: holding ? 1 : 0,
								transition: holding
									? "height 1000ms linear, opacity 220ms ease"
									: "height 420ms cubic-bezier(0.32,0.72,0,1), opacity 320ms ease",
							}}
						/>
						<img
							src={skill.icon}
							alt={skill.name}
							className={cn(
								"object-contain relative z-10",
								size === "xl" && "w-14 h-14 lg:w-16 lg:h-16",
								size === "lg" && "w-12 h-12",
								size === "md" && "w-10 h-10",
								size === "sm" && "w-8 h-8",
							)}
						/>
					</div>
					<span
						className={cn(
							"font-display text-center leading-tight",
							size === "xl" && "text-[15px] font-bold",
							size === "lg" && "text-sm font-bold",
							size === "md" && "text-xs font-semibold",
							size === "sm" && "text-xs font-semibold",
						)}
					>
						{skill.name}
					</span>
				</div>
			</Magnet>
		</div>
	);
}
