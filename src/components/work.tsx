import {Container, Heading, SubTitle, Text, Title} from "@/components/lib/title";

type Work = {
    title: string;
    description: string;
    company: string;
    date: string;
    variant: 'blue' | 'yellow' | 'green' | 'red' | 'purple';
    icons?: string[];
}

const works: Work[] = [
    {
        title: 'Consultant développeur Salesforce',
        company: 'Capgemini, NANTES',
        date: 'Avril 2022 - Aujourd’hui',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum nam lorem invidunt vel eros nostrud cillum cum dignissim kasd nisl non. Aliquyam nisl voluptate in at reprehenderit adipiscing. ',
        variant: 'blue'
    },
    {
        title: 'Étudiant à Epitech Nantes',
        company: 'Epitech, NANTES',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet assum labore proident zzril at lobortis, eos anim tincidunt sed vero mollit eirmod facilisis in mazim labore.',
        date: 'Septembre 2019 - Juillet 2024',
        variant: 'red'
    },
    {
        title: 'Administrateur réseau et systèmes',
        company: 'O.G.E.C Saint Aubin La Salle',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim sea eos duo erat lorem elitr. Aliquam sed nibh.',
        date: 'Août 2020 - Janvier 2021',
        variant: 'yellow',
    }
]

export default function Work() {
    return (
        <div className={"bg-[#F8F7F1] flex flex-col py-28 gap-20"}>
            <div className={"flex flex-row w-full"}>
                <Title className={"m-auto"}>Expérience</Title>
            </div>

            <Container className={"flex flex-col mx-auto"}>
                {works.map((work) => <WorkItem key={work.title} work={work}/>)}
            </Container>

        </div>
    )
}

function WorkItem({work}: { work: Work }) {

    const color = () => {
        if (work.variant === 'blue') {
            return 'bg-[#387369]';
        }
        if (work.variant === 'yellow') {
            return 'bg-[#EBC34C]';
        }
        if (work.variant === 'green') {
            return 'bg-[#2A6C72]';
        }
        if (work.variant === 'red') {
            return 'bg-[#EE6244]'
        }
    }

    return (
        <p className={"w-full group"}>
            <div className={"flex flex-row justify-between align-middle gap-12 group-hover:mb-12 transition-all"}>
                <div className={"flex-5/12 flex flex-col gap-2"}>
                    <Heading>{work.company}</Heading>
                    <Text className={"uppercase"}>{work.date}</Text>
                </div>
                <div className={"z-10"}>
                    <div className={`bg-[#F8F7F1] h-12 w-12 border-dashed rounded-full border-[#CCC] border-[2px] relative
                    before:absolute before:top-40px before:border-l-[2px] before:border-dotted before:border-l-[#CCC] before:content-[''] before:w-[2px] before:h-[200px] before:-translate-x-1/2 before:left-1/2 before:-z-10
                    `}>
                        <div className={`h-12 w-12 rounded-full -translate-x-0.5 -translate-y-0.5`}>
                            <div className={`${color()} w-6 h-6 m-auto mt-3 rounded-full`}></div>
                        </div>
                    </div>
                </div>
                <p className={"flex-5/12 flex flex-col gap-4 h-40"}>
                    <Heading>{work.title}</Heading>
                    <Text>{work.description}</Text>
                </p>
            </div>
        </p>
    )
}