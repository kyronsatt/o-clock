import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import AuthProvider from "./context/auth-provider";

import "./globals.css";

const quicksandFont = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "O'Clock",
  description:
    "A minimalist, intuitive and elegant way to manage your daily tasks using a beautifully-designed clock view.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={quicksandFont.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
