"use client";

interface IClockContent {
  time: Date;
}

export default function ClockContent({ time }: IClockContent) {
  return (
    <div className="absolute z-10 text-white">
      <div className="flex flex-col justify-center align-middle self-center text-center w-full">
        <div className="text-7xl font-light tracking-widest text-shadow-lg shadow-[#FFFFFF80]">
          O'Clock
        </div>
        <div className="flex flex-col justify-center items-center font-regular mt-4 px-3 tracking-wider">
          <div className="text-2xl w-full text-center">
            {time?.toLocaleTimeString()}
          </div>
          <div className="text-sm w-full text-center font-light">
            {time?.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
