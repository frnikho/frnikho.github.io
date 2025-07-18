import {ReactNode, RefObject, useRef} from "react";
import { useDraggable } from "react-use-draggable-scroll";

type ProjectProps = {
  title: string;
  description: string;
  image: ReactNode;
  variant: 'blue' | 'yellow' | 'green' | 'red';
}

const data: ProjectProps[] = [
  {
    title: "Project 1",
    description: "Description of project 1",
    image: <img src="https://placehold.co/300x300/png" alt="Project 1" />,
    variant: 'yellow'
  },
  {
    title: "Project 2",
    description: "Description of project 2",
    image: <img src="https://placehold.co/300x300/png" alt="Project 2" />,
    variant: 'blue'
  },
  {
    title: "Project 3",
    description: "Description of project 3",
    image: <img src="https://placehold.co/300x300/png" alt="Project 3" />,
    variant: 'green'
  },
  {
    title: "Project 4",
    description: "Description of project 1",
    image: <img src="https://placehold.co/300x300/png" alt="Project 1" />,
    variant: 'red'
  },
]

export default function Projects() {

  const ref = useRef<HTMLDivElement>(undefined) as RefObject<HTMLInputElement>;
  const {events} = useDraggable(ref);

  return (
    <div className={"flex flex-col m-auto relative py-20 gap-24"}>
      <div className={"3xl:w-8/12 w-10/12 flex flex-row justify-between items-center relative m-auto"}>
        <div>
          <h1 className={"m-auto text-[3em]"}>My Lastest Works</h1>
          <p>Perfect solution for digital experience</p>
        </div>
        <p className={"text-[#FCA693]"}>Explore more work</p>
      </div>
      <div ref={ref} className={"flex flex-row gap-8 overflow-x-auto no-scrollbar pr-[8%]"} {...events}>
        {data.map((project, index) => <Project first={index === 0} key={project.title} {...project}/>)}
      </div>
    </div>
  )
}

function Project({first = false, variant, title, description}: ProjectProps & {first?: boolean}) {

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

  return (
    <div className={`${first ? 'ml-[8.15%]' : null} min-w-[600px] min-h-[550px] ${color()} rounded-4xl p-8`}>
      <div className={"flex flex-col gap-2"}>
        <p className={"text-white text-3xl font-bold font-montserrat"}>{title}</p>
        <p className={"text-white text-lg font-montserrat font-medium"}>{description}</p>
      </div>
    </div>
  )
}