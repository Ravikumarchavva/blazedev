import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
 
const prisma = new PrismaClient()
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({token,session}){
      if (session.user && token.sub){
        session.user.id = token.sub;
      }
      console.log({sessionToken : token,session:session});
      return session;
    },
    async jwt({token,user}) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
})