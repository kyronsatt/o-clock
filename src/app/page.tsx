"use client";

import { useEffect, useState } from "react";
import DynamicBackground from "./ui/dynamic-background";
import Clock from "./ui/clock";

export default function ClockPage() {
  const [currentTime, setCurrentTime] = useState<Date>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!currentTime) return <></>;

  return (
    <DynamicBackground currentTime={currentTime}>
      <Clock time={currentTime} />
    </DynamicBackground>
  );
}
