'use client';

import {useEffect, useMemo, useRef, useState} from "react";

type ServiceKind = 'Application' | 'Mobile' | 'Salesforce' | 'DevOps';

const items = ['Application', 'Mobile', 'Salesforce', 'DevOps'];

const animations: {url: string, kind: ServiceKind, scale: string}[] = [
    {
        kind: 'Application',
        url: '/animations/lottie_application.json',
        scale: '75',
    },
    {
        kind: 'Mobile',
        url: '/animations/lottie_mobile.json',
        scale: '100',
    },
    {
        kind: 'Salesforce',
        url: '/animations/lottie_salesforce.json',
        scale: '100',
    },
    {
        kind: 'DevOps',
        url: '/animations/lottie_devops.json',
        scale: '100',
    }
];

type Service = {
    kind: ServiceKind
    name: string;
    description: string;
}

const allService: Service[] = [
    {
        kind: 'Application',
        name: 'Création d\'applications web fullstack',
        description: 'Conception d’applications web modernes et interactives, optimisées pour la performance et l’expérience utilisateur. Utilisation de Next.js, React et Tailwind CSS pour développer des solutions scalables et adaptées aux besoins spécifiques',
    },
    {
        kind: 'Application',
        name: 'Développement d’API robustes, performantes et sécurisées',
        description: 'Développement d’API en Rust ou Node.js, garantissant des performances optimales et une sécurité avancée. Des solutions conçues pour répondre à des besoins variés et assurer une communication fluide entre systèmes.'
    },
    {
        kind: 'Application',
        name: 'Optimisation et refonte de sites existants',
        description: 'Amélioration de la vitesse, de l\'accessibilité et du SEO des sites web pour offrir une expérience utilisateur enrichie. Propositions de refontes de design et de fonctionnalités pour renforcer l\'engagement des utilisateurs.'
    },
    {
        kind: 'Application',
        name: 'Intégration de fonctionnalités de gestion',
        description: 'Intégration d\'outils de gestion de tâches, d\'abonnements et de dépenses, adaptés aux environnements multi-utilisateurs. Ces fonctionnalités sont conçues pour faciliter la collaboration et répondre aux besoins de diverses équipes et utilisateurs.'
    },
    {
        kind: 'Mobile',
        name: 'Développement native Android',
        description: 'Création d’applications Android natives, optimisées pour des performances élevées et une intégration complète des fonctionnalités spécifiques à la plateforme. Conception sur mesure pour offrir une expérience utilisateur fluide et responsive',
    },
    {
        kind: 'Mobile',
        name: 'Développement cross-platform Android et IOS',
        description: 'Développement d’applications mobiles multi-plateformes avec React Native, permettant de cibler à la fois Android et iOS. Optimisation des fonctionnalités pour garantir une expérience cohérente et performante sur les deux plateformes.',
    },
    {
        kind: 'DevOps',
        name: 'Mise en place et configuration intégration continue',
        description: 'Configuration de pipelines d’intégration continue (CI) pour automatiser les tests, les builds et les déploiements. Amélioration de la productivité et de la qualité du code avec des processus de développement optimisés et fiables.',
    },
    {
        kind: 'Mobile',
        name: 'Déploiement et optimisation d’applications',
        description: 'Gestion complète du déploiement d’applications sur Google Play Store et Apple App Store, avec optimisation des performances et de la compatibilité. Mise en œuvre des meilleures pratiques pour un lancement fluide et une performance stable.'
    },
    {
        kind: 'DevOps',
        name: 'Containerisation et orchestration',
        description: 'Mise en place de conteneurs Docker et d’orchestration pour un déploiement flexible et sécurisé des applications. Optimisation des ressources pour une gestion efficace des environnements de développement et de production.'
    },
    {
        kind: 'DevOps',
        name: 'Surveillance de la performance',
        description: 'Implémentation de solutions de monitoring pour analyser les performances des applications et serveurs en temps réel. Détection proactive des problèmes et optimisation des performances pour une disponibilité et une réactivité maximales.'
    },
    {
        kind: 'Salesforce',
        name: 'Développement de solutions et d\'intégrations',
        description: 'Conception et développement de solutions sur mesure pour Salesforce, adaptées aux besoins spécifiques de chaque entreprise. Intégration fluide avec les processus internes pour améliorer l’efficacité et la gestion des données.',
    },
    {
        kind: 'Salesforce',
        name: 'Automatisation des workflows, gestion des processus d\'entreprise',
        description: 'Mise en place de workflows automatisés et d’outils de gestion de processus dans Salesforce, permettant d’optimiser les opérations et de renforcer la productivité. Automatisation des tâches répétitives pour une meilleure allocation des ressources.'
    },
    {
        kind: 'Salesforce',
        name: 'Intégration de Salesforce avec d\'autres systèmes et applications',
        description: 'Intégration de Salesforce avec des systèmes et applications externes pour créer un écosystème unifié. Synchronisation des données et automatisation des flux entre plateformes pour une expérience utilisateur sans interruption.'
    },
    {
        kind: 'Salesforce',
        name: 'Développement d’applications personnalisées dans Salesforce',
        description: 'Développement d’applications personnalisées au sein de Salesforce pour répondre aux besoins spécifiques des utilisateurs. Création d\'outils sur mesure pour enrichir l\'expérience client et optimiser les processus métier.'
    }
];

export default function ServiceList() {

    const [menu, setMenu] = useState(items[0]);

    const getServiceItem = useMemo(() => {
        return allService.filter((s) => menu === s.kind)!;
    }, [menu]);

    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text dark:text-primary-text-dark"}>Services</h1>
            <ServiceMenu item={menu} onChange={setMenu}/>
            <div className={"flex flex-col lg:flex-row justify-between"}>
                <ServiceCard services={getServiceItem} kind={menu}/>
            </div>
        </div>
    )
}

export function ServiceCard({services, kind}: {services: Service[], kind: string}) {
    const animationContainer = useRef(null);

    useEffect(() => {
        if (!animationContainer)
            return;
        const animation = animations.find((a) => a.kind === kind)!;
        initAnimation(animation.url);
    }, [services]);

    const getAnimationsScale = useMemo(() => {
        const animation = animations.find((a) => a.kind === kind)!;
        return animation.scale;
    }, [services]);

    const initAnimation = async (animationUrl: string) => {
        
        const lot = await import("lottie-web/build/player/lottie_light");
        lot.default.destroy();
        lot.default.loadAnimation({
            container: animationContainer.current!,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationUrl,
        });
    }

    const deleteAnimation = async () => {
        const lot = await import("lottie-web/build/player/lottie_light");
        return lot.default.destroy();
    }

    return (
        <>
            <div className={"w-12/12 lg:w-7/12 rounded-2xl"}>
                {services.map((service, index) => {
                    return (
                        <div className={"flex flex-col"} key={service.name}>
                            <h3 className={"text-primary-text dark:text-primary-text-dark text-lg font-medium"}>{service.name}</h3>
                            <p className={"text-primary-text dark:text-primary-text-dark text-sm"}>{service.description}</p>
                            {index + 1 !== services.length ? <div className={"border-1 dark:border-gray-700 my-6 -mx-2"}></div> : null}
                        </div>
                    )
                })}
            </div>
            <div className={`w-12/12 lg:w-6/12 -z-10`}>
                <div className={`px-8 lg:scale-${getAnimationsScale}`} ref={animationContainer}></div>
            </div>
        </>
    )
}

export function ServiceMenu({item, onChange}: { item: string, onChange: (i: string) => void }) {

    return (
        <div className={"scroll-invisible flex flex-row gap-3 lg:gap-6"}>
            {items.map((i) => <div key={i} className={"h-10 text-md lg:text-xl text-primary-text relative cursor-pointer"} onClick={() => onChange(i)}>
                <p className={`text-primary-text dark:text-primary-text-dark ${item === i ? '' : 'text-[#303030] opacity-60'}`}>{i}</p>
                <p className={`${item === i ? 'border-1 border-primary-text dark:border-primary-text-dark bg-primary-text rounded-2xl mt-1' : ''} absolute w-full`}></p>
            </div>)}
        </div>
    )
}