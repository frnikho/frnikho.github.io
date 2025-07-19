import {useState} from "react";
import {Title} from "@/components/lib/title";

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
        description: 'blabla',
        profile_picture: '/users/ah.jpeg',
        role: 'Co-founder of Everyloc'
    },
    {
        user: 'Bob b',
        description: 'I had a great experience with the recruitment process, it was smooth and efficient.',
        profile_picture: '/github.png',
        role: 'Product Manager'
    }
]

export default function Feedbacks() {

    const [currentIndex, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % feedbacks.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
    };

    const visibleFeedbacks = [
        feedbacks[(currentIndex) % feedbacks.length],
        feedbacks[(currentIndex + 1) % feedbacks.length],
        feedbacks[(currentIndex + 2) % feedbacks.length],
    ];

    return (
        <div className={"bg-[#F8F7F1] flex flex-col py-20 mx-auto justify-center gap-16"}>
            <div className={"flex flex-col w-full m-auto text-center gap-8 mb-20"}>
                <Title>Recommandations</Title>
                <h2 className={""}>Chaque collaboration m’a permis d’apprendre, d’évoluer et de recevoir des retours précieux de la part de ceux avec qui j’ai travaillé.</h2>
            </div>
            <div className={"3xl:w-8/12 mx-auto w-10/12 flex flex-row gap-16 scroll-auto transition-transform duration-500"}>
                {visibleFeedbacks.map((feed, index) => <FeedbackItem key={feed.user} feed={feed} selected={index === 1} />)}
            </div>
            <div className={"flex flex-row gap-2 justify-center"}>
                <div className={"bg-white rounded-full p-6 cursor-pointer"} onClick={handlePrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="lightgray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-circle-arrow-left-icon lucide-circle-arrow-left">
                        <title>left-arrow</title>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m12 8-4 4 4 4"/>
                        <path d="M16 12H8"/>
                    </svg>
                </div>
                <div className={"bg-white rounded-full p-6 cursor-pointer"} onClick={handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#2A7069" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-circle-arrow-right-icon lucide-circle-arrow-right">
                        <title>right-arrow</title>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m12 16 4-4-4-4"/>
                        <path d="M8 12h8"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

function FeedbackItem({feed, selected}: {feed: Feedback, selected: boolean}) {
    return (
        <div className={`flex-1/3 bg-white relative rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${selected ? '-translate-y-[50px]' : '-translate-y-0'} `}>
            <img width={64} height={64} className={"bg-[#F8F7F1] absolute left-1/2 -translate-x-1/2 -translate-y-[30px] shadow-xl rounded-full p-2"} src={feed.profile_picture} alt={feed.user}/>
            <div className={"mt-6 py-6 px-12 flex flex-col gap-4 text-center justify-start"}>
                <h3 className={"text-md h-[120px] align-middle content-center"}>{feed.description}</h3>
                <hr className={"border-[#F8F7F1] border-1"}/>
                <div className={"flex flex-col gap-1"}>
                    <p className={"text-primary font-bold text-xl"}>{feed.user}</p>
                    <p className={"text-gray-500 text-sm"}>{feed.role}</p>
                </div>
            </div>
        </div>
    )
}
