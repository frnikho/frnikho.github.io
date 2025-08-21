import {Container} from "@/components/lib/title";
import { twMerge } from 'tailwind-merge'
import {cva, VariantProps} from "class-variance-authority";

/*type AllSkills = {
    [key: string]: Skill;
}*/

const skills = {
    'typescript': {
        name: 'TypeScript',
        description: 'A superset of JavaScript that adds static types.',
        icon: '/icons/typescript.svg',
        color: 'blue',
        link: 'https://www.typescriptlang.org/',
        type: 'frontend'
    },
    'react': {
        name: 'React',
        description: 'A JavaScript library for building user interfaces.',
        icon: '/icons/react.svg',
        color: 'cyan',
        link: 'https://reactjs.org/',
        type: 'frontend'
    },
    'rust': {
        name: 'Rust',
        description: 'A systems programming language focused on safety and performance.',
        icon: '/icons/rust.svg',
        color: 'orange',
        link: 'https://www.rust-lang.org/',
        type: 'backend'
    },
    'docker': {
        name: 'Docker',
        description: 'A platform for developing, shipping, and running applications in containers.',
        icon: '/icons/docker.svg',
        color: 'blue',
        link: 'https://www.docker.com/',
        type: 'devops'
    },
    'postgresql': {
        name: 'PostgreSQL',
        description: 'An open-source relational database management system.',
        icon: '/icons/postgresql.svg',
        color: 'blue',
        link: 'https://www.postgresql.org/',
        type: 'backend'
    },
    'elysiajs': {
        name: 'Elysia.js',
        description: 'A modern, fast, and lightweight web framework for building APIs in Node.js.',
        icon: '/icons/elysiajs.svg',
        color: 'purple',
        link: 'https://elysiajs.org/',
        type: 'backend'
    },
    'nestjs': {
        name: 'NestJS',
        description: 'A progressive Node.js framework for building efficient and scalable server-side applications.',
        icon: '/icons/nestjs.svg',
        color: 'yellow',
        link: 'https://nestjs.com/',
        type: 'backend'
    }
} as const;

const buttonVariants = cva(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);


export default function Skills() {
    return (
        <Container className={"grid grid-cols-10 gap-8 m-auto relative py-16 lg:py-32 service"}>
            <SkillCard skill={skills.typescript}/>
        </Container>
    )
}

type Skill = {
    name: string;
    description: string;
    icon: string;
    color: string;
    link?: string;
    type?: 'frontend' | 'backend' | 'devops' | 'design';
}

type Props = {
    className?: string | undefined;
    skill: Skill;
}

const SkillCard = ({skill, className}: Props & VariantProps<typeof buttonVariants>) => {
    return (
        <div className={twMerge(className, `bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`)}>
            <div className="flex items-center space-x-4">
                <img src={skill.icon} alt={skill.name} className="w-8 h-8"/>
                <div>
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                </div>
            </div>
            {skill.link && (
                <a href={skill.link} className="text-blue-500 hover:underline mt-2 block">
                    Learn more
                </a>
            )}
        </div>
    );
}