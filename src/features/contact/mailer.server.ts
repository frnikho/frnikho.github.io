import nodemailer from "nodemailer";
import {
	type ContactData,
	PROJECT_TYPE_LABELS,
} from "@/features/contact/validation";

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) throw new Error(`Variable d'environnement manquante : ${name}`);
	return value;
}

export async function sendContactEmail(data: ContactData): Promise<void> {
	const user = requireEnv("SMTP_USER");
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST ?? "smtp.gmail.com",
		port: Number(process.env.SMTP_PORT ?? 465),
		secure: true,
		auth: { user, pass: requireEnv("SMTP_PASS") },
	});

	await transporter.sendMail({
		from: `"nikho.dev" <${user}>`,
		to: process.env.CONTACT_TO ?? user,
		replyTo: { name: data.name, address: data.email },
		subject: `[nikho.dev] ${PROJECT_TYPE_LABELS[data.projectType]} - ${data.name}`,
		text: [
			`Nom : ${data.name}`,
			`Email : ${data.email}`,
			`Type : ${PROJECT_TYPE_LABELS[data.projectType]}`,
			"",
			data.message,
		].join("\n"),
	});
}
