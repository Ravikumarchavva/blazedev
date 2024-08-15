"use server";
import { getUserByEmail } from "@/data/findUser";
import { db } from "@/lib/db";
import { sendVerificationCode } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { signUpSchema } from "@/models/schemas";
import { hash } from "bcryptjs";

export const credentialSignUp = async (values: any) => {
  const validateFields = await signUpSchema.safeParse(values);
  if (!validateFields.success) {
    return { success: false, message: validateFields.error.message };
  }
  const { name, email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if (user) return { success: false, message: "User already exists" };

  const hashPassword = await hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    }
  });

  const verificationToken = await generateVerificationToken(email);
  // Send email with verificationToken...
  await sendVerificationCode(verificationToken.email,verificationToken.token);
  return {
    success: true,
    message: "Confirmation token sent",
  }
};
