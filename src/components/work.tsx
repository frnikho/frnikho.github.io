import {Container, Heading, Text, Title} from "@/components/lib/title";
import { motion, useScroll } from "motion/react"

type Work = {
    title: string;
    description: string;
    company: string;
    date: string;
    variant: 'blue' | 'yellow' | 'green' | 'red' | 'purple';
    logo: string;
    features?: string[];
    techo?: string[];
    icons?: string[];
}

const works: Work[] = [
    {
        title: 'Consultant Développeur Salesforce',
        company: 'Capgemini, NANTES',
        date: 'Avril 2022 - Aujourd’hui',
        description: 'J\'interviens auprès des client sur la conception, l’évolution et la maintenance d’applications métiers critiques, avec une forte dimension d’automatisation et d’intégration inter-systèmes.',
        features: [
            'Réalisation d’estimations de charges et de chiffrages.',
            'Recueil, analyse des besoins clients et métiers.',
            'Participation aux phases d’avant-vente et préparation de support pour les démonstrations.',
            'Planification et suivi des évolutions applicatives dans le temps.',
            'Conception de maquettes, prototypes et supports de présentation.',
            'Participation à l’amélioration de la qualité logicielle via CI/CD, code review et automatisation deworkflow.',
            'Intégration d’API externes et de services tiers.',
            'Rédaction et maintien de la documentation technique.',
            'Mise en place et réalisation de TU avec une couverture importante.',
            'Exécution de tests fonctionnels sur des environnements de préproduction.',
            'Contribution aux pratiques Agile/Scrum au sein des équipes.',
            'Collaboration régulière avec des équipes et partenaires externes.',
            'Support technique et backup des collègues sur leurs projets en cours.',
        ],
        techo: ['Salesforce (Apex, LWC, Visualforce, Flow, Process Builder, Community)', 'REST & SOAP'],
        variant: 'purple',
        logo: '/icons/cap.png',
    },
    {
        title: 'Développeur Fullstack et DevOps',
        company: 'Freelance',
        logo: '/icons/malt.svg',
        date: 'Septembre 2021 - Juin 2025',
        description: 'Accompagnement de plusieurs clients sur des projets web et mobile, de la conception à la mise en production. J’ai participé à la création et à la maintenance d’applications complètes, tout en assurant l’architecture, le développement fullstack et la mise en place des bonnes pratiques.',
        features: [
            'Conception et développement d’applications web & mobile complètes',
            'Architecture logicielle (DDD, SOLID) et design system',
            'Développement fullstack (React, Next.js, NestJS, ElysiaJS, TypeScript, Node)',
            'Bases de données : PostgreSQL, Prisma, Drizzle (schéma, migrations, optimisation)',
            'Mise en place d’APIs REST documentées (OpenAPI/Swagger)',
            'Intégration de services tiers (paiement Stripe, API externes, CRM)',
            'Implémentation sécurité (RBAC, conformité RGPD)',
            'Mise en place de CI/CD (GitHub Actions, Docker, Kubernetes, Terraform)',
            'Observabilité et monitoring (Grafana, Loki, Tempo, logs, métriques)',
            'Démonstrations clients et recueil des retours utilisateurs',
            'Gestion d’équipe en tant que Team Lead (coordination, code review, mentoring)',
            'Suivi en production, correction d’incidents, amélioration continue',
            'Développement de tests unitaires & end-to-end (E2E)',
        ],
        techo: ['React', 'NextJS', 'TanStack suites', 'NestJS', 'ElysiaJS', 'TypeScript', 'Bun/Node', 'PostgreSQL', 'Prisma/Drizzle', 'Redis/Valkey', 'Kafka', 'Docker', 'Kubernetes', 'Grafana', 'Stripe', 'Terraform', 'GitHub Actions', 'Jest'],
        variant: 'blue',
    },
    {
        title: 'Étudiant à Epitech Nantes',
        company: 'Epitech, NANTES',
        date: 'Septembre 2019 - Juillet 2024',
        description: 'Formation en informatique orientée projets, autonomie et expertise technique, axée sur le développement logiciel, l’architecture système et les méthodes agiles. Obtention du titre RNCP35075 ',
        techo: ['C', 'C++', 'JS/TS', 'Docker', 'K8S', 'React', 'Tanstack/NextJS', 'PlatformIO', 'Linux', 'Git'],
        variant: 'red',
        logo: '/icons/epitech.png',
    },
    {
        title: 'Administrateur réseau et systèmes',
        company: 'O.G.E.C Saint Aubin La Salle',
        description: 'J’ai assuré la gestion et la maintenance des infrastructures informatiques d’un établissement campus scolaire, avec un rôle polyvalent mêlant support utilisateurs, administration réseau et gestion des systèmes. Mon travail a consisté à diagnostiquer les incidents, maintenir la sécurité du parc, gérer les comptes utilisateurs, et accompagner le personnel dans l’usage des outils numériques.',
        techo: ['Active Directory', 'Windows Server', 'Linux', 'Cisco', 'Proxmox', 'VMware'],
        date: 'Août 2020 - Janvier 2021',
        variant: 'yellow',
        logo: '/icons/lasalle.png'
    },
    {
        title: 'Technicien informatique',
        company: 'Camara Education Ltd',
        date: 'Avril 2018 - Mai 2018',
        description: 'Mission technique au sein d’une organisation à but non lucratif spécialisée dans le reconditionnement et la distribution d’équipements informatiques à des établissements scolaires dans des pays en développement. J’ai participé à l’installation, la configuration et à la remise en état de postes informatiques destinés à être expédiés vers des écoles partenaires.',
        techo: ['Montage PC', 'Installation OS', 'Configuration Réseau', 'Diagnostic Matériel'],
        variant: 'green',
        logo: '/icons/camara.png'
    }
]

export default function Work() {
    return (
        <div className={"bg-[#F8F7F1] flex flex-col py-18 lg:py-28 gap-20 work"}>
            <div className={"flex flex-row w-full"}>
                <Title className={"m-auto"}>Expérience</Title>
            </div>

            <Container className={"flex flex-col mx-auto"}>
                {works.map((work) => <WorkItem key={work.title} work={work}/>)}
            </Container>

        </div>
    )
}

function WorkItem({work}: { work: Work }) {

    const color = () => {
        if (work.variant === 'blue') {
            return 'bg-[#387369]';
        }
        if (work.variant === 'yellow') {
            return 'bg-[#EBC34C]';
        }
        if (work.variant === 'green') {
            return 'bg-[#2A6C72]';
        }
        if (work.variant === 'red') {
            return 'bg-[#EE6244]'
        }
        if (work.variant === 'purple') {
            return 'bg-[#A45DBF]';
        }
    }

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }


    return (
        <motion.div initial={{ opacity: 0, translateX: 5 }} whileInView={{ opacity: 1, translateX: 0 }} viewport={{ amount: 0.5, once: true }} className={"w-full project-card"}>
            <div className={"flex flex-row justify-between align-middle lg:gap-12 gap-6 transition-all group"}>
                <div className={"flex-4/12 flex-row gap-4 items-start not-lg:hidden lg:flex"}>
                    <img className={"mt-2.5"} src={work.logo} alt={work.title} width={28} height={38}/>
                    <div className={"flex flex-col gap-0"}>
                        <Heading>{work.company}</Heading>
                        <Text className={"not-lg:text-xs lg:text-md uppercase"}>{work.date}</Text>
                    </div>
                </div>
                <div className={"z-10 relative transition-all duration-300 ease-in-out"}>
                    <div className={"bg-[#F8F7F1] h-12 w-12 border-[#CCC] border-[2px] border-dashed rounded-full"}>
                        <div className={`before:absolute before:top-40px before:border-l-[2px] before:border-dashed before:border-l-[#CCC] before:content-[''] before:w-[2px] before:h-full before:-translate-x-1/2 before:left-1/2 before:-z-10`}>
                            <div className={`h-12 w-12 rounded-full -translate-x-0.5 -translate-y-0.5`}>
                                <div className={`${color()} group-hover:w-7 group-hover:h-7 group-hover:mt-2.5 w-5 h-5 m-auto mt-3.5 rounded-full transition-all`}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex-7/12 flex flex-col gap-4 pb-16"}>
                    <Heading className={'lg:flex not-lg:hidden'}>{work.title}</Heading>
                    <div className={"lg:hidden not-lg:flex flex-row gap-2 items-center"}>
                        <img src={work.logo} alt={work.title} width={28} height={38}/>
                        <Heading>{work.company} - {work.title}</Heading>
                    </div>
                    <Text className={"not-lg:flex lg:hidden not-lg:text-xs lg:text-md uppercase font-bold"}>{work.date}</Text>
                    <Text className={"not-lg:text-xs lg:text-md"}>{work.description}</Text>
                    <div>
                        {work.features?.map((feature, i) => (
                            <Text className={'not-lg:text-xs lg:text-md'} key={generateKey(i)}>- {feature}</Text>
                        ))}
                    </div>
                    <Text className={"not-lg:text-xs lg:text-sm italic text-gray-600"}>{work.techo?.join(', ')}</Text>
                </div>
            </div>
        </motion.div>
    )
}