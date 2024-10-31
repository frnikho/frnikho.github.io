'use client';
import Image from "next/image";

import {useTranslations} from "next-intl";

export default function ContactCard() {

    const t = useTranslations('Contact');

    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text rounded-3xl"}>{t('title')}</h1>
            <div className={"flex flex-row bg-card-background p-6 rounded-2xl gap-8"}>
                <div className={"flex flex-col gap-2"}>
                    <h2 className={"text-2xl font-semibold text-primary-text"}>{t('subtitle')}</h2>
                    <p className={"text-primary-text"}>{t('message')}</p>
                    <div className={"mt-6 grid grid-cols-2 gap-4"}>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-70"} type={'text'}
                               placeholder={'Nom *'}/>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-70"} type={'text'}
                               placeholder={'Prénom *'}/>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-70 col-span-2"} type={'email'}
                               placeholder={'Adresse email *'}/>
                        <input className={"w-full p-3 rounded-xl bg-input focus:opacity-70 col-span-2"} type={'text'}
                               placeholder={'Entreprise'}/>
                        <textarea required className={"resize-none w-full p-3 rounded-xl bg-input focus:opacity-70 col-span-2"}
                                  rows={5} placeholder={'Votre message *'}/>
                    </div>
                    <button className={"p-4 text-primary-text rounded-xl bg-green-pastel"}>Envoyer</button>
                </div>
                <div className={"hidden lg:flex flex-col relative"}>
                    <Image className={"rounded-2xl"} src={'/bg.png'} alt={'bg'} width={1080} height={1080}/>
                </div>
            </div>
        </div>
    )
}