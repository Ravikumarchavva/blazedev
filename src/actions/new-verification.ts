"use server";

import { getUserByEmail } from "@/data/findUser";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const verification = async (token:string) =>{
    const existingToken = await getVerificationTokenByToken(token);
    // Step 1: Validate token
    if (!existingToken) {
        return {success:false ,message: "Token does not exit"}
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired){
        return {success:false ,message: "Token has expired"}
    }
    const existingUser = await getUserByEmail(existingToken.email);
    // Step 2: Update user's verified status
    if(existingUser){
        await db.user.update({
            where: { id: existingUser.id },
            data: { emailVerified: new Date(),
                email: existingToken.email, //for email updation
             }
        });
        // Step 3: Delete the verification token
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        });
        // Step 4: Return success message
        return {success:true,message: "User has been verified"}
    }
    return {success:false ,message: "User not found"}    
}