import Image from "next/image";

export default function Project() {
    return (
        <div className={'w-fit bg-card-background relative rounded-3xl cursor-pointer group'}>
            <Image className={"rounded-3xl object-cover group-hover:opacity-50 transition-all"} src={'/bg.png'} alt={''} width={1080} height={720}/>
        </div>
    )
}