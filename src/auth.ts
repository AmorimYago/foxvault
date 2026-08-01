import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prismaClient } from "@/lib/database";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaClient),

  providers: [Google],

  session: {
    strategy: "database",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      };
    },
  },
});