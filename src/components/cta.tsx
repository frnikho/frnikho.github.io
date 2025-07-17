// projets à fort impact (350k utilisateurs)

import {ReactNode} from "react";

export default function CTA() {
    return (
        <div className={"flex flex-row 3xl:w-8/12 w-10/12 m-auto relative py-32"}>
            <div className={"flex flex-col gap-8 flex-1/2"}>
                <CtaItem title={'Fullstack'} description={'abc'} icon={''}/>
                <CtaItem title={'Mobile'} description={'abc'} icon={''}/>
                <CtaItem title={'DevOps'} description={''} icon={''}/>
                <CtaItem title={'Salesforce'} description={''} icon={''}/>
            </div>
            <div className={"flex flex-col flex-1/2 gap-16"}>
                <h1 className={"text-[3em]"}>What do I help ?</h1>
                <p className={"tracking-wide text-lg leading-loose font-montserrat font-medium"}>Mollit duo congue ullamco enim sadipscing doming luptatum sunt nostrud duis aute, ullamco eros sunt duo nostrud excepteur invidunt ut magna ut incidunt commodi clita sed. Proident aliquip enim dolor ea nonummy te suscipit at. Est tincidunt duis. Nisi nam amet.</p>
                <div className={"flex flex-row gap-20"}>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-5xl font-bold font-montserrat"}>285+</p>
                        <p>Projet completed</p>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-5xl font-bold font-montserrat"}>190+</p>
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
    icon: ReactNode;
}

function CtaItem(props: Props) {
    return (
        <div className={"flex flex-col gap-4 w-full px-4 bg-[#F8F7F1] hover:bg-[#FFFFFF] hover:rounded-full transition-all hover:shadow-xs"}>
            <div>
                <h1 className={"text-[2em] 3xl:text-[2.5em]"}>{props.title}</h1>
                <h3 className={"text-lg uppercase"}>{props.description}</h3>
            </div>
        </div>
    )
}