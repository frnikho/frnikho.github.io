import TopBar from "@/components/topbar/TopBar";
import Hero from "@/components/home/Hero";
import MyInfoCard from "@/components/home/MyInfoCard";
import {CookiesProvider} from "next-client-cookies/server";

export default async function Home() {
    return (
        <div className={"flex flex-col w-8/12 m-auto gap-24"}>
            <CookiesProvider>
                <TopBar/>
            </CookiesProvider>
            <Hero/>
            <MyInfoCard/>
        </div>
    );
}
