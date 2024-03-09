import { useState } from "react";
import { twMerge } from "tailwind-merge";

import HeroIcon, { IHeroIcon } from "../general/hero-icon";

export interface IMenuButton {
  icon: IHeroIcon["icon"];
  onClick: () => void;
}

export default function MenuButton({ icon, onClick }: IMenuButton) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <button
      className="flex flex-col relative p-3"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HeroIcon
        icon={icon}
        className={twMerge(
          "absolute transition-all duration-300 self-center",
          isHovered ? "w-6 h-6" : "w-5 h-5"
        )}
      />
      <div
        className={twMerge(
          "absolute -bottom-5 w-4 h-[2px] mt-2 rounded-2xl self-center",
          "bg-white/80 transition-opacity duration-300 shadow-md shadow-white",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}
