import nodemailer from 'nodemailer';


const nodemailerClientSingleton = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: true,
        host: process.env.SMTP_SERVER_HOST,
        auth: {
            user: process.env.SMTP_SERVER_USERNAME,
            pass: process.env.SMTP_SERVER_PASSWORD
        }
    });
}

declare const globalThis: {
    nodemailerGlobal: ReturnType<typeof nodemailerClientSingleton>;
} & typeof global;

const nodemailerClient = globalThis.nodemailerGlobal ?? nodemailerClientSingleton()

export default nodemailerClient

if (process.env.NODE_ENV !== 'production') globalThis.nodemailerGlobal = nodemailerClient