'use client';

import Project from "@/components/projets/Project";
import {useState} from "react";
import {useTranslations} from "next-intl";

const allFilters = ['All', 'Salesforce', 'Web', 'Rust'];


export default function ProjectList() {

    const t = useTranslations('Projects');

    const [filter, setFilter] = useState(allFilters[0]);

    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text"}>{t('title')}</h1>
            <div className={"flex flex-col gap-6"}>
                <FilterBar onChangeFilter={setFilter}/>
                <div className={"flex flex-col"}>
                    <div className={"grid grid-cols-2 gap-8"}>
                        <Project/>
                        <Project/>
                        <Project/>
                        <Project/>
                    </div>
                    <div className={"self-center"}>
                       <button className={'m-4'}>{t('see-all')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function FilterBar({onChangeFilter}: {onChangeFilter: (filter: string) => void}) {

    const [selected, setSelected] = useState(0);

    const onChange = (i: number) => {
        setSelected(i);
        onChangeFilter(allFilters[i]);
    }

    return (
        <div className={"flex flex-row gap-4"}>
            {allFilters.map((f, i) => <div key={f + i} className={`${i === selected ? 'bg-red-pastel text-white border-black border-opacity-15' : 'border-primary-text border-opacity-15 text-primary-text'} px-4 lg:px-10 py-0.5 lg:py-1.5 rounded-full border-1 cursor-pointer transition-all`} onClick={() => onChange(i)}>
                <p className={"text-md"}>{f}</p>
            </div>)}
        </div>
    )
}