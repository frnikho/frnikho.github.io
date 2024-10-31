import TopBar from "@/components/topbar/TopBar";
import Hero from "@/components/home/Hero";
import MyInfoCard from "@/components/home/MyInfoCard";
import {CookiesProvider} from "next-client-cookies/server";
import ProjectList from "@/components/projets/ProjectList";
import ContactCard from "@/components/contacts/ContactCard";

export default async function Home() {
    return (
        <div className={"flex flex-col w-11/12 xl:w-8/12 m-auto gap-32 lg:gap-24"}>
            <CookiesProvider>
                <TopBar/>
            </CookiesProvider>
            <Hero/>
            <MyInfoCard/>
            <ProjectList/>
            {/*<ServiceList/>*/}
            <ContactCard/>
        </div>
    );
}
