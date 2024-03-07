"use client";

import { useEffect, useState } from "react";
import DynamicBackground from "./ui/dynamic-background";
import Clock from "./ui/clock";

export default function ClockPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [primaryColor, setPrimaryColor] = useState<string>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      // const test = currentTime;
      // test?.setHours(currentTime.getHours() + 1);

      // // const currentTime = new Date();
      // setCurrentTime(test);

      const newTime = new Date();
      setCurrentTime(newTime);

      const primaryColor = getPrimaryColor(newTime);
      setPrimaryColor(primaryColor);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
      <Clock time={currentTime} />
    </DynamicBackground>
  );
}
