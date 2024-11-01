'use client';
import Image from "next/image";
import {useTranslations} from "next-intl";

let stacks = [{src: '/github.png', alt: 'Github', link: 'https://github.com/frnikho'}, {src: '/linkedin.png', alt: 'Linkedin', link: 'https://www.linkedin.com/in/nicosans/'}, {src: '/dailydev.png', alt: 'Daily Dev', link: 'https://app.daily.dev/nikho'}];

export default function MyInfoCard() {

    const t = useTranslations('Home');

    return (
        <div className={"w-full bg-card-background rounded-2xl relative flex flex-col lg:flex-row gap-2"}>
            <div className={"lg:w-9/12 p-8 flex flex-col justify-between"}>
                <div>
                    <p className={"text-primary-text whitespace-break-spaces"}>{t('message')}</p>
                </div>
                <div className={'flex flex-row gap-5 mt-4'}>
                    {stacks.map((s) => <a className={"self-center"} key={s.alt} target={'_blank'} href={s.link}><Image className={'items-center self-center cursor-pointer'} src={s.src} alt={s.alt} width={36} height={36}/></a>)}
                </div>
            </div>
            <div className={"lg:w-6/12 p-8"}>
                <Image className={"rounded-xl object-cover"} src={'/bg.png'} alt={''} width={600} height={0}/>
            </div>
            <div className={"absolute w-full h-full m-4 bg-gray-500 -z-10 rounded-2xl opacity-20"}></div>
        </div>
    )
}