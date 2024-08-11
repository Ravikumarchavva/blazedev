import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./models/schemas";
import { getUserByEmail } from "./data/findUser";
import { compare } from "bcryptjs";
export default {
    providers: [GitHub,
        Credentials({
            async authorize(credentials) {
                const validatedFields = await loginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail({ email });
                    if (!user || !user.password) {
                        return null;
                    }
                    if (user && await compare(password, user.password)) {
                        return user;
                    }
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig