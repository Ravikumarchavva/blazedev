import { contactSchema } from "@/models/schemas";
import {Resend} from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_ENV_KEY);

export const sendVerificationCode = async (email: string,token:string) => {
    const confirmationLink =   `${process.env.BASE_URL}/new-verification?token=${token}`;
    await resend.emails.send({
        from: 'developer@ravikumarchavva.com',
        to: email,
        subject: "Confirm your email",
        html: `<p>Click Here to<a href="${confirmationLink}">verify your mail. Valid for 5 minutes</a></p>`,
    });
}

export const sendPasswordResetMail = async (email: string, token: string) => {
    const resetLink =   `${process.env.BASE_URL}/new-password?token=${token}`;
    await resend.emails.send({
        from: 'developer@ravikumarchavva.com',
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">Here to reset your password. Valid for 5 minutes</a></p>`,
    });
}

export const contactMail = async (values:z.infer<typeof contactSchema>,email: string)=>{
    await resend.emails.send({
        from: 'developer@ravikumarchavva.com',
        to: process.env.ADMIN_MAIL || 'hello@ravikumarchavva.com',
        subject: values.subject,
        text: `Message from: ${values.name} <${email}>\n\n${values.message}`,
    });
}