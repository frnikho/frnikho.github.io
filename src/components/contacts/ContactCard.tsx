'use client';
import Image from "next/image";

import {useTranslations} from "next-intl";
import {useState} from "react";

type ContactResult = {
    type: 'error' | 'success' | 'not-send';
    message: string;
}

type ContactForm = {
    lastname: string;
    firstname: string;
    email: string;
    company: string;
    message: string;
}

export default function ContactCard() {

    const t = useTranslations('Contact');
    const [contactResult, setContactResult] = useState<ContactResult>({type: 'not-send', message: ''});
    const [form, setForm] = useState<ContactForm>({company: '', email: '', firstname: '', lastname: '', message: ''});
    const [loading, setLoading] = useState(false);

    const sendForm = () => {
        setLoading(true);
        fetch('/contact', {method: 'POST', body: JSON.stringify(form)}).then(((r) => {
            if (r.status !== 200) {
                return setContactError();
            }
            setContactResult({type: 'success', message: '👍 Votre message a bien été envoyé !'});
            setForm({lastname: '', message: '', email: '', firstname: '', company: ''});
        })).catch(setContactError).finally(() => setLoading(false));
    }

    const setContactError = () => setContactResult({type: 'error', message: '❌ Une erreur est survenue, veuillez réessayer plus tard.'});

    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text rounded-3xl"}>{t('title')}</h1>
            <div className={"flex flex-row bg-card-background p-6 rounded-2xl gap-8"}>
                <div className={"w-full lg:w-8/12 flex flex-col gap-2 z-20"}>
                    <h2 className={"text-2xl font-semibold text-primary-text"}>{t('subtitle')}</h2>
                    <p className={"text-primary-text"}>{t('message')}</p>
                    <ContactResult {...contactResult} />
                    <div className={"mt-2 grid grid-cols-2 gap-3"}>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-50 outline-none"}
                               type={'text'}
                               placeholder={t('form.lastname')} value={form.lastname} onChange={(e) => setForm({...form, lastname: e.currentTarget.value})}/>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-50 outline-none"} type={'text'}
                               placeholder={t('form.firstname')} value={form.firstname} onChange={(e) => setForm({...form, firstname: e.currentTarget.value})}/>
                        <input required className={"w-full p-3 rounded-xl bg-input focus:opacity-50 outline-none col-span-2"}
                               type={'email'}
                               placeholder={t('form.email')} value={form.email} onChange={(e) => setForm({...form, email: e.currentTarget.value})}/>
                        <input className={"w-full p-3 rounded-xl bg-input focus:opacity-50 outline-none col-span-2"} type={'text'}
                               placeholder={t('form.company')} value={form.company} onChange={(e) => setForm({...form, company: e.currentTarget.value})}/>
                        <textarea required
                                  className={"resize-none w-full p-3 rounded-xl bg-input focus:opacity-50 outline-none col-span-2"}
                                  rows={5} placeholder={t('form.message')} value={form.message} onChange={(e) => setForm({...form, message: e.currentTarget.value})}/>
                    </div>
                    <div className={"self-center relative w-full"}>
                        <button disabled={loading} className={'h-16 disabled:cursor-default bg-red-pastel w-full py-4 rounded-2xl text-white font-medium text-lg cursor-pointer active:translate-y-1'} onClick={sendForm}>
                            {loading ? <span className="loader"></span> : t('send-btn')}
                        </button>
                        <p className={"absolute bg-[#d96961] w-full mt-2 h-full rounded-2xl top-0 left-0 -z-20"}></p>
                    </div>
                </div>
                <div className={"lg:w-4/12 hidden lg:flex flex-col relative overflow-hidden rounded-2xl"}>
                    <Image className={"rounded-2xl object-cover hover:scale-125 hover:blur-md transition-all"}
                           src={'/coffee-and-laptop.jpg'}
                           alt={''} width={1080} height={0} quality={100} style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
        </div>
    )
}

function ContactResult (result: ContactResult) {
    if (result.type === 'not-send') {
        return <div className={'h-10 my-2 p-2'}></div>
    }
    return (
        <div className={`h-10 my-2 p-2 rounded-lg ${result.type === 'error' ? 'bg-[#FEF2F2] text-[#992560]' : 'bg-[#F0FDF4] text-[#406734]'}`}>
            <p>{result.message}</p>
        </div>
    )
}