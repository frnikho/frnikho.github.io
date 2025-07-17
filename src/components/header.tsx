import {ReactNode} from "react";

export default function Header() {
    return (
        <div className={"bg-[#F8F7F1]"}>
            <div className={"flex flex-col 3xl:w-8/12 w-10/12 m-auto relative"}>
                <Navigation/>
                <Hero/>
                <div className={"absolute bottom-0 left-1/2 transform -translate-x-1/2"}>
                    <img className={"rounded-t-full"} src="https://placehold.co/500x650/png" alt="profile picture" width={500}/>
                </div>
            </div>
        </div>
    )
}

function Hero() {
    return (
        <div className={"flex flex-col gap-48 my-28"}>
            <div className={"flex flex-row justify-between items-center"}>
                <div className={"flex flex-col gap-4"}>
                    <h1 className={"text-[4em] 3xl:text-[4.5em] leading-tight"}>Hey There,<br/> I'm Nicolas</h1>
                    <h3 className={"text-xl"}>Architecte logiciel et développeur d'applications</h3>
                </div>
                <h3 className={"w-80 text-xl"}>je développe des solutions performantes et robuste pour répondre à tout besoin</h3>
            </div>
            <div className={"flex flex-row justify-between items-center"}>
                <div className={"flex flex-col gap-2"}>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <h1 className={"text-[2em] 3xl:text-[2.5em]"}>3</h1>
                        <h3 className={"text-lg uppercase"}>ans d'expérience</h3>
                    </div>
                    <div className={"flex flex-row gap-3 items-center"}>
                        <h3 className={"text-lg uppercase"}>ans d'expérience</h3>
                        <h1 className={"text-[2em] 3xl:text-[2.5em]"}>3</h1>
                    </div>
                </div>
                <h1 className={"text-[4em] 3xl:text-[4.5em]"}></h1>
                <h3 className={"w-80 text-lg"}>je développe des solutions performantes et robuste pour répondre à tout besoin</h3>
            </div>
        </div>
    )
}

function Navigation() {
    return (
        <div className={"p-4 flex flex-row justify-between items-center"}>
            <div>
                <img className={"cursor-pointer"} alt={'logo'} src={'/android-chrome-192x192.png'} width={48} height={48}/>
            </div>
            <div className={"flex flex-row gap-20 justify-center"}>
                <NavItem first>Services</NavItem>
                <NavItem>Projets</NavItem>
                <NavItem>Contact</NavItem>
                <NavItem>Contact</NavItem>
            </div>
            <div className={"flex flex-row gap-10"}>
                <NavIcon>
                    <img src="/linkedin.png" alt="Linkedin" width={26} height={26}/>
                </NavIcon>
            </div>
        </div>
    )
}

function NavItem({ children, first = false }: { children: ReactNode, first?: boolean }) {
    return (
        <div className={`bg-[#F8F7F1] hover:bg-[#FFFFFF] hover:rounded-full px-8 py-3.5 transition-all hover:shadow-xs`}>
            <p className={`${first ? 'border-[#246D6A] text-[#246D6A] border-x-3 px-6' : ''} text-[1.2em] font-bold font-nunito leading-4 cursor-pointer tracking-wide`}>
                {children}
            </p>
        </div>
    )
}

function NavIcon({ children }: { children: ReactNode}) {
    return (
        <div className={"bg-[#FFFFFF] p-3.5 shadow-xs rounded-2xl hover:opacity-80 hover:bg-[#FFFFFE] transition-all cursor-pointer"}>
            {children}
        </div>
    )
}