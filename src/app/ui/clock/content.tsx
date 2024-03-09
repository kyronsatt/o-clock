"use client";

interface IClockContent {
  time: Date;
}

export default function ClockContent({ time }: IClockContent) {
  return (
    <div className="absolute z-10 mt-8">
      <div className="flex flex-col justify-center align-middle self-center text-center w-full text-white">
        <div className="text-6xl font-thin tracking-widest text-shadow-xl shadow-[#FFFFFF60]">
          O'Clock
        </div>
        <div className="flex flex-col justify-center items-center font-light mt-2 px-3 tracking-wider opacity-80">
          <div className="text-xl w-full text-center">
            {time?.toLocaleTimeString()}
          </div>
          <div className="text-xs w-full text-center font-extralight">
            {time?.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
