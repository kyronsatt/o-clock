import React from "react";
import { twMerge } from "tailwind-merge";

import HeroIcon from "../general/hero-icon";

export interface IModal {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ children, open, setOpen }: IModal) {
  return (
    <div
      className={twMerge(
        open ? "visible" : "invisible",
        "transition-all duration-100",
        "z-[500] fixed bottom-0 left-0 w-screen h-full px-16 py-8 bg-black/5 backdrop-blur-sm flex justify-center items-center"
      )}
    >
      <div className="w-fit max-h-1/2 overflow-y-auto rounded-2xl shadow-xl bg-white p-6">
        <div className="w-full flex justify-end">
          <a onClick={() => setOpen(false)}>
            <HeroIcon
              icon="XMarkIcon"
              className="w-6 h-6 justify-self-end text-dark cursor-pointer hover:bg-black/10 rounded-full p-1"
            />
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
