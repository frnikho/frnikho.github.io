'use client';
import Image from "next/image";
import {useTranslations} from "next-intl";

export default function MyInfoCard() {

    const t = useTranslations('Home');

    return (
        <div className={"w-full bg-card-background dark:bg-dark-card-background rounded-2xl relative flex flex-col lg:flex-row gap-2 shadow-lg"}>
            <div className={"lg:w-9/12 p-8 flex flex-col justify-between gap-6"}>
                <div className={"flex flex-col gap-4"}>
                    <p className={"text-primary-text text-sm dark:text-primary-text-dark whitespace-break-spaces 2xl:text-base"}>{t('message')}</p>
                </div>
            </div>
            <div className={"lg:w-3/12 w-7/12 m-auto p-8"}>
                <Image className={"rounded-xl object-cover"} src={'/cover.svg'} alt={''} width={1000} quality={100} height={100}/>
            </div>
        </div>
    )
}