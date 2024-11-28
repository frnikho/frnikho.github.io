import Image from "next/image";
import {ProjectData} from "@/libs/data";
import {useTranslations} from "next-intl";

type Props = {
    project: ProjectData;
}

export default function Project({project}: Props) {

    const t = useTranslations('Projects');

    return (
        // lg:col-span-2
        <div className={`lg:col-span-${project.size} w-full relative bg-card-background dark:bg-dark-card-background rounded-2xl group flex flex-col shadow-lg`}>
            <div className={`relative h-52 2xl:h-96 w-full overflow-hidden ${project.link.length !== 0 ? 'cursor-pointer' : ''}`} onClick={() => project.link.length !== 0 ? window.open(project.link, '_blank') : null}>
                <Image className={"rounded-2xl object-left object-cover group-hover:opacity-20 transition-all"}
                       src={project.photo}
                       alt={''} width={1800} height={1800} style={{width: '100%', height: '100%'}} quality={100}/>
                {/*<div*/}
                {/*    className={"absolute bottom-0 right-0 m-2 bg-white rounded-full w-8 h-8 opacity-0 group-hover:opacity-80 transition-all"}></div>*/}
                {/*<div className={"absolute m-3 top-0 left-0 -translate-y-16 group-hover:translate-y-0 transition-all"}>*/}
                {/*        <h3 className={"text-2xl font-medium text-primary-text dark:text-primary-text-dark"}>{project.name}</h3>*/}
                {/*</div>*/}
                <div className={`absolute -top-44 group-hover:top-1/2 group-hover:-translate-y-1/2 transition-all w-full flex justify-center`}>
                    {project.link.length !== 0 && (
                        <div>
                            <Image className={"self-center"} src={"/github-mark.svg"} alt={"Github"} width={64}
                                   height={64}/>
                        </div>
                    )}
                    {project.link.length === 0 && (
                        <div className={"w-full flex flex-col text-center"}>
                            <h3 className={"text-xl lg:text-2xl font-medium text-primary-text dark:text-primary-text-dark"}>{project.name}</h3>
                            <p className={"text-primary-text text-xs lg:text-sm dark:text-primary-text-dark m-4"}>{project.description}</p>
                        </div>)
                    }
                </div>
                {/*<div*/}
                {/*    className={"absolute bottom-10 left-0 m-3 p-2 flex flex-col gap-3 translate-y-56 group-hover:translate-y-0 transition-all"}>*/}
                {/*    <h3 className={"text-2xl font-medium text-primary-text dark:text-primary-text-dark"}>{project.name}</h3>*/}
                {/*    <p className={"text-primary-text text-sm dark:text-primary-text-dark"}>{project.description}</p>*/}
                {/*</div>*/}
                {/*<div*/}
                {/*    className={"absolute bottom-0 left-0 m-3 p-2 bg-white dark:bg-dark-card-background rounded-2xl flex flex-row gap-3 translate-y-16 group-hover:translate-y-0 transition-all"}>*/}
                {/*    {project.stack.map((s) => getStackIcon(s))}*/}
                {/*</div>*/}
                {/*<div className={"absolute right-0 bottom-0 m-3 translate-y-16 group-hover:translate-y-0 transition-all"}>*/}
                {/*    {project.link.length !== 0 ? <a className={"self-end dark:text-primary-text-dark"} target={'_blank'} href={project.link}><div className={""}>{t('see-on-github')}</div></a> : null}*/}
                {/*</div>*/}
            </div>
            {/*<div className={"p-4 flex flex-col gap-4"}>*/}
            {/*    <h3 className={"text-2xl font-medium text-primary-text dark:text-primary-text-dark"}>{project.name}</h3>*/}
            {/*    <p className={"text-primary-text text-sm dark:text-primary-text-dark"}>{project.description}</p>*/}
            {/*    {project.link.length !== 0 ? <a className={"self-end dark:text-primary-text-dark"} target={'_blank'} href={project.link}><div className={""}>{t('see-on-github')}</div></a> : null}*/}
            {/*</div>*/}
        </div>
    )
}

export function getStackIcon(stack: String) {
    const logo = [{name: 'Docker', url: '/docker.png'}, {name: 'NestJS', url: '/nestjs.png'}, {name: 'React', url: '/react.png'}, {name: 'C', url: '/c.png'}, {name: 'C++', url: '/c++.png'}, {name: 'Rust', url: '/rust.png'}, {name: 'Kubernetes', url: '/k8s.svg'}, {name: 'Terraform', url: '/terraform.png'}, {name: 'NextJS', url: '/next-js.svg'}, {name: 'C#', url: '/csharp.png'}, {name: 'Unity', url: '/unity.png'}, {name: 'Grafana', url: '/grafana.svg'}, {name: 'Ansible', url: '/ansible.png'}]
    return (
       <Image title={`${stack}`} className={"w-6 h-6"} key={`${stack}`} src={logo.find((l) => l.name === stack)?.url!} alt={`${stack}`} width={64} height={64}/>
    )
}