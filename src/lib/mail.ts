import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_ENV_KEY);

export const sendVerificationCode = async (email: string,token:string) => {
    const confirmationLink =   `http://localhost:3000/new-verification?token=${token}`;
    await resend.emails.send({
        from: 'developer@ravikumarchavva.com',
        to: email,
        subject: "Confirm your email",
        html: `<p>Click Here to<a href="${confirmationLink}">verify your mail. Valid for 5 minutes</a></p>`,
    });
}

export const sendPasswordResetMail = async (email: string, token: string) => {
    const resetLink =   `http://localhost:3000/new-password?token=${token}`;
    await resend.emails.send({
        from: 'developer@ravikumarchavva.com',
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">Here to reset your password. Valid for 5 minutes</a></p>`,
    });
}