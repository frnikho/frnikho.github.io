import TopBar from "@/components/topbar/TopBar";
import Hero from "@/components/home/Hero";
import MyInfoCard from "@/components/home/MyInfoCard";
import {CookiesProvider} from "next-client-cookies/server";
import ProjectList from "@/components/projets/ProjectList";
import ContactCard from "@/components/contacts/ContactCard";
import ServiceList from "@/components/services/ServiceList";

export default async function Home() {
    return (
        <div className={"flex flex-col gap-28 mb-10"}>
            <div className={"flex flex-col w-11/12 xl:w-8/12 m-auto lg:gap-8"}>
                <CookiesProvider>
                    <TopBar/>
                </CookiesProvider>
                <Hero/>
                <MyInfoCard/>
                <ServiceList/>
            </div>
            <ProjectList/>
            <div className={"flex flex-col w-11/12 xl:w-8/12 m-auto gap-28 lg:gap-36 mb-10"}>
                <ContactCard/>
            </div>
        </div>
    );
}
