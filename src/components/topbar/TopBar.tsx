'use client';

import useDarkMode from "@/hooks/useDarkMode";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useCookies} from "next-client-cookies";
import {Moon, Sun} from "@/components/Icon";
import {useAptabase} from "@aptabase/react";

export default function TopBar() {
    const {toggle, load} = useDarkMode();
    const [isDarkMode, setDarkMode] = useState(false);
    const local = useLocale();
    const t = useTranslations('TopBar');
    const { trackEvent } = useAptabase();

    const cookies = useCookies();
    const router = useRouter();

    useEffect(() => {
        if (load() === 'dark') {
            setDarkMode(true);
        }
        trackEvent('page_view', {dark_mode: isDarkMode});
    }, [])

    const changeLanguage = () => {
        cookies.set('language', cookies.get('language') === 'en' ? 'fr' : 'en');
        router.refresh();
    }

    const changeTheme = () => {
        toggle();
        setDarkMode(!isDarkMode)
    }

    const moveTo= (name: string, top: number) => {
        trackEvent('click', {target: name});
        window.scroll({
            top,
            behavior: 'smooth'
        });
    }

    return (
        <div className={"flex flex-row w-full justify-between h-16"}>
            <div className={"hidden lg:flex flex-row items-center gap-20"}>
                <p onClick={() => moveTo('home', 0)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('home')}</p>
                <p onClick={() => moveTo('project', 900)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('projects')}</p>
                <p onClick={() => moveTo('service', 2200)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('services')}</p>
                <p onClick={() => moveTo('contact', 2200)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('contact')}</p>
            </div>
            <div className={"flex flex-row-reverse items-center gap-6 lg:gap-16 ml-auto"}>
                {/*<button className={"bg-blue-pastel px-3 py-1 lg:px-4 lg:py-1.5 relative rounded-xl"}>*/}
                {/*    <div className={"rounded-xl absolute bg-darkblue-pastel h-full w-full -z-10 -mx-2"}></div>*/}
                {/*    <p className={"uppercase font-semibold text-primary-text text-sm lg:text-md"}>{t('project-btn')}</p>*/}
                {/*</button>*/}
                <div className={"flex flex-row gap-4 items-center justify-center"}>
                    <div className={"cursor-pointer"} onClick={changeTheme}>
                        {isDarkMode ? <Sun/> : <Moon/>}
                    </div>
                    <div className={"cursor-pointer"} onClick={changeLanguage}>
                        {local === 'en' ? <p className={"text-primary-text dark:text-primary-text-dark"}>EN</p> : null}
                        {local === 'fr' ? <p className={"text-primary-text dark:text-primary-text-dark"}>FR</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}