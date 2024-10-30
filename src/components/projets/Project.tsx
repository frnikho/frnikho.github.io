import Image from "next/image";

export default function Project() {
    return (
        <div className={'w-fit bg-card-background relative rounded-3xl cursor-pointer group'}>
            <Image className={"rounded-3xl object-cover group-hover:opacity-50 transition-all"} src={'/bg.png'} alt={''} width={1080} height={720}/>
            <div className={"absolute bottom-0 right-0 m-4 bg-white rounded-full w-8 h-8 opacity-0 group-hover:opacity-80"}>
            </div>
        </div>
    )
}