import { SkillCard } from "@/features/home/components/skill-card";
import { skillsData } from "@/features/home/data/skills";
import {SectionHeader} from "@/features/home/components/section-header";

export function Stack() {
	return (
		<section id="stack" className="bg-paper border-y border-line/60">
			<div className="max-w-275 mx-auto px-6 py-16 lg:py-20">
				<div className="rounded-[2rem] bg-white border border-line shadow-[0_16px_40px_rgba(12,46,61,0.06)] p-6 lg:p-8">
					<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
						<SectionHeader
							prefix="Ma stack"
							accent="Technique"
							description="Celles que je maitrise et que j’utilise régulièrement"
							withDot={false}
							size="sm"
							containerClassName=""
							titleClassName="mt-3"
							descriptionClassName="mt-2.5"
						/>
					</div>
					<div className="mt-6 grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3 lg:gap-4">
						<SkillCard
							skill={skillsData.typescript}
							size="xl"
							favorite
							className="col-span-2 row-span-2"
						/>
						<SkillCard
							skill={skillsData.react}
							size="lg"
							favorite
							className="col-span-2"
						/>
						<SkillCard
							skill={skillsData.elysiajs}
							size="md"
							className="col-span-2"
						/>
						<SkillCard
							skill={skillsData.docker}
							size="sm"
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.nestjs}
							size="sm"
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.kubernetes}
							size="lg"
							className="col-span-2"
						/>
						<SkillCard
							skill={skillsData.nextjs}
							size="sm"
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.tailwind}
							size="sm"
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.bun}
							size="xl"
							favorite
							className="col-span-2 row-span-2"
						/>
						<SkillCard
							skill={skillsData.rust}
							size="sm"
							favorite
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.postgresql}
							size="sm"
							favorite
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.terraform}
							size="sm"
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.redis}
							size="sm"
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.nodejs}
							size="sm"
							className="col-span-1"
						/>
						<SkillCard
							skill={skillsData.prisma}
							size="sm"
							className="col-span-1"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

// compat alias per plan
export const StackMagnetic = Stack;
