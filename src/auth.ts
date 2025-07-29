import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Role } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/findUser";
import { db } from "./lib/db";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (user.id) {
        const existingUser = await getUserById(user.id);
        if (existingUser && existingUser.emailVerified) {
          return true;
        }
      }

      return false;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as Role;
        session.user.name = token.name;
        session.user.bio = token.bio as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (existingUser) {
        token.name = existingUser.name;
        token.bio = existingUser.bio;
        token.role = existingUser.role;
        return token;
      }
      return token;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
