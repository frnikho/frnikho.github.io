import { createFileRoute } from '@tanstack/react-router'
import Header from "@/components/header";
import CTA from "@/components/cta";
import Work from "@/components/work";
import Projects from "@/components/projects";
import Feedback from "@/components/feedback";
import Footer from "@/components/footer";
import {type RefObject, useEffect, useRef} from "react";
import {animate, onScroll, stagger} from "animejs";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const containerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  useEffect(() => {
    animate('.project-card', {
      translateY: [50, 0],
      opacity: [0, 1],
      delay: stagger(50),
      onBegin: () => {
        console.log('begin');
      },
      autoplay: onScroll({
        target: '.project-card',
        container: containerRef.current,
        enter: 'bottom top',
        leave: 'top bottom',
        debug: false
      })
    })
  }, [])

  return <div ref={containerRef}>
    <Header/>
    <CTA/>
    <Work/>
    <Projects/>
    <Feedback/>
    <Footer/>
  </div>
}