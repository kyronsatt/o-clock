"use client";

interface IClockContent {
  time: Date;
}

export default function ClockContent({ time }: IClockContent) {
  return (
    <div className="absolute z-10 text-dark">
      <div className="flex flex-col justify-center align-middle self-center text-center w-full">
        <div className="text-7xl font-light">O'Clock</div>
        <div className="font-light mt-4">
          <div className="text-2xl w-full text-center">
            {time?.toLocaleTimeString()}
          </div>
          <div className="text-xs w-full text-center">
            {time?.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
