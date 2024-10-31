'use client';

import Image from "next/image";
import {useTranslations} from "next-intl";

export default function Hero() {

    const t = useTranslations('Home');

    return (
        <div className={"flex flex-col gap-10"}>
            <div className={"flex flex-col lg:flex-row w-full group items-center gap-8 lg:gap-0"}>
                <div className={"w-5/12 lg:w-2/12 items-center flex flex-col gap-6"}>
                    <div className={"w-full relative"}>
                        <Image className={"rounded-2xl object-cover relative"} src={'/pp.jpg'} alt={'Nicolas SANS'}
                               width={1000}
                               height={1000}></Image>
                        <p className={"absolute right-0 bottom-0 -m-2 bg-green-pastel rounded-full h-5 w-5"}></p>
                    </div>
                    <p className={"text-nowrap font-medium text-2xl text-primary-text"}>SANS Nicolas</p>
                </div>
                <div
                    className={"w-7/12 items-center flex justify-center scale-60 sm:scale-75 lg:scale-100 -translate-x-16 lg:-translate-x-0"}>
                    <h1 className={"text-4xl lg:text-5xl font-semibold uppercase text-primary-text"}>{t('developer')}</h1>
                    <div className={"relative flex ml-4 lg:ml-10"}>
                        <p className={"absolute bg-white bottom-0 top-0 m-auto self-center py-1.5 w-52 lg:w-60 text-center rounded-full text-2xl font-bold text-primary-text "}>Fullstack</p>
                        <p className={"absolute bg-blue-pastel bottom-0 top-4 left-3 group-hover:top-24 group-hover:left-6 transition-all m-auto self-center py-1.5 w-52 lg:w-60 text-center rounded-full text-2xl font-bold text-primary-text duration-150"}>Salesforce</p>
                        <p className={"absolute bg-red-pastel bottom-0 top-8 left-6 group-hover:top-48 group-hover:left-12 m-auto self-center py-1.5 w-52 lg:w-60 text-center rounded-full text-2xl font-bold text-primary-text transition-all duration-200"}>Mobile</p>
                        <p className={"absolute bg-green-pastel bottom-0 top-12 left-9 group-hover:top-72 group-hover:left-20 m-auto self-center py-1.5 w-52 lg:w-60 text-center rounded-full text-2xl font-bold text-primary-text transition-all duration-250"}>DevOps</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

