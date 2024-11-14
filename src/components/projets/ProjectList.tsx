'use client';

import Project from "@/components/projets/Project";
import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {allProjects, getAllTags} from "@/libs/data";

export default function ProjectList() {

    const t = useTranslations('Projects');

    const [filter, setFilter] = useState<String>('');

    const projects = useMemo(() => {
        return allProjects.filter((p) => filter === '' ? true : p.tags.map((a) => a.toLowerCase()).includes(filter.toLowerCase()));
    }, [filter]);
    return (
        <div className={"flex flex-col gap-10"}>
            <div className={"flex flex-col gap-4"}>
                <h1 className={"text-4xl font-semibold text-primary-text dark:text-primary-text-dark "}>{t('title')}</h1>
                <p className="text-md">Découvrez mes divers projets réalisés, du développement web aux applications mobiles et aux solutions cloud.</p>
            </div>
            <div className={"flex flex-col gap-6"}>
                <FilterBar onChangeFilter={(e) => setFilter(e)}/>
                <div className={"flex flex-col"}>
                    <div className={"grid lg:grid-cols-2 gap-4 lg:gap-8"}>
                        {projects.map((p) => <Project key={p.name} project={p}/>)}
                    </div>
                    <div className={"self-center mt-4 relative"}>
                        <a href={'https://github.com/frnikho?tab=repositories'} target={'_blank'}>
                            <button
                                className={'bg-red-pastel px-8 py-1 rounded-2xl text-white text-lg cursor-pointer active:translate-y-1'}>{t('see-all')}
                            </button>
                        </a>
                    <p className={"absolute bg-[#d96961] w-full mt-2 h-full rounded-2xl top-0 left-0 -z-10"}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function FilterBar({onChangeFilter}: { onChangeFilter: (filter: String) => void}) {

    const [selected, setSelected] = useState(-1);

    const onChange = (i: number) => {
        if (i === selected) {
            setSelected(-1);
            onChangeFilter('');
        } else {
            setSelected(i);
            onChangeFilter(getAllTags()[i]);
        }
    }

    return (
        <div className={"flex flex-row gap-x-4 gap-y-2 flex-wrap"}>
            {getAllTags().map((f, i) => <div key={`${f}`} className={`${i === selected ? 'bg-red-pastel text-white border-black border-opacity-15' : 'border-primary-text border-opacity-15 text-primary-text'} px-4 lg:px-10 py-0.5 lg:py-1.5 rounded-full border-1 cursor-pointer transition-all`} onClick={() => onChange(i)}>
                <p className={`text-md text-primary-text dark:text-primary-text-dark ${i === selected ? 'text-white' : ''}`}>{f}</p>
            </div>)}
        </div>
    )
}