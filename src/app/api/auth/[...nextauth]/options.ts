import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/calendar openid",
        },
      },
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
  pages: {
    signIn: "/entrar",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
  },
};
