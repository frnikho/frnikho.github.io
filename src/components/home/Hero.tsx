'use client';

import Image from "next/image";

export default function Hero() {
    return (
        <div className={"flex flex-col gap-12"}>
            <div className={"flex flex-row w-full group"}>
                <div className={"w-2/12 relative"}>
                    <Image className={"rounded-2xl"} src={'/pp.jpg'} alt={'Nicolas SANS'} width={218} height={218}/>
                    <p className={"absolute right-0 bottom-0 -m-2 bg-green-pastel rounded-full h-5 w-5"}>
                    </p>
                </div>
                <div className={"w-8/12 self-center flex m-auto "}>
                    <h1 className={"text-5xl font-semibold uppercase text-primary-text"}>Développeur</h1>
                    <div className={"relative flex ml-10"}>
                        <p className={"absolute bg-white bottom-0 top-0 m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text"}>Fullstack</p>
                        <p className={"absolute bg-blue-pastel bottom-0 top-4 left-3 group-hover:top-24 group-hover:left-6 transition-all m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text"}>Salesforce</p>
                        <p className={"absolute bg-red-pastel bottom-0 top-8 left-6 group-hover:top-48 group-hover:left-12 m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text transition-all"}>Mobile</p>
                        <p className={"absolute bg-green-pastel bottom-0 top-12 left-9 group-hover:top-72 group-hover:left-20 m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text transition-all"}>DevOps</p>
                    </div>
                </div>
            </div>
            <div className={"w-2/12 flex flex-row items-center justify-center gap-6"}>
                <Image src={'/github.png'} alt={'Github'} width={30} height={30}/>
                <Image src={'/linkedin.png'} alt={'Linkedin'} width={30} height={30}/>
                <Image src={'/dailydev.png'} alt={'Daily.dev'} width={30} height={30}/>
            </div>
        </div>
    )
}

