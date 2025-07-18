import {RefObject, useRef, useState} from "react";

type Feedback = {
    user: string;
    description: string;
    profile_picture: string;
    role: string;
}

const feedbacks: Feedback[] = [
    {
        user: 'Alice',
        description: 'The team was very supportive and helped me find a job that matched my skills and interests.',
        profile_picture: '/azure.png',
        role: 'Data Scientist'
    },
    {
        user: 'Bob',
        description: 'I had a great experience with the recruitment process, it was smooth and efficient.',
        profile_picture: '/github.png',
        role: 'Product Manager'
    },
    {
        user: 'Nicolas',
        description: 'I got a job that was in accordance with the salary and field of work. The process of submitting an application was quite cosy.',
        profile_picture: '/argocd.png',
        role: 'Software Engineer'
    },
    {
        user: 'Alice',
        description: 'The team was very supportive and helped me find a job that matched my skills and interests.',
        profile_picture: '/azure.png',
        role: 'Data Scientist'
    },
    {
        user: 'Bob',
        description: 'I had a great experience with the recruitment process, it was smooth and efficient.',
        profile_picture: '/github.png',
        role: 'Product Manager'
    }
]

export default function Feedbacks() {

    const [currentIndex, setIndex] = useState(0);

    return (
        <div className={"bg-[#F8F7F1] flex flex-col py-20 mx-auto justify-center gap-16"}>
            <div className={"flex flex-col w-full m-auto text-center gap-8"}>
                <h1 className={"text-[3em]"}>People talk about us</h1>
                <h2 className={""}>I got a job that was in accordance with the salary and dfield of work. The process of submitting an application was quite cosy</h2>
            </div>
            <div className={"flex flex-row gap-32 w-full"}>
                {feedbacks.map((feed, index) => <FeedbackItem key={feed.user} feed={feed} selected={index === currentIndex} />)}
            </div>
            <div className={"flex flex-row gap-2 justify-center"}>
                <div className={"bg-white rounded-full p-6 cursor-pointer"} onClick={() => setIndex((currentIndex + 1) % feedbacks.length)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="lightgray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-circle-arrow-left-icon lucide-circle-arrow-left">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m12 8-4 4 4 4"/>
                        <path d="M16 12H8"/>
                    </svg>
                </div>
                <div className={"bg-white rounded-full p-6 cursor-pointer"} onClick={() => setIndex((currentIndex - 1) % feedbacks.length)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#2A7069" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="lucide lucide-circle-arrow-right-icon lucide-circle-arrow-right">
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
        <div className={"w-[550px] bg-white relative rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]"}>
            <img width={64} height={64} className={"bg-[#F8F7F1] absolute left-1/2 -translate-x-1/2 -translate-y-[30px] shadow-xl rounded-full p-2"} src={feed.profile_picture} alt={feed.user}/>
            <div className={"mt-12 py-6 px-12 flex flex-col gap-4 text-center"}>
                <h3 className={"text-lg "}>{feed.description}</h3>
                <hr className={"border-[#F8F7F1] border-1"}/>
                <div className={"flex flex-col gap-1"}>
                    <p className={"text-primary font-bold text-xl"}>{feed.user}</p>
                    <p className={"text-gray-500 text-sm"}>{feed.role}</p>
                </div>
            </div>
        </div>
    )
}
