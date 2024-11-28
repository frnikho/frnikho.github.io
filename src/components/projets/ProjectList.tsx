'use client';

import Project from "@/components/projets/Project";
import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {ProjectData} from "@/libs/data";

export default function ProjectList() {

    const t = useTranslations('Projects');
    const [filter, setFilter] = useState<String>('');

    const projects = useMemo(() => {
        return allProjects(t).filter((p) => filter === '' ? true : p.tags.map((a) => a.toLowerCase()).includes(filter.toLowerCase()));
    }, [filter, t]);
    return (
        <div className={"flex flex-col relative items-center justify-center gap-16"}>
            <div className={"w-11/12 xl:w-8/12 m-auto mt-24"}>
                <div
                    className={"absolute -z-20 rounded-md bg-[#ececec] dark:bg-[#202020] top-10 w-28 h-28 animate-rotate-infinite lg:-mx-[15%]"}></div>
                <div
                    className={"absolute -z-20 rounded-md bg-[#ececec] dark:bg-[#202020] top-[5%] w-44 h-44 animate-rotate-infinite lg:-mx-[15%] right-0"}></div>
                <div
                    className={"absolute -z-20 rounded-md bg-[#ececec] dark:bg-[#202020] top-0 w-12 h-64 animate-rotate-infinite-slow right-[20%]"}></div>
                <div className={"flex flex-col gap-4"}>
                    <h1 className={"text-4xl font-semibold text-primary-text dark:text-primary-text-dark"}
                        id={"project"}>{t('title')}</h1>
                    <p className="text-md text-primary-text dark:text-primary-text-dark">{t('subtitle')}</p>
                </div>
            </div>

            <div className={"flex flex-col gap-6 w-11/12 xl:w-10/12"}>
                {/*<FilterBar onChangeFilter={(e) => setFilter(e)}/>*/}
                <div className={"flex flex-col"}>
                    <div className={"grid lg:grid-cols-4 gap-4 lg:gap-8"}>
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

export function FilterBar({onChangeFilter}: { onChangeFilter: (filter: String) => void }) {

    const [selected, setSelected] = useState(-1);

    const onChange = (i: number) => {
        if (i === selected) {
            setSelected(-1);
            onChangeFilter('');
        } else {
            setSelected(i);
            //onChangeFilter(getAllTags()[i]);
        }
    }

    return (
        <div className={"flex flex-row gap-x-4 gap-y-2 flex-wrap"}>
            {/*{getAllTags().map((f, i) => <div key={`${f}`} className={`${i === selected ? 'bg-red-pastel text-white border-black border-opacity-15' : 'border-primary-text border-opacity-15 text-primary-text'} px-4 lg:px-10 py-0.5 lg:py-1.5 rounded-full border-1 cursor-pointer transition-all`} onClick={() => onChange(i)}>*/}
            {/*    <p className={`text-md text-primary-text dark:text-primary-text-dark ${i === selected ? 'text-white' : ''}`}>{f}</p>*/}
            {/*</div>)}*/}
        </div>
    )
}

const allProjects = (t: any) : ProjectData[] => ([
    {
        name: t('pld.title'),
        link: 'https://github.com/frnikho/PldMaker',
        created_at: new Date('2022-07-01'),
        description: t('pld.description'),
        photo: '/projects/pld_2.png',
        tags: ['Web', 'Api'],
        stack: ['Docker', 'NestJS', 'React'],
        size: 2,
    },
    {
        name: t('fbx.title'),
        description: t('fbx.description'),
        link: 'https://github.com/frnikho/fbx-cli',
        tags: ['CLI'],
        stack: ['Rust'],
        photo: '/projects/fbx-cli.png',
        created_at: new Date('2024-02-01'),
        size: 1,
    },
    {
        name: t('atrip.title'),
        description: t('atrip.description'),
        link: '',
        created_at: new Date('2023-09-01'),
        photo: '/projects/trip_planner.png',
        stack: ['NestJS', 'NextJS'],
        tags: ['Web', 'Api'],
        size: 1,
    },
    {
        name: t('iot.title'),
        description: t('iot.description'),
        link: '',
        stack: ['C++', 'C', 'Rust'],
        tags: ['IoT', 'Api'],
        photo: '/projects/iot.png',
        created_at: new Date('2024-06-01'),
        size: 1,

    },
    {
        name: t('cloud.title'),
        description: t('cloud.description'),
        link: '',
        tags: ['DevOps'],
        stack: ['Kubernetes', 'Docker', 'Terraform', 'Grafana', 'Ansible'],
        photo: '/projects/cloud.png',
        created_at: new Date('2024-04-01'),
        size: 1,

    },
    {
        name: t('argames.title'),
        description: t('argames.description'),
        link: '',
        created_at: new Date('2023-01-01'),
        photo: '/projects/argames.png',
        stack: ['Unity', 'C#', 'C++', 'C'],
        tags: ['Game', 'IoT'],
        size: 1,

    },
    {
        name: t('myrpg.title'),
        link: 'https://github.com/frnikho/Epitech_rpg',
        description: t('myrpg.description'),
        stack: ['C'],
        tags: ['Game'],
        photo: '/projects/my_rpg.png',
        created_at: new Date('2019-06-01'),
        size: 1,
    },
]);