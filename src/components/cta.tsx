// projets à fort impact (350k utilisateurs)

import {useState} from "react";
import {Button, Container, Heading, Text, Title} from "@/components/lib/title";

type Service = {
    title: string;
    icon: string;
    variant: 'blue' | 'yellow' | 'green' | 'orange' | 'purple';
    services: {
        title: string;
        description: string;
    }[];
}

const services: Service[] = [
    {
        title: 'Développement Web & Applications',
        icon: '/icons/computer.png',
        variant: 'yellow',
        services: [
            {
                title: 'Applications',
                description: 'Développement d’interfaces interactives avec React, Next.js et Tailwind. Conception d’architectures modulaires, scalables, orientées clean code et DDD.'
            },
            {
                title: 'APIs performantes & sécurisées',
                description: 'Conception d’APIs en Node.js ou Rust, pensées pour la scalabilité, la sécurité et l’intégration multi-systèmes'
            },
            {
                title: 'Refonte & optimisation',
                description: 'Amélioration de sites existants : performance, SEO, accessibilité, expérience utilisateur.'
            },
            {
                title: 'Fonctionnalités métiers',
                description: 'Intégration de modules spécifiques : gestion de tâches, abonnements, budgets, multi-comptes, etc.'
            }
        ]
    },
    {
        title: 'Développement Mobile',
        icon: '/icons/smartphones.png',
        variant: 'purple',
        services: [
            {
                title: 'Android natif',
                description: 'Applications optimisées avec une intégration complète aux spécificités Android.',
            },
            {
                title: 'Cross-platform (iOS + Android)',
                description: 'Développement d’applications React Native pour une expérience fluide sur les deux OS.',
            },
            {
                title: 'Publication & performance',
                description: 'Déploiement sur les stores (Google Play / App Store), optimisations de compatibilité et stabilité.',
            },
        ]
    },
    {
        title: 'DevOps & Infrastructure',
        icon: '/icons/continous.png',
        variant: 'green',
        services: [
            {
                title: 'CI/CD & automatisation',
                description: 'Jenkins, GitLab CI/CD, GitHub Actions : automatisation du build, des tests, des déploiements continus, avec rollback et monitoring.'
            },
            {
                title: 'Containerisation & orchestration',
                description: 'Docker, Kubernetes : packaging des apps, orchestration multi‑services, gestion d’état et montée en charge'
            },
            {
                title: 'Monitoring & Observabilité',
                description: 'Prometheus, Grafana, ELK Stack, cloud-monitoring : amélioration proactivité et fiabilité des systèmes'
            },
            {
                title: 'Cloud & déploiements',
                description: 'AWS, Azure, GCP et IaC : déploiement et gestion d’infrastructure dans le cloud public/privé'
            }
        ]
    },
    {
        title: 'IoT & Système embarqué',
        icon: '/icons/iot.png',
        variant: 'orange',
        services: [
            {
                title: 'Prototypage & développement',
                description: 'Conception et développement de systèmes embarqués avec Arduino, Raspberry Pi, ESP32, etc.'
            },
            {
                title: 'Connectivité & protocoles',
                description: 'Intégration de capteurs, actionneurs, communication sans fil (WiFi, Bluetooth, Zigbee).'
            },
            {
                title: 'Applications IoT',
                description: 'Développement d’applications pour la collecte, le traitement et la visualisation des données IoT.'
            },
            {
                title: 'Sécurité & maintenance',
                description: 'Mise en place de mesures de sécurité pour les dispositifs IoT et gestion des mises à jour à distance (OTA).'
            }
        ]
    },
    {
        title: 'Salesforce',
        icon: '/salesforce.png',
        variant: 'blue',
        services: [
            {
                title: 'Développement sur mesure',
                description: 'Création d’apps internes adaptées à vos besoins spécifiques.'
            },
            {
                title: 'Automatisation des workflows',
                description: 'Mise en place de processus intelligents pour gagner du temps et fiabiliser l’exécution.'
            },
            {
                title: 'Intégrations tierces',
                description: 'Connexion de Salesforce à vos outils internes ou externes (APIs, ERP, CRM, etc.).',
            }
        ]
    }
]

export default function CTA() {
    return (
        <Container className={"flex flex-col-reverse gap-8 lg:flex-row m-auto relative py-16 lg:py-32 service"}>
            <div className={"flex flex-col gap-4 flex-1/2"}>
                <div className={"flex flex-col gap-8 lg:w-10/12"}>
                    {services.map((service: Service) => (<CtaItem key={service.title} {...service}/>))}
                </div>
            </div>
            <div className={"flex flex-col flex-1/2 gap-16"}>
                <Title>Service</Title>
                <div className={"flex flex-col gap-8"}>
                    <Text className={"tracking-wide lg:text-lg leading-loose font-montserrat font-medium"}>Aujourd’hui, j’interviens en tant que développeur fullstack, pour concevoir des architectures solides et développer des solutions web sur-mesure, performantes et évolutives.</Text>
                    <Text className={"tracking-wide lg:text-lg leading-loose font-montserrat font-medium"}>Passionné par les technologies et toujours à l’écoute, je m’adapte à chaque projet et chaque besoin métier. Mon objectif : proposer des solutions claires, efficaces et durables, tout en restant force de proposition sur l’aspect technique, produit et UX.</Text>
                    <Text className={"tracking-wide lg:text-lg leading-loose font-montserrat font-medium"}>On apprécie ma capacité à m’impliquer pleinement, à communiquer avec transparence et à livrer des résultats concrets. Chaque mission est pour moi un partenariat de confiance, où la qualité du travail et la relation humaine sont aussi importantes que la technique.</Text>
                </div>
                <div className={"flex flex-row not-lg:justify-between lg:gap-20"}>
                    <div className={"flex flex-col gap-0"}>
                        <Title>+300k</Title>
                        <p>Utilisateurs finaux sur projet</p>
                    </div>
                    <div className={"flex flex-col gap-0"}>
                        <Title>+380</Title>
                        <div className={'flex flex-row gap-2 items-center'}>
                            <p>Contribution par an</p>
                            <img className={'w-4 h-4'} src="/github-mark.svg" alt="github" title={'Contribution sur github'}/>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

type Props = Service

function CtaItem(props: Props) {

    const [collapsed, setCollapsed] = useState(false);

    const color = () => {
        switch (props.variant) {
            case 'blue':
                return 'bg-[#E0F2FE]';
            case 'yellow':
                return 'bg-[#FEF3C7]';
            case 'green':
                return 'bg-[#DCFCE7]';
            case 'orange':
                return 'bg-[#FFF7ED]';
            case 'purple':
                return 'bg-[#F3E8FF]';
            default:
                return 'bg-[#F3F4F6]'; // Default color
        }
    }

    return (
        <Button className={"active:scale-[.97] group p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all cursor-pointer"} onClick={() => setCollapsed(!collapsed)}>
            <div className={"flex flex-row lg:gap-8 items-center"}>
                <div className={`flex-3/12 lg:flex-none`}>
                    <div className={`p-4 w-fit relative z-10`}>
                        <div className={`${color()} ${collapsed ? 'rotate-45' : 'rotate-0'} rounded-3xl absolute w-full h-full -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all`}></div>
                        <img src={props.icon} alt={props.title} width={34} height={34}/>
                    </div>
                </div>
                <div className={"flex-9/12 gap-2"}>
                    <Heading className={"text-start"}>{props.title}</Heading>
                </div>
            </div>
            <div className={`flex flex-col-reverse transition-all`}>
                <div className={`w-full flex justify-center flex-row`}>
                    <svg className={`${collapsed ? 'rotate-180' : 'rotate-0'} group-hover:-translate-y-1 transition-all`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <title>down arrow</title>
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </div>
                <div className={`${collapsed ? 'h-fit' : 'h-0'} transition-all overflow-hidden mt-2`}>
                    {props.services.map((s) => <Service key={s.title} {...s} />)}
                </div>
            </div>
        </Button>
    )
}

function Service(props: {title: string, description: string}) {
    return (
        <div className={"flex flex-col gap-2 items-start p-4 text-start"}>
            <Text className={"text-md font-bold"}>{props.title}</Text>
            <Text className={"text-sm"}>{props.description}</Text>
        </div>
    )
}