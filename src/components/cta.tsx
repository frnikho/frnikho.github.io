// projets à fort impact (350k utilisateurs)

import {ReactNode} from "react";

export default function CTA() {
    return (
        <div className={"flex flex-row 3xl:w-8/12 w-10/12 m-auto relative py-32"}>
            <div className={"flex flex-col gap-4 flex-1/2"}>
                <div className={"flex flex-col gap-8 w-10/12"}>
                    <CtaItem title={'Dévelopement web'} description={'Création d\'applications web fullstack'} icon={"/react.png"} variant={'yellow'}/>
                    <CtaItem title={'Développement mobile'} description={''} icon={"/c++.png"} variant={'purple'}/>
                    <CtaItem title={'DevOps'} description={''} icon={"/k8s.svg"} variant={'green'}/>
                    <CtaItem title={'Salesforce'} description={'Création et intégration de solutions au CRM Salesforce'} icon={"/salesforce.png"} variant={'blue'}/>
                </div>
            </div>
            <div className={"flex flex-col flex-1/2 gap-16"}>
                <h1 className={"text-[3em]"}>What do I help ?</h1>
                <p className={"tracking-wide text-lg leading-loose font-montserrat font-medium"}>Mollit duo congue ullamco enim sadipscing doming luptatum sunt nostrud duis aute, ullamco eros sunt duo nostrud excepteur invidunt ut magna ut incidunt commodi clita sed. Proident aliquip enim dolor ea nonummy te suscipit at. Est tincidunt duis. Nisi nam amet.</p>
                <p className={"tracking-wide text-lg leading-loose font-montserrat font-medium"}>Aujourd'hui, j'accompagne mes clients en tant que consultant développeur Fullstack, en les aidant à mettre en place leurs architectures techniques et à développer leurs solutions sur des technologies JS et Salesforce.</p>
                <div className={"flex flex-row gap-20"}>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-5xl font-bold font-montserrat text-primary"}>285+</p>
                        <p>Projet completed</p>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-5xl font-bold font-montserrat text-primary"}>190+</p>
                        <p>Happy Clients</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

type Props = {
    title: string;
    description: string;
    icon: string;
    variant: 'blue' | 'yellow' | 'green' | 'orange' | 'purple';
}

function CtaItem(props: Props) {

    const color = () => {
        switch (props.variant) {
            case 'blue':
                return 'bg-[#E0F2FE]';
            case 'yellow':
                return 'bg-[#FEF3C7]';
            case 'green':
                return 'bg-[#DCFCE7]';
            case 'orange':
                return 'bg-[#FFF7ED]';
            case 'purple':
                return 'bg-[#F3E8FF]';
            default:
                return 'bg-[#F3F4F6]'; // Default color
        }
    }

    return (
        <div className={"px-6 py-6 bg-[#FFFFFF] group shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-95 rounded-2xl transition-all cursor-pointer"}>
            <div className={"flex flex-row gap-8 items-center"}>
                <div className={`${color()} p-8 rounded-3xl`}>
                    <img src={props.icon} alt={props.title} width={40} height={40}/>
                </div>
                <div>
                    <h1 className={"text-primary text-[1.5em] 3xl:text-[1.7em] font-montserrat"}>{props.title}</h1>
                    <p className={"text-primary text-md whitespace-pre-wrap font-nunito font-medium"}>{props.description}</p>
                </div>
            </div>
            <div className={"w-full flex flex-row justify-center"}>
                <svg className="group-hover:-translate-y-1 transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </div>
        </div>
    )
}