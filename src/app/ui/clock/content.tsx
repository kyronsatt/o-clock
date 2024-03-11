"use client";

import { formatDate } from "@/app/dayjs";

import Menu from "../menu";

interface IClockContent {
  time: Date;
}

export default function ClockContent({ time }: IClockContent) {
  return (
    <div className="absolute z-[400] pt-24">
      <div className="flex flex-col justify-center align-middle self-center text-center w-full text-white">
        <div className="text-6xl font-thin tracking-widest text-shadow-xl shadow-[#FFFFFF60]">
          O&apos;Clock
        </div>
        <div className="flex flex-col justify-center items-center font-light mt-2 px-3 tracking-wider opacity-80">
          <div className="text-xl w-full font-medium text-center">
            {time?.toLocaleTimeString()}
          </div>
          <div className="text-[11px] w-full text-center font-extralight capitalize">
            {formatDate(time, "ddd, D MMM")}
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}
