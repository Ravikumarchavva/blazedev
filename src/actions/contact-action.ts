"use server";

import { getUserByEmail } from "@/data/findUser";
import { contactMail } from "@/lib/mail";
import { contactSchema } from "@/models/schemas";
import { z } from "zod";

export const contactMessage = async (values:z.infer<typeof contactSchema>,email:string)=>{
    const validatedFields = contactSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success:false, message: "Enter all fields" };
    }
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email){
        return { success: false, message: "Login to send message" };
    };
    try{
        await contactMail(validatedFields.data,existingUser.email);
        return { success: true, message: "Message sent successfully" };
    }
    catch(error){
        return { success: false, message: "Failed to send message" };
    };
}