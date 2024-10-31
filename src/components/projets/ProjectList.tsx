'use client';

import Project from "@/components/projets/Project";
import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {allProjects, getAllTags} from "@/libs/data";

export default function ProjectList() {

    const t = useTranslations('Projects');

    const [filter, setFilter] = useState(getAllTags()[0]);

    const projects = useMemo(() => {
        console.log(filter);
        return allProjects.filter((p) => p.tags.map((a) => a.toLowerCase()).includes(filter.toLowerCase()));
    }, [filter]);
    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text"}>{t('title')}</h1>
            <div className={"flex flex-col gap-6"}>
                <FilterBar onChangeFilter={setFilter}/>
                <div className={"flex flex-col"}>
                    <div className={"grid lg:grid-cols-2 gap-4 lg:gap-8"}>
                        {projects.map((p) => <Project key={p.name} project={p}/>)}
                    </div>
                    <div className={"self-center"}>
                       <button className={'m-4'}>{t('see-all')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function FilterBar({onChangeFilter}: {onChangeFilter: (filter: String) => void}) {

    const [selected, setSelected] = useState(0);

    const onChange = (i: number) => {
        setSelected(i);
        onChangeFilter(getAllTags()[i]);
    }

    return (
        <div className={"flex flex-row gap-x-4 gap-y-2 flex-wrap"}>
            {getAllTags().map((f, i) => <div key={`${f}`} className={`${i === selected ? 'bg-red-pastel text-white border-black border-opacity-15' : 'border-primary-text border-opacity-15 text-primary-text'} px-4 lg:px-10 py-0.5 lg:py-1.5 rounded-full border-1 cursor-pointer transition-all`} onClick={() => onChange(i)}>
                <p className={"text-md"}>{f}</p>
            </div>)}
        </div>
    )
}