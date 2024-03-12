import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/calendar.readonly openid",
        }
      }
    }),

  ],
  theme: {
    colorScheme: 'dark'
  },
  pages: {
    signIn: "/entrar"
  }
};
