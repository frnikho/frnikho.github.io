import {Container, SubTitle, Text} from "@/components/lib/title";

export default function Footer() {

    const onClickContact = () => {
        window.open('tel:0629423783', '_blank');
    }

    return (
        <Container className={"flex flex-col pt-14 lg:pt-28 mb-6 mx-auto gap-8 contact"}>
            <div className={"flex flex-col lg:flex-row"}>
                <div className={"flex-2/3 flex flex-col gap-16"}>
                    <SubTitle>Un projet en tête ? Une idée à concrétiser ? <br/>Écrivons-en les premières lignes ensemble.</SubTitle>
                    <SubTitle>Tu peux me contacter directement <span className={"underline text-[#E06141] cursor-pointer"} onClick={onClickContact}>ici</span></SubTitle>
                </div>
                <div className={"flex-1/3 flex flex-col gap-8"}>
                    <div className={"flex flex-col"}>
                        <h3 className={"text-2xl mb-2"}>Informations</h3>
                        <p className={"font-nunito"}>Nantes et ses alentours</p>
                        <p className={"font-nunito"}>nicolas.sansd@gmail.com</p>
                        <p className={"font-nunito"}>+33 6 29 42 37 83</p>
                    </div>
                    <div className={"flex flex-col gap-3"}>
                        <div className={"flex flex-row gap-2 items-center cursor-pointer"} onClick={() => window.open('https://linkedin.com/in/nicosans/', '_blank')}>
                            <img src="/linkedin.png" alt="linkedin" width={24}/>
                            <p className={"text-primary font-semibold"}>Linkedin</p>
                        </div>
                        <div className={"flex flex-row gap-2 items-center cursor-pointer"} onClick={() => window.open('https://github.com/frnikho', '_blank')}>
                            <img src="/github.png" alt="github" width={24}/>
                            <p className={"text-primary font-semibold"}>Github</p>
                        </div>
                        <div className={"flex flex-row gap-2 items-center cursor-pointer"} onClick={() => window.open('https://malt.fr/profile/nicolassans', '_blank')}>
                            <img src="/malt.png" alt="malt" width={24}/>
                            <p className={"text-primary font-semibold"}>Malt</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={"border-gray-300"}/>
            <div>
                <div className={"flex flex-col lg:flex-row justify-between items-center"}>
                    <div className={"flex flex-row items-center gap-2 lg:gap-4"}>
                        <img className={"not-lg:w-[22px]"} src="/android-chrome-192x192.png" alt="nico logo" width={40} height={40}/>
                        <Text className={"text-xs lg:text-sm"}>© 2025 <b>Nicolas Sans</b>. Tous droits réservés.</Text>
                    </div>
                    <div>
                        <Text className={"text-xs lg:text-sm"}>Design inspiré par <a className={"font-semibold"} href={"https://dribbble.com/sajon"}>Sajon</a> sur <a href="https://dribbble.com/shots/16831903-Portfolio-Web-Site-Design-Landing-Page-Home-Page-UI">Dribbble</a></Text>
                    </div>
                </div>
            </div>
        </Container>
    )
}