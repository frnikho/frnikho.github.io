import {type ReactNode, useState} from "react";
import {Button, Container, SubTitle, Text} from "@/components/lib/title";
import { motion } from "motion/react";
import SplitText from "@/components/lib/split-text";

export default function Header() {

    return (
        <div className={"bg-[#F8F7F1] relative"}>
            <Container className={"flex flex-col m-auto relative home"}>
                <Navigation/>
                <div className={'flex flex-col'}>
                    <Hero/>
                    <div className={"lg:absolute md:right-0 2xl:right-auto bottom-0 2xl:left-1/2 transform 2xl:-translate-x-1/2 overflow-hidden"}>
                        <img className={"rounded-t-[100px]"} src="/pp.jpg" alt="Nicolas SANS profile" width={400}/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

function Hero() {
    return (
        <div className={"flex flex-col gap-6 lg:gap-20 mb-3 lg:mb-8 lg:mt-28 relative"}>
            <div className={"flex flex-col lg:flex-row justify-between gap-4"}>
                <div className={"flex flex-col gap-8 lg:max-w-[28rem]"}>
                    <div>
                        <SplitText
                            kind='title'
                            text="SANS Nicolas"
                            delay={50}
                            duration={0.4}
                            threshold={0.1}
                        />
                        <SplitText
                            kind='subtitle'
                            text="Développeur Fullstack"
                            delay={50}
                            duration={0.6}
                            threshold={0.1}
                        />
                    </div>
                    <Text className={"text-sm xl:text-lg font-semibold whitespace-pre-wrap"}>
                        👋 Bienvenue sur mon portfolio !<br/><br/>
                        Je suis Nicolas, développeur fullstack, mobile, DevOps et consultant Salesforce.<br/><br/>
                        Depuis plusieurs années, j’accompagne des entreprises, de la startup aux projets à fort trafic, dans la conception de solutions robustes, scalables, et parfaitement intégrées à leur écosystème.</Text>
                </div>
            </div>
            <div className={"flex flex-row 2xl:justify-between gap-8"}>
                <div className={"flex flex-col gap-2 justify-center "}>
                    <div className={"flex flex-row gap-2 items-baseline"}>
                        <SubTitle className={"text-[2.5em] 3xl:text-[2.5em]"}>5</SubTitle>
                        <Text className={"text-lg uppercase font-montserrat font-medium"}>ans d'expériences</Text>
                    </div>
                </div>
                <div className={"flex flex-row gap-4 items-center justify-center"}>
                    <img className={"cursor-pointer"} src="/pd1.png" alt="Plateform developer I - certification" width={70} onClick={() => window.open('https://trailheadacademy.salesforce.com/certificate/exam-platform-dev1---Plat-Dev-201', '_blank')}/>
                    <img className={"cursor-pointer"} src="/rncp.png" alt="RNCP35075" width={140} onClick={() => window.open('https://www.francecompetences.fr/recherche/rncp/35075/', '_blank')}/>
                </div>
            </div>
        </div>
    )
}

function Navigation() {

    const [activeMenu, setActiveMenu] = useState(false);

    const onClickPhone = () => {
        window.open('tel:+33629423783');
    }

    return (
        <div className={"py-4 flex flex-row justify-between items-center"}>
            <div className={"flex-2/12"}>
                <img className={`not-lg:hidden cursor-pointer w-[38px] lg:min-w-[48px]`} alt={'logo'} src={'/android-chrome-192x192.png'} width={48} height={48}/>
            </div>
            <div className={"flex-row gap-2 justify-center flex-8/12 xl:flex hidden"}>
                <NavItem element={'.service'} first>Service</NavItem>
                <NavItem element={'.work'}>Expérience</NavItem>
                <NavItem element={'.project'}>Projets</NavItem>
                <NavItem element={'.feedback'}>Recommandation</NavItem>
                <NavItem element={'.contact'}>Contact</NavItem>
            </div>
            <div className={"flex flex-row gap-10 xl:flex-2/12 not-xl:hidden"}>
                <Button className={"flex flex-row items-center gap-2"} onClick={onClickPhone}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                         stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-phone-call-icon lucide-phone-call">
                        <title>phone call</title>
                        <path d="M13 2a9 9 0 0 1 9 9"/>
                        <path d="M13 6a5 5 0 0 1 5 5"/>
                        <path
                            d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
                    </svg>
                    <Text className={"text-sm resize-none text-nowrap"}>
                        +33 6 29 42 37 83
                    </Text>
                </Button>
            </div>
            <div className={'xl:hidden'}>
                <Button className={'rounded-xl p-2 fixed right-0 top-0 m-5 z-20'}>
                    <svg onClick={() => setActiveMenu(!activeMenu)} className={`${activeMenu ? 'rotate-90' : '0'} transition-all`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <title>menu</title>
                        <path d="M4 12h16" className={`${activeMenu ? 'translate-x-[3px]' : ''}`}/>
                        <path d="M4 18h16" className={`${activeMenu ? '-translate-x-[3px]' : ''}`}/>
                        <path d="M4 6h16" className={`${activeMenu ? '-translate-x-[3px]' : ''}`}/>
                    </svg>
                </Button>
                <div className={`fixed h-full mt-16 right-0 transition-all overflow-x-clip pl-8 pr-4 z-20`}>
                    <div className={`${!activeMenu ? 'translate-x-[200px]' : 'translate-x-[0px]'} py-4 flex flex-col gap-3 transition-all`}>
                        <MobileNavItem element={'.home'} title={'Home'} icon={'home'}/>
                        <MobileNavItem element={'.service'} title={'Service'} icon={'service'}/>
                        <MobileNavItem element={'.work'} title={'Expérience'} icon={'work'}/>
                        <MobileNavItem element={'.project'} title={'Projets'} icon={'project'}/>
                        <MobileNavItem element={'.feedback'} title={'Recommandation'} icon={'feedback'}/>
                        <MobileNavItem element={'.contact'} title={'Contact'} icon={'contact'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MobileNavItem({title, element, icon}: {title: string, element: string, icon: 'service' | 'work' | 'project' | 'feedback' | 'contact' | 'home'}) {

    const delay = () => {
        return {
            service: 'delay-50',
            work: 'delay-100',
            project: 'delay-150',
            feedback: 'delay-200',
            contact: 'delay-250'
        }[icon];
    }

    const onClick = () => {
        const item = document.querySelector(element);
        if (item) {
            item.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'start'});
        }
    }

    const showIcon = () => {
        if (icon === 'home') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <title>home</title>
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
                    <path
                        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
            )
        }
        if (icon === 'feedback') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <title>feedback</title>
                    <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                </svg>
            )
        }
        if (icon === 'project') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <title>project</title>
                    <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/>
                    <path d="M10 19v-3.96 3.15"/>
                    <path d="M7 19h5"/>
                    <rect width="6" height="10" x="16" y="12" rx="2"/>
                </svg>
            )
        }
        if (icon === 'service') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <title>service</title>
                    <path
                        d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
                    <path d="M12 22V12"/>
                    <polyline points="3.29 7 12 12 20.71 7"/>
                    <path d="m7.5 4.27 9 5.15"/>
                </svg>
            )
        }
        if (icon === 'work') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <title>work</title>
                    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    <rect width="20" height="14" x="2" y="6" rx="2"/>
                </svg>
            )
        }
        if (icon === 'contact') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="#0C2E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <title>mail</title>
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                </svg>
            )
        }
    }

    return (
        <Button className={`bg-white p-4 rounded-3xl flex flex-row gap-2 items-center ${delay()} shadow-[0_8px_30px_rgb(0,0,0,0.16)]`} onClick={onClick}>
            {showIcon()}
        </Button>
    )
}

function NavItem({children, element, first = false}: { children: ReactNode, element: string, first?: boolean }) {

    const onClick = () => {
        const item = document.querySelector(element);
        if (item) {
            item.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'center'});
        }
    }

    return (
        <Button
            onClick={onClick}
            className={`shadow-none bg-[#F8F7F1] hover:bg-[#FFFFFF] hover:rounded-full px-8 py-3.5 transition-all hover:shadow-xs`}>
            <p className={`${first ? 'border-[#246D6A] text-[#246D6A] border-x-3 px-6' : ''} text-[1.2em] font-bold font-nunito leading-4 cursor-pointer tracking-wide`}>
                {children}
            </p>
        </Button>
    )
}