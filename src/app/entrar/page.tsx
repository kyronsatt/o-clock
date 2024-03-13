"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen items-center justify-center p-24 bg-white">
      <div className="flex flex-col items-center justify-center h-full aspect-square rounded-full border-4 border-dark bg-transparent">
        <div className="text-6xl font-thin tracking-widest text-shadow-xl shadow-[#FFFFFF60]">
          O&apos;Clock
        </div>
        <button
          className="flex items-center justify-between gap-2 mt-6 px-4 py-2 rounded-3xl bg-gradient-to-r from-[#FF3D3D] to-[#FF862E] font-light text-white"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image
            src={"/google-logo.png"}
            alt="google-logo"
            width={20}
            height={20}
          />
          Entrar com o Google
        </button>
      </div>
    </main>
  );
}
