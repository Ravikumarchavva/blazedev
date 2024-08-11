"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/findUser";
import { loginSchema } from "@/models/schemas";
import { AuthError } from "next-auth";

export const credentialLogin = async (values : any) => {
  const validateFields = await loginSchema.safeParse(values);
  if (!validateFields.success) {
    return { success: false, message: validateFields.error.message };
  }
  const { email, password } = validateFields.data;
  const user = await getUserByEmail({email});
  if (!user) {
    return { success: false, message: "User not found" };
  }
  try{
  const result = await signIn("credentials",{
    email,
    password,
    redirect: false,
  })
  
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
