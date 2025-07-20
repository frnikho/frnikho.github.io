import type {ReactNode} from "react";
import {Button, Container, SubTitle, Text, Title} from "@/components/lib/title";

type Social = {
    name: string;
    icon: string;
    link: string;
}

const socials: Social[] = [
    {
        name: 'Linkedin',
        icon: '/linkedin.png',
        link: 'https://linkedin.com/in/nicosans'
    },
    {
        name: 'Malt',
        icon: '/malt.png',
        link: 'https://malt.fr/profile/nicolassans'
    },
    {
        name: 'Github',
        icon: '/github.png',
        link: 'https://github.com/frnikho/'
    }
]

export default function Header() {
    return (
        <div className={"bg-[#F8F7F1]"}>
            <Container className={"flex flex-col m-auto relative"}>
                <Navigation/>
                <Hero/>
                <div className={"lg:absolute lg:bottom-0 lg:left-1/2 transform lg:-translate-x-1/2 mx-auto"}>
                    <img className={"rounded-t-full"} src="https://placehold.co/400x600/png" alt="Nicolas SANS profile" width={400}/>
                </div>
            </Container>
        </div>
    )
}

function Hero() {
    return (
        <div className={"flex flex-col gap-12 lg:gap-40 my-12 lg:my-28"}>
            <div className={"flex flex-col lg:flex-row"}>
                <div className={"flex flex-col gap-8 max-w-[28rem]"}>
                    <div>
                        <Title>SANS Nicolas</Title>
                        <SubTitle className={""}>Développeur Fullstack</SubTitle>
                    </div>
                    <Text className={"text-sm xl:text-lg font-semibold whitespace-pre-wrap"}>
                        👋 Bienvenue sur mon portfolio !<br/><br/>
                        Je suis Nicolas, développeur fullstack, mobile, DevOps et consultant Salesforce.<br/><br/>
                        Depuis plusieurs années, j’accompagne des entreprises, de la startup aux projets à fort trafic, dans la conception de solutions robustes, scalables, et parfaitement intégrées à leur écosystème.</Text>
                </div>
            </div>
            <div className={"flex flex-col lg:flex-row justify-between gap-4"}>
                <div className={"flex flex-col gap-2"}>
                    <div className={"flex flex-row gap-2 items-baseline"}>
                        <SubTitle className={"text-[2.5em] 3xl:text-[2.5em]"}>5</SubTitle>
                        <Text className={"text-lg uppercase font-montserrat font-medium"}>ans d'expériences</Text>
                    </div>
                </div>
                <div className={"text-lg"}>
                    <div className={"flex flex-row gap-4"}>
                        {socials.map((s) => <Social key={s.name} {...s}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Social(social: Social) {

    const onClick = () => {
        window.open(social.link, '_blank');
    }

    return (
        <div className={"p-4 bg-[#FFFFFF] shadow-[0_8px_30px_rgb(0,0,0,0.09)] active:scale-95 rounded-3xl transition-all cursor-pointer flex flex-row w-fit"} onClick={onClick}>
            <img className={"w-6"} src={social.icon} alt={social.name}/>
        </div>
    )
}

function Navigation() {

    const onClickPhone = () => {
        window.open('tel:+33629423783');
    }

    return (
        <div className={"py-4 flex flex-row justify-between items-center"}>
            <div className={"flex-2/12"}>
                <img className={"cursor-pointer"} alt={'logo'} src={'/android-chrome-192x192.png'} width={48} height={48}/>
            </div>
            <div className={"flex-row gap-2 justify-center flex-8/12 lg:flex hidden"}>
                <NavItem element={'.service'} first>Service</NavItem>
                <NavItem element={'.work'}>Expérience</NavItem>
                <NavItem element={'.project'}>Projets</NavItem>
                <NavItem element={'.feedback'}>Recommandation</NavItem>
                <NavItem element={'.contact'}>Contact</NavItem>
            </div>
            <div className={"flex flex-row gap-10 lg:flex-2/12"}>
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
                    <Text className={"text-sm"}>
                        +33 6 29 42 37 83
                    </Text>
                </Button>

                {/*<NavIcon>
                    <img src="/linkedin.png" alt="Linkedin" width={26} height={26}/>
                </NavIcon>*/}
            </div>
        </div>
    )
}

function NavItem({children, element, first = false}: { children: ReactNode, element: string, first?: boolean }) {

    const onClick = () => {
        const item = document.querySelector(element);
        console.log(element)
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

function NavIcon({children}: { children: ReactNode}) {
    return (
        <div className={"bg-[#FFFFFF] p-3.5 shadow-xs rounded-2xl hover:opacity-80 hover:bg-[#FFFFFE] transition-all cursor-pointer"}>
            {children}
        </div>
    )
}