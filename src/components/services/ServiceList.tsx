'use client';

const items = ['Application', 'Mobile', 'Salesforce', 'DevOps', 'CLI'];

import {useState} from "react";

export default function ServiceList() {

    const [menu, setMenu] = useState(items[0]);

    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text"}>Services</h1>
            <ServiceMenu item={menu} onChange={setMenu}/>
            <div className={"flex flex-row h-96"}>
                <div className={"w-4/12 bg-primary-text"}>

                </div>
                <div className={"w-8/12 bg-white"}>

                </div>
            </div>
        </div>
    )
}

export function ServiceMenu({item, onChange}: {item: string, onChange: (i: string) => void}) {

    return (
        <div className={"flex flex-row gap-6"}>
            {items.map((i) => <div key={i} className={"text-xl text-primary-text relative cursor-pointer"} onClick={() => onChange(i)}>
                <p className={`text-primary-text ${item === i ? '' : 'text-[#303030] opacity-60'}`}>{i}</p>
                <p className={`${item === i ? 'border-1 border-primary-text bg-primary-text rounded-2xl mt-1' : ''} absolute w-full`}></p>
            </div>)}
        </div>
    )
}