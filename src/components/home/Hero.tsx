'use client';

import Image from "next/image";

export default function Hero() {
    return (
        <div className={"flex flex-col gap-10"}>
            <div className={"flex flex-col lg:flex-row w-full group"}>
                <div className={"w-2/12 relative"}>
                    <Image className={"rounded-2xl object-cover"} src={'/pp.jpg'} alt={'Nicolas SANS'} width={1000} height={1000}/>
                    <p className={"absolute right-0 bottom-0 -m-2 bg-green-pastel rounded-full h-5 w-5"}>
                    </p>
                </div>
                <div className={"w-7/12 items-center flex justify-center scale-75 lg:scale-100"}>
                    <h1 className={"text-5xl font-semibold uppercase text-primary-text"}>Développeur</h1>
                    <div className={"relative flex ml-10"}>
                        <p className={"absolute bg-white bottom-0 top-0 m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text "}>Fullstack</p>
                        <p className={"absolute bg-blue-pastel bottom-0 top-4 left-3 group-hover:top-24 group-hover:left-6 transition-all m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text duration-150"}>Salesforce</p>
                        <p className={"absolute bg-red-pastel bottom-0 top-8 left-6 group-hover:top-48 group-hover:left-12 m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text transition-all duration-200"}>Mobile</p>
                        <p className={"absolute bg-green-pastel bottom-0 top-12 left-9 group-hover:top-72 group-hover:left-20 m-auto self-center py-1.5 w-60 text-center rounded-full text-2xl font-bold text-primary-text transition-all duration-250"}>DevOps</p>
                    </div>
                </div>
            </div>
            <div className={"w-2/12 flex flex-row items-center justify-center"}>
                <p className={"font-medium text-2xl text-primary-text"}>SANS Nicolas</p>
            </div>
        </div>
    )
}

