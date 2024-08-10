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