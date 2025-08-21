import { createFileRoute } from '@tanstack/react-router'
import CTA from "@/components/cta";
import Header from "@/components/header";
import Work from "@/components/work";
import Projects from "@/components/projects";
import Feedback from "@/components/feedback";
import Footer from "@/components/footer";
import Skills from "@/components/skills";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  return <div>
    <Header/>
    <CTA/>
    {/*<Skills/>*/}
    <Work/>
    <Projects/>
    <Feedback/>
    <Footer/>
  </div>
}