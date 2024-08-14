"use server";

import { getUserByEmail } from "@/data/findUser";
import { contactMail } from "@/lib/mail";
import { contactSchema } from "@/models/schemas";
import { z } from "zod";

export const contactMessage = async (values:z.infer<typeof contactSchema>)=>{
    const validatedFields = contactSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success:false, message: "Enter all fields" };
    }
    const existingUser = await getUserByEmail(values.email);
    if (!existingUser){
        return { success: false, message: "Login to send message" };
    };
    try{
        await contactMail(validatedFields.data);
        return { success: true, message: "Message sent successfully" };
    }
    catch(error){
        return { success: false, message: "Failed to send message" };
    };
}