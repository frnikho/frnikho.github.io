import {Container, SubTitle, Title} from "@/components/lib/title";

export default function Footer() {

    const onClickContact = () => {
        window.open('tel:0629423783', '_blank');
    }

    return (
        <Container className={"flex flex-col pt-28 mb-6 mx-auto gap-8"}>
            <div className={"flex flex-col lg:flex-row"}>
                <div className={"flex-2/3 flex flex-col gap-16"}>
                    <SubTitle>Un projet en tête ? Une idée à concrétiser ? <br/>Écrivons-en les premières lignes ensemble.</SubTitle>
                    <SubTitle>Tu peux me contacter directement <span className={"underline text-[#E06141] cursor-pointer"} onClick={onClickContact}>ici</span></SubTitle>
                </div>
                <div className={"flex-1/3 flex flex-col gap-8"}>
                    <div className={"flex flex-col"}>
                        <h3 className={"text-2xl mb-2"}>Informations</h3>
                        <p className={"font-nunito"}>Clisson 44190</p>
                        <p className={"font-nunito"}>nicolas.sansd@gmail.com</p>
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
                <div className={"flex flex-row justify-between items-center"}>
                    <div>
                        <img src="/android-chrome-192x192.png" alt="nico logo" width={40} height={40}/>
                    </div>
                </div>
            </div>
        </Container>
    )
}