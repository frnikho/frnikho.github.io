// ServiceItem: t=title, d=description — kept short to match data shape; prefer boring over churn.
export type ServiceItem = { t: string; d: string };

export type Service = {
	// n=number ("01", "02"…) — display order label
	n: string;
	title: string;
	accent: string;
	icon: string;
	desc: string;
	items: ServiceItem[];
};

export type TimelineEntry = {
	year: string;
	endYear: string | null;
	start_date: string;
	end_date: string | null;
	duration: string | null;
	title: string;
	company: string;
	type: string | null;
	accent: string;
	bg: string;
	desc: string;
	// mastered: k=key (skill label), d=description
	mastered: { k: string; d: string }[];
	tech: string[];
};

export type Project = {
	title: string;
	desc: string;
	img: string;
	href?: string;
	stack: string[];
};

export type Feedback = {
	user: string;
	description: string;
	profile_picture: string;
	role: string;
};

export type SkillColor =
	| "blue"
	| "red"
	| "green"
	| "black"
	| "purple"
	| "pink"
	| "orange"
	| "yellow";

export type SkillEntry = {
	name: string;
	icon: string;
	color: SkillColor;
};
