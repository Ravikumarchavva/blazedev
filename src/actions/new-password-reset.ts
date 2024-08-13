"use server";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { changePasswordSchema } from "@/models/schemas";
import { z } from "zod";
import { db } from "@/lib/db";


export const passwordChange = async (token:string,values:z.infer<typeof changePasswordSchema>) =>{
    const existingToken = await getPasswordResetTokenByToken(token);
    // Step 1: Validate token
    if (!existingToken) {
        return {success:false ,message: "Token does not exit"}
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired){
        return {success:false ,message: "Token has expired"}
    }
    // Step 2: Validate password
    const validationResult = changePasswordSchema.safeParse(values);
    if (!validationResult.success) {
        return {success:false ,message: validationResult.error.message}
    }
    // Step 3: Update password
    const hashedPassword = await bcrypt.hash(values.password, 10);
    await db.user.update({
        where: {email: existingToken.email},
        data: {password: hashedPassword}
    })
    // Step 3: Delete token
    await db.passwordResetToken.delete({
        where: {token:existingToken.token}
    })
    return {success:true ,message: "Password Changed Successfully"}
}