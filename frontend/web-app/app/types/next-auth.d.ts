import NextAuth, { type DefaultSession } from "next-auth"
import {JWT} from 'next-auth/jwt'
 
declare module "next-auth" {
  interface Session {
    user: {
      username: string
    } & DefaultSession["user"]
  };

  interface Profile {
    username: string;
  };
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string;
    }
}
 
export const { auth, handlers } = NextAuth({
  callbacks: {
    session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          address: user.address,
        },
      }
    },
  },
})