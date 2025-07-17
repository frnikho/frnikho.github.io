import { createFileRoute } from '@tanstack/react-router'
import Header from "@/components/header";
import CTA from "@/components/cta";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Header/>
    <CTA/>
  </div>
}