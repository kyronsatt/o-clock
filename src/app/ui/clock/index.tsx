"use client";

import { useEffect, useRef } from "react";

import ClockRender from "./render";

interface IClock {
  time: Date;
}
export default function Clock({ time }: IClock) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clockRender = new ClockRender(canvas);
    clockRender.render();
  }, [time]);

  return (
    <canvas
      // className="border-solid border-dark border-2"
      ref={canvasRef}
      width={10000}
      height={10000}
    ></canvas>
  );
}
