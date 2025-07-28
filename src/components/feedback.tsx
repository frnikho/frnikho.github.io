import {useEffect, useRef, useState} from "react";
import {Button, Container, Title} from "@/components/lib/title";
import {useIsMobile} from "@/hooks/use-is-mobile";
import { motion } from "motion/react";

type Feedback = {
    user: string;
    description: string;
    profile_picture: string;
    role: string;
}

const feedbacks: Feedback[] = [
    {
        user: 'Theo F',
        description: 'J\'ai eu la chance de faire de nombreux projets durant ma scolarité à Epitech Nantes avec Nicolas Sans et c\'est un excellent élément. Travailleur et disposant d\'une expérience dans de nombreux domaines Nicolas ne vous décevra pas !',
        profile_picture: '/users/tf.jpeg',
        role: 'Fullstack Developer'
    },
    {
        user: 'Pierre D',
        description: 'Nous travaillons avec Nicolas depuis plusieurs mois et son travail est irréprochable, soigné et toujours orienté utilisateur. Ses conseils ont rendu notre site plus clair et attractif. Nous le recommandons vivement pour tout projet web',
        profile_picture: '/users/pd.jpeg',
        role: 'Co-founder of Everyloc'
    },
    {
        user: 'Victor S',
        description: 'Rigoureux, motivé et très talentueux. C\'est un plaisir de travailler avec lui.',
        profile_picture: '/users/vs.jpeg',
        role: 'Fullstack Developer'
    },
    {
        user: 'Antoine H',
        description: 'Nicolas s’est montré très attentif et toujours investi, même face à nos changements de dernière minute. Flexibleet  à l’écoute il s’adapte parfaitement aux besoins. La qualité de son travail reflète son sérieux. Je le recommande sans hésitation',
        profile_picture: '/users/ah.jpeg',
        role: 'Co-founder of Everyloc'
    },
/*    {
        user: 'Justin M',
        description: 'BLABLABLA',
        profile_picture: '/users/jm.jpeg',
        role: 'Backend Developer'
    },*/
    {
        user: 'Denis S',
        description: 'Que ce soit dans son approche aux défis ou dans les travaux qu\'il réalise, Nicolas présente un réel sens du besoin client, des attentions affinées et une technique maîtrisée qui traduisent des productions robustes et sans accros. Ayant travaillé avec lui par le passé, il propose des solutions sur-mesures et m’a accompagné tout au long de mes besoins. Je le recommande fortement.',
        profile_picture: '/users/ds.jpg',
        role: 'Designer Graphique',
    }
]

const VISIBLE_COUNT = 3;

export default function Feedbacks() {
    // Clone last and first items for infinite effect
    const extendedFeedbacks = [
        ...feedbacks.slice(-VISIBLE_COUNT),
        ...feedbacks,
        ...feedbacks.slice(0, VISIBLE_COUNT)
    ];

    const [currentIndex, setIndex] = useState(VISIBLE_COUNT);
    const [isAnimating, setIsAnimating] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const handleNext = () => {
        if (currentIndex > feedbacks.length + 1) {
            return;
        }
        setIsAnimating(true);
        setIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        setIsAnimating(true);
        setIndex((prev) => prev - 1);
    };

    // Handle the jump after animation ends
    const handleTransitionEnd = () => {

        if (currentIndex > feedbacks.length) {
            setIsAnimating(false);
            setIndex(1);
        } else if (currentIndex <= 0) {
            setIsAnimating(false);
            setIndex(feedbacks.length);
        }

        /*if (currentIndex === extendedFeedbacks.length - VISIBLE_COUNT) {
            setIndex(VISIBLE_COUNT);
        } else if (currentIndex === 0) {
            setIndex(extendedFeedbacks.length - 2 * VISIBLE_COUNT);
        }*/
    };

    // Calculate translateX
    const translateX = `-${(currentIndex * (100 / (isMobile ? 1 : VISIBLE_COUNT)))}%`;

    return (
        <motion.div className={"bg-[#F8F7F1] flex flex-col py-20 mx-auto justify-center gap-0 feedback"}>
            <motion.div initial={{ opacity: 0 }} animate={{opacity: 1}} viewport={{ amount: 0.9, once: true }}>
                <Container className={"flex flex-col m-auto text-center gap-8 mb-10"}>
                    <Title>Recommandations</Title>
                    <h2>Chaque collaboration m’a permis d’apprendre, d’évoluer et de recevoir des retours précieux de la part de ceux avec qui j’ai travaillé.</h2>
                </Container>
            </motion.div>
            <motion.div className="overflow-hidden w-full" initial={{ opacity: 0 }} animate={{opacity: 1}}  viewport={{ amount: 0.7, once: true }}>
                <div
                    ref={containerRef}
                    className={`flex ${isAnimating ? "transition-transform duration-300" : ""}`}
                    style={{ transform: `translateX(${translateX})` }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedFeedbacks.map((feed, index) => (
                        <div key={feed.user + index} className={`${isAnimating ? 'transition-transform duration-300' : ''} w-full lg:w-1/3 flex-shrink-0 self-center lg:py-12 ${index === (currentIndex + 1) ? "-translate-y-[40px]" : "translate-y-0"}`}>
                            <FeedbackItem feed={feed}/>
                        </div>
                    ))}
                </div>
            </motion.div>
            <div className={"flex flex-row gap-4 lg:gap-2 justify-center"}>
                <Button className={"bg-white rounded-full p-4 lg:p-6 cursor-pointer"} onClick={handlePrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="lightgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-circle-arrow-left-icon lucide-circle-arrow-left">
                        <title>left-arrow</title>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m12 8-4 4 4 4"/>
                        <path d="M16 12H8"/>
                    </svg>
                </Button>
                <Button className={"bg-white rounded-full p-4 lg:p-6 cursor-pointer"} onClick={handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#2A7069" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-circle-arrow-right-icon lucide-circle-arrow-right">
                        <title>right-arrow</title>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m12 16 4-4-4-4"/>
                        <path d="M8 12h8"/>
                    </svg>
                </Button>
            </div>
        </motion.div>
    );
}

function FeedbackItem({feed}: {feed: Feedback}) {
    return (
        <div className={`m-8 flex-1/3 bg-white relative rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]`}>
            <img width={64} height={128} className={"bg-[#F8F7F1] absolute left-1/2 -translate-x-1/2 -translate-y-[30px] shadow-xl rounded-full p-2"} src={feed.profile_picture} alt={feed.user}/>
            <div className={"pt-12 pb-4 px-12 flex flex-col gap-4 text-center justify-between h-full"}>
                <h3 className={"text-md  align-middle content-center min-h-24 font-nunito"}>{feed.description}</h3>
                <div className={"flex flex-col gap-2"}>
                    <hr className={"border-[#F8F7F1] border-1"}/>
                    <div className={"flex flex-col gap-1"}>
                        <p className={"text-primary font-bold text-xl"}>{feed.user}</p>
                        <p className={"text-gray-500 text-sm"}>{feed.role}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}