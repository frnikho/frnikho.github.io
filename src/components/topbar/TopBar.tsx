'use client';

import useDarkMode from "@/hooks/useDarkMode";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useCookies} from "next-client-cookies";
import {Moon, Sun} from "@/components/Icon";
import {useAptabase} from "@aptabase/react";
import Image from "next/image";

let stacks = (darkMode: boolean) => [{src: darkMode ? '/github-mark-white.svg' : '/github-mark.svg', alt: 'Github', link: 'https://github.com/frnikho'}, {src: '/linkedin.png', alt: 'Linkedin', link: 'https://www.linkedin.com/in/nicosans/'}, {src: '/malt.png', alt: 'Malt', link: 'https://www.malt.fr/profile/nicolassans'}];

export default function TopBar() {
    const {toggle, load} = useDarkMode();
    const [isDarkMode, setDarkMode] = useState(false);
    const local = useLocale();
    const { trackEvent } = useAptabase();
    const t= useTranslations('TopBar');

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

    const moveTo = (id: string) => {
        document.querySelector(`#${id}`)?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div className={"flex flex-row w-full justify-between h-16 lg:my-2"}>
            {/* <div className={"hidden lg:flex flex-row items-center gap-12"}>
                <p onClick={() => moveTo('home')}
                   className={"w-28 rounded-lg text-center font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('home')}</p>
                <p onClick={() => moveTo('project')}
                   className={"w-28 font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('projects')}</p>
                <p onClick={() => moveTo('service')}
                   className={"w-28 font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('services')}</p>
                <p onClick={() => moveTo('contact')}
                   className={"w-28 font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('contact')}</p>
            </div> */}
            <div className={"flex flex-row items-center gap-10 lg:gap-20 ml-auto"}>
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