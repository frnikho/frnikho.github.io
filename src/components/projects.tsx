import {type RefObject, useRef} from "react";
import { useDraggable } from "react-use-draggable-scroll";
import {Container, Text, Title} from "@/components/lib/title";

type ProjectProps = {
  title: string;
  description: string;
  image: string;
  link?: string;
  variant: 'blue' | 'yellow' | 'green' | 'red';
}

const data: ProjectProps[] = [
  {
    title: "Everyloc",
    description: 'Site de location d\événementiels pour particuliers et professionnels sur Angers et ses alentours',
    image: '/projects/angers-location.png',
    variant: 'yellow',
    link: 'https://www.angers-location.fr'
  },
  {
    title: "Citrine",
    description: "Description of project 2",
    image: "/projects/citrine.png",
    variant: 'blue',
  },
  {
    title: "Project 3",
    description: "Description of project 3",
    image: "https://placehold.co/300x300/png",
    variant: 'green'
  },
  {
    title: "Project 4",
    description: "Description of project 1",
    image: "https://placehold.co/300x300/png",
    variant: 'red'
  },
]

export default function Projects() {

  const ref = useRef<HTMLDivElement>(undefined) as RefObject<HTMLInputElement>;
  const {events} = useDraggable(ref);

  return (
    <div className={"flex flex-col m-auto relative py-20 gap-12 lg:gap-24 project"}>
      <Container className={"flex flex-col gap-6 lg:flex-row justify-between lg:items-center relative m-auto"}>
        <div className={"space-y-3"}>
          <Title>Dernier projets</Title>
          <Text>Quelques-uns des défis que j’ai relevés récemment avec mes clients.</Text>
        </div>
        <p className={"text-[#FCA693] cursor-pointer hover:underline"} onClick={() => window.open('https://github.com/frnikho', '_blank')}>Explorer tout mes projets</p>
      </Container>
      <div ref={ref} className={"flex flex-row gap-8 overflow-x-auto no-scrollbar pr-[8%]"} {...events}>
        {data.map((project, index) => <Project first={index === 0} key={project.title} {...project}/>)}
      </div>
    </div>
  )
}

function Project({first = false, variant, title, description, image}: ProjectProps & {first?: boolean}) {

  const color = () => {
    if (variant === 'blue') {
      return 'bg-[#387369]';
    }
    if (variant === 'yellow') {
      return 'bg-[#EBC34C]';
    }
    if (variant === 'green') {
      return 'bg-[#2A6C72]';
    }
    if (variant === 'red') {
      return 'bg-[#EE6244]'
    }
  }

  const onClickProjet = () => {

  }

  return (
    <div className={`${first ? 'ml-[8.15%]' : null} min-w-[300px] h-[300px] lg:min-w-[600px] lg:min-h-[550px] ${color()} rounded-4xl`} onClick={onClickProjet}>
      <div className={"flex flex-col justify-between h-full"}>
        <div className={"flex flex-col gap-2 p-6 lg:p-8"}>
          <Text className={"text-white text-xl lg:text-3xl font-bold font-montserrat"}>{title}</Text>
          <Text className={"text-white text-sm lg:text-lg font-montserrat font-medium"}>{description}</Text>
        </div>
        <div className={"self-end p-4"}>
          <img src={image} alt={title}/>
        </div>
      </div>
    </div>
  )
}