'use client';
import Image from "next/image";

import {useTranslations} from "next-intl";

export default function ContactCard() {

    const t = useTranslations('Contact');

    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text rounded-3xl"}>{t('title')}</h1>
            <div className={"flex flex-row bg-card-background p-6 rounded-2xl gap-8"}>
                <div className={"w-full lg:w-8/12 flex flex-col gap-2"}>
                    <h2 className={"text-2xl font-semibold text-primary-text"}>{t('subtitle')}</h2>
                    <p className={"text-primary-text"}>{t('message')}</p>
                    <div className={"mt-6 grid grid-cols-2 gap-3"}>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-50 outline-none"} type={'text'}
                               placeholder={t('form.lastname')}/>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-70"} type={'text'}
                               placeholder={t('form.firstname')}/>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-70 col-span-2"} type={'email'}
                               placeholder={t('form.email')}/>
                        <input className={"w-full p-3 rounded-xl bg-input focus:opacity-70 col-span-2"} type={'text'}
                               placeholder={t('form.company')}/>
                        <textarea required className={"resize-none w-full p-3 rounded-xl bg-input focus:opacity-70 col-span-2"}
                                  rows={5} placeholder={t('form.message')}/>
                    </div>
                    <button className={"p-4 text-primary-text rounded-xl bg-red-pastel"}>{t('send-btn')}</button>
                </div>
                <div className={"lg:w-4/12 hidden lg:flex flex-col relative overflow-hidden rounded-2xl"}>
                    <Image className={"rounded-2xl object-cover hover:scale-125 hover:blur-md transition-all"}
                           src={'/coffee-and-laptop.jpg'}
                           alt={''} width={1080} height={0} quality={100} style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
        </div>
    )
}