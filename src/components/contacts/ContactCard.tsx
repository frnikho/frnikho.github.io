'use client';
import Image from "next/image";

import {useTranslations} from "next-intl";
import {HTMLInputTypeAttribute, useCallback, useMemo, useState} from "react";
import {useAptabase} from "@aptabase/react";

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
    const { trackEvent } = useAptabase();

    const check = useMemo((): boolean => {
        if (form.firstname.length <= 1 || form.lastname.length <= 1 || form.message.length <= 5)
            return false;
        const rg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        return rg.test(form.email);
    }, [form]);

    const sendForm = useCallback(() => {
        if (loading || !check)
            return;
        setLoading(true);
        trackEvent('send_contact_form');
        fetch('/contact', {method: 'POST', body: JSON.stringify(form)}).then(((r) => {
            if (r.status !== 200) {
                return setContactError();
            }
            setContactResult({type: 'success', message: '👍 Votre message a bien été envoyé !'});
            setForm({lastname: '', message: '', email: '', firstname: '', company: ''});
        })).catch(setContactError).finally(() => setLoading(false));
    }, [check, loading]);
    const setContactError = () => setContactResult({type: 'error', message: '❌ Une erreur est survenue, veuillez réessayer plus tard.'});

    return (
        <div className={"flex flex-col gap-10"}>
            <h1 className={"text-4xl font-semibold text-primary-text dark:text-primary-text-dark rounded-3xl"}>{t('title')}</h1>
            <div className={"flex flex-row bg-card-background dark:bg-dark-card-background p-6 rounded-2xl gap-8"}>
                <div className={"w-full lg:w-8/12 flex flex-col gap-2 z-20"}>
                    <h2 className={"text-2xl font-semibold text-primary-text dark:text-primary-text-dark"}>{t('subtitle')}</h2>
                    <p className={"text-primary-text dark:text-primary-text-dark"}>{t('message')}</p>
                    <ContactResult {...contactResult} />
                    <div className={"mt-2 grid grid-cols-2 gap-3"}>
                        <Input type={'text'} size={'1'} value={form.lastname} onChange={(e) => setForm({...form, lastname: e})} placeholder={t('form.lastname')}/>
                        <Input type={'text'} size={'1'} value={form.firstname} onChange={(e) => setForm({...form, firstname: e})} placeholder={t('form.firstname')}/>
                        <Input type={'email'} size={'1'} value={form.email} onChange={(e) => setForm({...form, email: e})} placeholder={t('form.email')}/>
                        <Input type={'text'} size={'1'} value={form.company} onChange={(e) => setForm({...form, company: e})} placeholder={t('form.company')}/>
                        <textarea required
                                  className={"resize-none w-full p-3 rounded-xl bg-input dark:bg-dark-input text-primary-text dark:text-primary-text-dark focus:opacity-50 outline-none col-span-2"}
                                  rows={5} placeholder={t('form.message')} value={form.message} onChange={(e) => setForm({...form, message: e.currentTarget.value})}/>
                    </div>
                    <div className={"self-center relative w-full"}>
                        <div className={`text-center h-16 ${loading || !check ? 'cursor-default opacity-100 text-white text-opacity-50' : 'text-white cursor-pointer active:translate-y-1'} bg-red-pastel w-full py-4 rounded-2xl font-medium text-lg`} onClick={sendForm}>
                            {loading ? <span className="loader"></span> : t('send-btn')}
                        </div>
                        <div className={`${loading || !check ? 'opacity-70' : ''} absolute bg-[#d96961] w-full mt-2 h-full rounded-2xl top-0 left-0 -z-20`}></div>
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

type InputProps = {
    type: HTMLInputTypeAttribute,
    value: string,
    onChange: (value: string) => void,
    error?: string,
    size?: '1' | '2',
    placeholder: string,
};

function Input({type, value, onChange, error, size = '1', placeholder}: InputProps) {
    return (
        <>
            <input placeholder={placeholder} className={`w-full p-3 rounded-xl bg-input dark:bg-dark-input text-primary-text dark:text-primary-text-dark focus:opacity-50 outline-none col-span-${size}`} type={type} value={value} onChange={(e) => onChange(e.currentTarget.value)}/>
            {error ? <p>{error}</p> : null}
        </>
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