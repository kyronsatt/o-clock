"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DynamicBackground from "./ui/dynamic-background";
import { twMerge } from "tailwind-merge";

interface IClockPointerLocationClassNames {
  bottom: string;
  left: string;
  rotate: string;
}

export default function ClockPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [primaryColor, setPrimaryColor] = useState<string>();
  const [clockPointerLocationClassNames, setClockPointerLocationClassNames] =
    useState<IClockPointerLocationClassNames>({
      bottom: "",
      left: "",
      rotate: "",
    });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const test = currentTime;
      test?.setHours(currentTime.getHours() + 1);

      // const currentTime = new Date();
      setCurrentTime(test);
      const primaryColor = getPrimaryColor(test);
      setPrimaryColor(primaryColor);

      const { bottom, left, rotate } =
        getClockPointerPositionClassNames(currentTime);

      setClockPointerLocationClassNames({
        bottom,
        left,
        rotate,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Run effect only once on component mount

  const getClockPointerPositionClassNames = (
    time: Date
  ): IClockPointerLocationClassNames => {
    // Extract hours and minutes from the current date and time
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // Calculate total minutes elapsed since 0h
    const totalMinutes = hours * 60 + minutes;

    // Calculate the angle based on the total minutes elapsed
    const angle = (totalMinutes / 1440) * 360; // Total minutes in a day = 1440

    // Calculate x and y coordinates using trigonometry
    const radius = 50; // Assuming the clock radius is 50 units
    const centerX = 50; // Assuming the center of the clock is at (50, 50)
    const centerY = 50;

    const radians = angle * (Math.PI / 180);

    const x = centerX + radius * Math.sin(radians);
    const y = centerY + radius * Math.cos(radians);

    // Convert x and y coordinates to percentages
    let xPercentage = (1 - x / (2 * radius)) * 100;
    let yPercentage = (1 - y / (2 * radius)) * 100;

    if (angle <= 90 || angle >= 340) {
      xPercentage -= 1.5;
      yPercentage -= 1.5;
    } else if (angle <= 130) {
      xPercentage -= 2;
      yPercentage -= 2.5;
    } else if (angle <= 280) {
      xPercentage -= 1.8;
      yPercentage -= 1.5;
    } else {
      xPercentage -= 2;
      yPercentage -= 2;
    }

    const rotationDegrees = angle - 90;

    const bottomPositionInPercentualString = `${yPercentage}%`;
    const leftPositionInPercentualString = `${xPercentage}%`;
    const rotationInDegreesString = `${rotationDegrees}deg`;

    return {
      bottom: bottomPositionInPercentualString,
      left: leftPositionInPercentualString,
      rotate: rotationInDegreesString,
    };
  };

  const getPrimaryColor = (currentTime: Date) => {
    const hours = currentTime?.getHours();
    if (hours >= 18 || hours < 5) {
      return "#FFFFFF";
    } else {
      return "#2E2E2E";
    }
  };

  return (
    <DynamicBackground currentTime={currentTime}>
      <div
        className="h-[90%] relative flex aspect-square"
        style={{ color: primaryColor }}
      >
        <div
          className="h-full absolute aspect-square rounded-full border-2 border-solid"
          style={{ borderColor: primaryColor }}
        ></div>
        <div className="flex flex-col justify-center align-middle self-center text-center w-full">
          <div className="text-7xl font-extralight">O'Clock</div>
          <div className="font-light mt-4">
            <div className="text-2xl">{currentTime?.toLocaleTimeString()}</div>
            <div className="text-xs">{currentTime?.toLocaleDateString()}</div>
          </div>
        </div>
        <div className={"absolute w-full h-full text-[10px] font-light"}>
          <div className="absolute bottom-1/2 left-4">6h</div>
          <div className="absolute top-4 left-1/2">12h</div>
          <div className="absolute bottom-1/2 right-4">18h</div>
          <div className="absolute bottom-4 left-1/2">24h</div>
        </div>
        {currentTime && (
          <Image
            src={
              primaryColor === "#FFFFFF"
                ? "pointer-white.svg"
                : "pointer-dark.svg"
            }
            height={16}
            width={16}
            alt="clock-pointer"
            className="absolute origin-center"
            style={{
              ...clockPointerLocationClassNames,
            }}
          />
        )}
      </div>
    </DynamicBackground>
  );
}
