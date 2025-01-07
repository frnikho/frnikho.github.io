'use client';
import Image from "next/image";
import  Magnet from '@utils/Magnet';
import {useTranslations} from "next-intl";

export default function MyInfoCard() {

    const t = useTranslations('Home');

    return (
        <div className="mt-20 grid grid-cols-11 grid-rows-5 gap-4">
            <div className="col-span-3 row-span-4 col-start-5 row-start-1">
                <Languages/>
            </div>
            <div className="col-span-1 row-span-1 col-start-11 row-start-1">
                <Malt/>
            </div>
            <div className="col-span-1 row-span-1 col-start-10 row-start-1">
                <Github/>
            </div>
            <div className="col-span-1 row-span-1 col-start-11 row-start-2">
                <Linkedin/>
            </div>
            <div className="col-span-4 row-span-2 col-start-1 row-start-1">
                <Description/>
            </div>
            <div className="col-span-2 row-span-2 col-start-8 row-start-3">
                <Contact/>
            </div>
            <div className="col-span-4 row-span-2 col-start-1 row-start-3">
                <DeveloppingYears/>
            </div>
        </div>
        // <div className={"w-full bg-card-background dark:bg-dark-card-background rounded-2xl relative flex flex-col lg:flex-row gap-2 shadow-lg"}>
        //     <div className={"lg:w-9/12 p-8 flex flex-col justify-between gap-6"}>
        //         <div className={"flex flex-col gap-4"}>
        //             <p className={"text-primary-text text-sm dark:text-primary-text-dark whitespace-break-spaces 2xl:text-base"}>{t('message')}</p>
        //         </div>
        //     </div>
        //     <div className={"lg:w-3/12 w-7/12 m-auto p-8"}>
        //         <Image className={"rounded-xl object-cover"} src={'/cover.svg'} alt={''} width={1000} quality={100} height={100}/>
        //     </div>
        // </div>
    )
}

function Contact() {
    return (
        <div>

        </div>
    )
}

function Description() {
    return (
        <div className="bg-white rounded-lg w-full h-full">

        </div>
    )
}

function Languages() {
    return (
        <div className="bg-white rounded-lg h-full w-full">
            a
        </div>
    )
}

function DeveloppingYears() {
    return (
        <div className="bg-white rounded-lg w-full h-full">
            <p>5 ans</p>
            <p>D'éxperience</p>
        </div>
    )
}

function Malt() {
    return (
        <div className="bg-[#d4524f] h-auto w-auto rounded-xl flex justify-center items-center shadow-xl">
            <Magnet padding={2} magnetStrength={2} className="p-4 cursor-pointer">
                <Image src={"/white/malt.png"} alt="Malt profile" width={720} height={720} quality={100}/>
            </Magnet>
        </div>
    )
}

function Linkedin() {
    return (
        <div className="bg-[#0a66c2] rounded-xl h-auto w-auto flex justify-center items-center shadow-xl">
            <Magnet padding={2} magnetStrength={2} className="p-4 cursor-pointer">
                <Image src={"/white/linkedin.png"} alt="Linkedin profile" width={720} height={720}/>
            </Magnet>
        </div>
    )
}

function Github() {
    return (
        <div className="bg-black rounded-lg h-auto w-auto flex justify-center items-center shadow-xl">
            <Magnet padding={2} magnetStrength={2} className="p-4 cursor-pointer">
                <Image src={"/github-mark-white.svg"} alt="Github profile" width={720} height={720}/>
            </Magnet>
        </div>
    )
}