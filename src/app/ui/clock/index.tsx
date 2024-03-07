"use client";

import { useEffect, useRef, useState } from "react";

import ClockRender from "./render";

interface IClock {
  time: Date;
}
export default function Clock({ time }: IClock) {
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const pointerCanvasRef = useRef<HTMLCanvasElement>(null);
  const [clockRender, setClockRender] = useState<ClockRender>();

  useEffect(() => {
    const baseCanvas = baseCanvasRef.current;
    if (!baseCanvas) return;

    const pointerCanvas = pointerCanvasRef.current;
    if (!pointerCanvas) return;

    const clockRender = new ClockRender(baseCanvas, pointerCanvas);
    clockRender.start();

    setClockRender(clockRender);
  }, []);

  useEffect(() => {
    if (clockRender) {
      clockRender.updatePointer(time);
    }
  }, [time]);

  return (
    <div className="flex relative w-full h-full justify-center align-center items-center">
      <canvas
        key={"clock-canvas"}
        className="absolute z-0"
        ref={baseCanvasRef}
        width={2000}
        height={2000}
      ></canvas>
      <canvas
        key={"pointer-canvas"}
        className="absolute z-10"
        ref={pointerCanvasRef}
        width={2000}
        height={2000}
      ></canvas>
    </div>
  );
}
