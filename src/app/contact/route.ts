import {NextRequest, NextResponse} from 'next/server'
import nodemailerClient from "@/libs/mail";

type ContactForm = {
    lastname: string;
    firstname: string;
    email: string;
    company: string;
    message: string;
}

export async function POST(req: NextRequest) {
    const form: ContactForm = await req.json();
    const client = nodemailerClient;
    return client.verify().then(() => {
        client.sendMail({
            from: form.email,
            to: 'nicolas.sansd@gmail.com',
            subject: 'Contact form',
            text: JSON.stringify(form),
        });
        return NextResponse.json({});
    }).catch((err) => {
        console.log(err);
        throw new Error('Error occurred !')
    })
}