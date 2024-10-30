import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1,{message: "Name is Required"}),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string(),
}).refine((data) => (data.password === data.confirmPassword ? { message: "passwords doesn't match" } : "" ));

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1,{message: "Password is required"}),
});

export const resetSchema = z.object({
    email: z.string().email()
})

export const changePasswordSchema = z.object({
    password: z.string().min(6).max(20),
    confirmPassword: z.string(),
}).refine((data)=>(data.password === data.confirmPassword ? {message: "passwords doesn't match"} : ""));

export const settingsSchema = z.object({
    name: z.string().min(1,{message: "Name is Required"}),
    email: z.string().email(),
    bio: z.optional(z.string())
});

export const contactSchema = z.object({
    name: z.string().min(1,{message: "Name is Required"}),
    subject: z.string().min(1,{message: "Subject is Required"}),
    message: z.string().min(10,{message: "Enter atleast 10 characters"}),
})

export const taskSchema = z.object({
    id: z.number().min(1,{message: "ID is Required"}),
    title: z.string().min(1,{message: "Title is Required"}),
    lead: z.string().min(1,{message: "Lead is Required"}),
    description: z.string(),
    status: z.string().min(1,{message: "Status is Required"}),
});