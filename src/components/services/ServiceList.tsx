'use client';

import {useEffect, useMemo, useRef, useState} from "react";
import {MessageKeys, useTranslations} from "next-intl";

type ServiceKind = 'Application' | 'Mobile' | 'Salesforce' | 'DevOps';

const animations: {url: string, kind: ServiceKind, scale: string}[] = [
    {
        kind: 'Application',
        url: '/animations/lottie_web2.json',
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

const items : ServiceKind[] = ['Application', 'Mobile', 'Salesforce', 'DevOps'];

const services = (t: any) => ({
    Application: {
        title: t('application.title'),
        keys: ['application.fullstack', 'application.api', 'application.optimization', 'application.integration']
    },
    Mobile: {
        title: t('mobile.title'),
        keys: ['mobile.native', 'mobile.cross', 'mobile.optimize']
    },
    Salesforce: {
        title: t('devops.title'),
        keys: ['devops.ci', 'devops.orchestration', 'devops.observability']
    },
    DevOps: {
        title: t('salesforce.title'),
        keys: ['salesforce.integration', 'salesforce.workflow', 'salesforce.external_app', 'salesforce.custom']
    }
});

export default function ServiceList() {

    const [menu, setMenu] = useState<ServiceKind>(items[0]);
    const t = useTranslations('Services');

    const getServiceItem = useMemo(() => {
        const m = services(t)[`${menu}`];
        return m.keys.map((k) => ({
            kind: m.title,
            name: t(`${k}.title` as MessageKeys<any, any>),
            description: t(`${k}.description` as MessageKeys<any, any>)
        })) as Service[];
    }, [menu, t]);

    return (
        <div className={"flex flex-col gap-10 relative"}>
            <div
                className={"absolute -z-20 rounded-md bg-[#ececec] dark:bg-[#202020] w-32 h-32 animate-rotate-infinite lg:-mx-[15%]"}></div>
            <div
                className={"absolute -z-20 rounded-md bg-[#ececec] dark:bg-[#202020] top-12 w-16 h-16 animate-rotate-infinite-quick lg:-mx-[15%] right-0"}></div>
            <div
                className={"absolute -z-20 rounded-md bg-[#ececec] dark:bg-[#202020] top-24 w-36 h-36 animate-rotate-infinite-slow lg:-mx-[15%] right-[10%]"}></div>
            <h1 className={"text-4xl font-semibold text-primary-text dark:text-primary-text-dark"}>Services</h1>
            <ServiceMenu item={menu} onChangeAction={setMenu}/>
            <div className={"flex flex-col lg:flex-row justify-between"}>
                <ServiceCard services={getServiceItem} kind={menu}/>
            </div>
        </div>
    )
}

export function ServiceCard({services, kind}: { services: Service[], kind: string }) {
    const animationContainer = useRef(null);

    const t = useTranslations('Services');

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

export function ServiceMenu({item, onChangeAction}: { item: string, onChangeAction: (i: ServiceKind) => void }) {

    return (
        <div className={"scroll-invisible flex flex-row gap-3 lg:gap-6"}>
            {items.map((i) => <div key={i} className={"h-10 text-md lg:text-xl text-primary-text relative cursor-pointer"} onClick={() => onChangeAction(i)}>
                <p className={`text-primary-text dark:text-primary-text-dark ${item === i ? '' : 'text-[#303030] opacity-60'}`}>{i}</p>
                <p className={`${item === i ? 'border-1 border-primary-text dark:border-primary-text-dark bg-primary-text rounded-2xl mt-1' : ''} absolute w-full`}></p>
            </div>)}
        </div>
    )
}