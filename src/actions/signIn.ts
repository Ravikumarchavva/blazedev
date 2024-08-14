"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/findUser";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { sendVerificationCode } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { loginSchema } from "@/models/schemas";
import { AuthError } from "next-auth";

export const credentialLogin = async (values : any) => {
  const validatedFields = await loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.message };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, message: "Invalid Credentials" };   
  }
  if (!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email);
    if(verificationToken){
      await sendVerificationCode(verificationToken.email,verificationToken.token)
    }
    return { success: false, message: "Email not verified.Check spam mails too" };
  }
  try{
  const result = await signIn("credentials",{
    email,
    password,
    redirect: false,
  })
  if(result){
    const verificationToken = await getVerificationTokenByEmail(email);
    if(verificationToken){
      await sendVerificationCode(verificationToken.email,verificationToken.token)
    }
  }
  
    if (result?.error) {
      return { success: false, message: result.error };
    }
    return { success: true };
  } catch (error ) {
    if(error instanceof AuthError) {
      switch(error.type){
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
           
      }
    }
    return { success: false, message: (error as any).cause || "An unexpected error occurred" };
  }
};
