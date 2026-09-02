import type { SkillEntry } from "@/features/home/types";

// grafana entry removed — dead data (never rendered in Stack grid, 14 cards on 15 entries).
// To restore, add entry here and a <SkillCard skill={skillsData.grafana} /> in Stack.

export const skillsData: Record<string, SkillEntry> = {
	typescript: {
		name: "TypeScript",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
		color: "blue",
	},
	react: {
		name: "React",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
		color: "blue",
	},
	rust: {
		name: "Rust",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
		color: "blue",
	},
	docker: {
		name: "Docker",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
		color: "blue",
	},
	postgresql: {
		name: "PostgreSQL",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
		color: "blue",
	},
	elysiajs: {
		name: "ElysiaJS",
		icon: "https://avatars.githubusercontent.com/u/119793569?s=200&v=4",
		color: "blue",
	},
	nestjs: {
		name: "NestJS",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
		color: "red",
	},
	tailwind: {
		name: "Tailwind",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
		color: "blue",
	},
	kubernetes: {
		name: "Kubernetes",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
		color: "blue",
	},
	terraform: {
		name: "Terraform",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
		color: "blue",
	},
	redis: {
		name: "Redis",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
		color: "red",
	},
	nextjs: {
		name: "Next.js",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
		color: "black",
	},
	bun: {
		name: "Bun",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
		color: "yellow",
	},
	prisma: {
		name: "Prisma",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
		color: "blue",
	},
	nodejs: {
		name: "Node.js",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
		color: "green",
	},
};
