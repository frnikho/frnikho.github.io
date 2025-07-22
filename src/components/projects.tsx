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
    image: '/projects/everyloc.png',
    variant: 'yellow',
    link: 'https://www.angers-location.fr'
  },
  {
    title: "ATrip",
    description: "Application web de planification de voyages",
    image: "/projects/trip_planner.png",
    variant: 'green'
  },
  {
    title: "FBX-CLI",
    description: "Outil CLI pour gérer sa Freebox depuis son terminal",
    image: "/projects/fbx-cli.png",
    variant: 'red'
  },
  {
    title: 'PLD Maker',
    description: 'Solution web de gestion et de génération de document de suivi de projet pour les équipes de développement',
    variant: 'blue',
    image: '/projects/pld_2.png',
    link: ''
  }
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
      <div ref={ref} className={"flex flex-row gap-4 lg:gap-8 overflow-x-auto no-scrollbar"} {...events}>
        {data.map((project, index) => <Project first={index === 0} key={project.title} {...project}/>)}
      </div>
    </div>
  )
}

function Project({first = false, variant, title, description, image}: ProjectProps & {first?: boolean}) {

  const color = () => {
    if (variant === 'blue') {
      return 'bg-linear-to-bl from-[#63ad79] to-[#387369]';
    }
    if (variant === 'yellow') {
      return 'bg-yellow-500';
    }
    if (variant === 'green') {
      return 'bg-linear-to-bl from-[#2f738c] to-[#2A6C72]';
    }
    if (variant === 'red') {
      return 'bg-[#EE6244]'
    }
  }

  const onClickProjet = () => {

  }

  return (
    <div className={`select-none relative ${first ? 'ml-[4%] lg:ml-[8.17%] 3xl:ml-[16.5%]' : ''} min-w-[320px] lg:min-w-[600px] lg:min-h-[350px] ${color()} rounded-2xl`} onClick={onClickProjet}>
      <div className={"flex flex-col justify-between h-full"}>
        <div className={"flex flex-col gap-2 p-4 lg:p-8"}>
          <Text className={"text-white text-xl lg:text-3xl font-bold font-montserrat"}>{title}</Text>
          <Text className={"text-white text-sm lg:text-lg font-montserrat font-medium"}>{description}</Text>
        </div>
        <div className={"flex flex-row self-center pb-4 lg:pb-8 px-4 lg:px-8"}>
          <img className={'select-none rounded-2xl shadow-2xl h-[250px] lg:h-[350px] lg:w-[600px] object-cover object-top-left'} src={image} alt={title}/>
        </div>
      </div>
    </div>
  )
}