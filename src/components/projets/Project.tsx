import Image from "next/image";
import {ProjectData} from "@/libs/data";

type Props = {
    project: ProjectData;
}

export default function Project({project}: Props) {
    return (
        <div className={'w-full relative bg-card-background dark:bg-dark-card-background rounded-3xl group flex flex-col'}>
            <div className={"relative h-80 w-full overflow-hidden"}>
                <Image className={"rounded-3xl object-top object-cover group-hover:opacity-70 transition-all"}
                       src={project.photo}
                       alt={''} width={1000} height={0} style={{width: '100%', height: '100%'}}/>
                {/*<div*/}
                {/*    className={"absolute bottom-0 right-0 m-2 bg-white rounded-full w-8 h-8 opacity-0 group-hover:opacity-80 transition-all"}></div>*/}
                <div className={"absolute bottom-0 left-0 m-3 p-2 bg-white dark:bg-dark-card-background rounded-2xl flex flex-row gap-3 translate-y-16 group-hover:translate-y-0 transition-all"}>
                    {project.stack.map((s) => getStackIcon(s))}
                </div>
            </div>
            <div className={"p-4 flex flex-col gap-4"}>
                <h3 className={"text-2xl font-medium text-primary-text dark:text-primary-text-dark"}>{project.name}</h3>
                <p className={"text-primary-text text-sm dark:text-primary-text-dark"}>{project.description}</p>
                {project.link.length !== 0 ? <a className={"self-end dark:text-primary-text-dark"} target={'_blank'} href={project.link}><div className={""}>Voir sur github</div></a> : null}
            </div>
        </div>
    )
}

export function getStackIcon(stack: String) {
    const logo = [{name: 'Docker', url: '/docker.png'}, {name: 'NestJS', url: '/nestjs.png'}, {name: 'React', url: '/react.png'}, {name: 'C', url: '/c.png'}, {name: 'C++', url: '/c++.png'}, {name: 'Rust', url: '/rust.png'}, {name: 'Kubernetes', url: '/k8s.svg'}, {name: 'Terraform', url: '/terraform.png'}, {name: 'NextJS', url: '/next-js.svg'}, {name: 'C#', url: '/csharp.png'}, {name: 'Unity', url: '/unity.png'}, {name: 'Grafana', url: '/grafana.svg'}, {name: 'Ansible', url: '/ansible.png'}]
    return (
       <Image title={`${stack}`} className={"w-6 h-6"} key={`${stack}`} src={logo.find((l) => l.name === stack)?.url!} alt={`${stack}`} width={64} height={64}/>
    )
}