import {Container, Text} from "@/components/lib/title";
import { twMerge } from 'tailwind-merge'
import Magnet from "@/components/lib/magnet";

const skills = {
    'typescript': {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        type: 'frontend',
        color: 'blue',
    },
    'react': {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        type: 'frontend',
        color: 'blue',
    },
    'rust': {
        name: 'Rust',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg',
        type: 'backend',
        color: 'blue',
    },
    'docker': {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
        type: 'devops',
        color: 'blue',
    },
    'postgresql': {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
        type: 'backend',
        color: 'blue',
    },
    'elysiajs': {
        name: 'ElysiaJS',
        icon: 'https://avatars.githubusercontent.com/u/119793569?s=200&v=4',
        type: 'backend',
        color: 'blue',
    },
    'nestjs': {
        name: 'NestJS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
        type: 'backend',
        color: 'red',
    },
    'tailwind': {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        type: 'design',
        color: 'blue',
    },
    'android': {
        name: 'Android',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
        type: 'frontend',
        color: 'green',
    },
    'kubernetes': {
        name: 'Kubernetes',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg',
        type: 'devops',
        color: 'blue',
    },
    'githubactions': {
        name: 'GitHub Actions',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
        type: 'devops',
        color: 'purple',
    },
    'terraform': {
        name: 'Terraform',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg',
        type: 'devops',
        color: 'blue',
    },
    'redis': {
        name: 'Redis',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
        type: 'backend',
        color: 'red',
    },
    'prisma': {
        name: 'Prisma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
        type: 'backend',
        color: 'blue',
    },
    'node': {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        type: 'backend',
        color: 'green',
    },
    'nextjs': {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
        type: 'frontend',
        color: 'black',
    },
    'mongodb': {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
        type: 'backend',
        color: 'green',
    },
    'linux': {
        name: 'Linux',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
        type: 'devops',
        color: 'black',
    },
    'jenkins': {
        name: 'Jenkins',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',
        type: 'devops',
        color: 'red',
    },
    'java': {
        name: 'Java 17-21',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
        type: 'backend',
        color: 'red',
    },
    'influxdb': {
        name: 'InfluxDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/influxdb/influxdb-original.svg',
        type: 'backend',
        color: 'blue',
    },
    'graphql': {
        name: 'GraphQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
        type: 'backend',
        color: 'pink',
    },
    'grafana': {
        name: 'Grafana',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg',
        type: 'devops',
        color: 'orange',
    },
    'googlecloud': {
        name: 'Google Cloud',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
        type: 'devops',
        color: 'blue',
    },
    'github': {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
        type: 'devops',
        color: 'black',
    },
    'gitlab': {
        name: 'GitLab',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg',
        type: 'devops',
        color: 'orange',
    },
    'framer': {
        name: 'Framer',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
        type: 'design',
        color: 'blue',
    },
    'flutter': {
        name: 'Flutter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
        type: 'frontend',
        color: 'blue',
    },
    'figma': {
        name: 'Figma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        type: 'design',
        color: 'pink',
    },
    'cypress': {
        name: 'Cypress',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg',
        type: 'devops',
        color: 'green',
    },
    'cloudflare': {
        name: 'Cloudflare',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg',
        type: 'devops',
        color: 'orange',
    },
    'bun': {
        name: 'Bun',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg',
        type: 'backend',
        color: 'yellow',
    },
    'azure': {
        name: 'Azure',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
        type: 'devops',
        color: 'blue',
    },
    'argocd': {
        name: 'ArgoCD',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg',
        type: 'devops',
        color: 'blue',
    },
    'cpp': {
        name: 'C++',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
        type: 'backend',
        color: 'blue',
    }
} as const;

type SkillType = typeof skills[keyof typeof skills]['type'];
type SkillColor = typeof skills[keyof typeof skills]['color'];

export default function Skills() {

    return (
        <Container className={"flex flex-col gap-12 m-auto relative pb-16 lg:pb-32 service"}>
            <div className={'grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4'}>
                <SkillCard favorite size={'xl'} skill={skills.typescript} className={'col-span-2 row-span-2'}/>
                <SkillCard favorite size={'lg'} skill={skills.react} className={'col-span-2'}/>
                <SkillCard favorite size={'md'} skill={skills.elysiajs} className={'col-span-2'}/>
                <SkillCard skill={skills.java} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.docker} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.kubernetes} size={'lg'} className={'col-span-2'}/>
                <SkillCard skill={skills.nextjs} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.tailwind} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.githubactions} size={'sm'} className={'col-span-2'}/>
                <SkillCard skill={skills.cpp} size={'md'} className={'col-span-2'}/>
                <SkillCard favorite skill={skills.bun} size={'xl'} className={'col-span-2 row-span-2'}/>
                <SkillCard skill={skills.flutter} size={'sm'} className={'col-span-2'}/>
                <SkillCard skill={skills.linux} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.redis} size={'sm'} className={'col-span-1'}/>
                <SkillCard favorite skill={skills.rust} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.nestjs} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.node} size={'sm'} className={'col-span-1'}/>
                <SkillCard favorite skill={skills.postgresql} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.mongodb} size={'sm'} className={'col-span-1'}/>
                <SkillCard skill={skills.terraform} size={'sm'} className={'col-span-1'}/>
            </div>
        </Container>
    )
}

type Skill = {
    name: string;
    icon: string;
    type?: 'frontend' | 'backend' | 'devops' | 'design';
    color: SkillColor
}

type Props = {
    favorite?: boolean;
    size: 'sm' | 'md' | 'lg' | 'xl';
    className?: string | undefined;
    skill: Skill;
}

const SkillCard = ({skill, className, size, favorite}: Props) => {

    const getColor = () => {
        switch (skill.color) {
            case 'blue':
                return 'bg-blue-50';
            case 'red':
                return 'bg-red-100';
            case 'green':
                return 'bg-green-100';
            case 'black':
                return 'bg-black/10';
            case 'purple':
                return 'bg-purple-100';
            case 'pink':
                return 'bg-pink-100';
            case 'orange':
                return 'bg-orange-100';
            case 'yellow':
                return 'bg-yellow-100';
            default:
                return 'bg-gray-100';
        }
    }

    return (
        <div className={twMerge(`bg-white py-4 shadow-sm border border-slate-200 rounded-2xl relative group`, className)}>
            {favorite && <img alt={'star'} className={'absolute top-0 right-0 w-4 h-4 m-3'} src={'/star.png'}/>}
            <Magnet padding={20} magnetStrength={4} wrapperClassName={'flex items-center w-full h-full'} innerClassName={'w-full h-full'}>
                <div className={'w-full flex flex-col items-center justify-center gap-2 h-full group-hover:scale-120 transition-all'}>
                    <div className={`${getColor()} rounded-2xl p-2`}>
                        <img src={skill.icon} alt="" className={`${size === 'xl' ? 'w-20 h-20' : ''} ${size === 'lg' ? 'w-16 h-16' : ''} ${size === 'md' ? 'w-12 h-12' : ''} ${size === 'sm' ? 'w-8 h-8' : ''}`}/>
                    </div>
                    {size === 'xl' && <Text className="text-2xl font-bold text-center">{skill.name}</Text>}
                    {size === 'lg' && <Text className="text-xl font-bold text-center">{skill.name}</Text>}
                    {size === 'md' && <Text className="text-lg font-semibold text-center">{skill.name}</Text>}
                    {size === 'sm' && <Text className="text-md font-semibold text-center">{skill.name}</Text>}
                </div>
            </Magnet>
        </div>
    );
}