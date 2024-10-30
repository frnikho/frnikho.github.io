'use client';

import useDarkMode from "@/hooks/useDarkMode";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useCookies} from "next-client-cookies";
import {Moon, Sun} from "@/components/Icon";

export default function TopBar() {
    const {toggle, load} = useDarkMode();
    const [isDarkMode, setDarkMode] = useState(false);
    const local = useLocale();
    const t = useTranslations('TopBar');
    const cookies = useCookies();
    const router = useRouter();

    useEffect(() => {
        if (load() === 'dark') {
            setDarkMode(true);
        }
    }, [])

    const changeLanguage = () => {
        cookies.set('language', cookies.get('language') === 'en' ? 'fr' : 'en');
        router.refresh();
    }

    const changeTheme = () => {
        toggle();
        setDarkMode(!isDarkMode)
    }

    const moveTo= (top: number) => {
        window.scroll({
            top,
            behavior: 'smooth'
        });
    }

    return (
        <div className={"flex flex-row w-full justify-between h-16"}>
            <div className={"flex flex-row items-center gap-20"}>
                <p onClick={() => moveTo(0)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('home')}</p>
                <p onClick={() => moveTo(900)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('projects')}</p>
                <p onClick={() => moveTo(2200)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('services')}</p>
                <p onClick={() => moveTo(2200)} className={"font-medium text-lg uppercase text-primary-text dark:text-primary-text-dark cursor-pointer"}>{t('contact')}</p>
            </div>
            <div className={"flex flex-row-reverse items-center gap-16"}>
                <button>Un projet ?</button>
                <div className={"flex flex-row gap-4"}>
                    <div className={"cursor-pointer"} onClick={changeLanguage}>
                        {local === 'en' ? <p>EN</p> : null}
                        {local === 'fr' ? <p>FR</p> : null}
                    </div>
                    <div className={"cursor-pointer"} onClick={changeTheme}>
                        {isDarkMode ? <Sun/> : <Moon/>}
                    </div>
                </div>
            </div>
        </div>
    )
}