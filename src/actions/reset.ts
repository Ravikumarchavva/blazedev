"use server";
import z from "zod";
import { resetSchema } from "@/models/schemas";
import { getUserByEmail } from "@/data/findUser";
import { sendPasswordResetMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
export const Reset = async (values: z.infer<typeof resetSchema>)=>{
    const validatedFields = resetSchema.safeParse(values);
    if (!validatedFields.success) {
        return {error:"Invalid input"};
    }
    const existingUser = await getUserByEmail(values.email);
    if(existingUser){

        if (existingUser.email) {
            const passwordResetToken = await generatePasswordResetToken(existingUser.email); // Assume generateResetToken is a function that generates a unique token for the user
            await sendPasswordResetMail(passwordResetToken.email,passwordResetToken.token);
            return {success:"Reset email sent!"}
        }
    }
    // Send reset email to user
    return {error:"User not found"};
}