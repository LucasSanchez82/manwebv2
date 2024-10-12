
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Github],
  session: {strategy: "jwt"},
  callbacks: {
    async session({session, token}) {
      if(session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    }
  }
})