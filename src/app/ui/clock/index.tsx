"use client";

import { useEffect, useRef, useState } from "react";

import { getTodayEvents } from "@/app/lib/services/calendar-api/handler";

import ClockContent from "./content";

import ClockCanvasHandler from "./canvas-handlers/clock-canvas-handler";
import EventsCanvasHandler from "./canvas-handlers/events-canvas-handler";
import { ICoordinates } from "./canvas-handlers/types";
import Events from "./events";

interface IClock {
  time: Date;
}

export interface IEventRender {
  event: IEvent;
  coordinates: ICoordinates;
}
export default function Clock({ time }: IClock) {
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const pointerCanvasRef = useRef<HTMLCanvasElement>(null);
  const eventsCanvasRef = useRef<HTMLCanvasElement>(null);

  const [clockCanvasHandler, setClockCanvasHandler] =
    useState<ClockCanvasHandler>();
  const [eventsCanvasHandler, setEventsCanvasHandler] =
    useState<EventsCanvasHandler>();
  const [eventsToRender, setEventsToRender] = useState<Array<IEventRender>>();

  const renderClockCanvas = () => {
    const baseCanvas = baseCanvasRef.current;
    if (!baseCanvas) return;

    const pointerCanvas = pointerCanvasRef.current;
    if (!pointerCanvas) return;

    const clockCanvasHandler = new ClockCanvasHandler(
      baseCanvas,
      pointerCanvas
    );
    clockCanvasHandler.render();

    setClockCanvasHandler(clockCanvasHandler);
  };

  const renderEventsCanvas = () => {
    const eventsCanvas = eventsCanvasRef.current;
    if (!eventsCanvas || !clockCanvasHandler) return;

    const eventsCanvasHandler = new EventsCanvasHandler(eventsCanvas);

    setEventsCanvasHandler(eventsCanvasHandler);
  };

  useEffect(() => {
    renderClockCanvas();
  }, []);

  useEffect(() => {
    renderEventsCanvas();
  }, [clockCanvasHandler, renderEventsCanvas]);

  useEffect(() => {
    if (clockCanvasHandler) {
      clockCanvasHandler.updatePointer(time);
    }
  }, [time, clockCanvasHandler]);

  const onRenderEventMarker = (eventsToRender: Array<IEventRender>) => {
    setEventsToRender(eventsToRender);
  };

  const getEventsResponse = getTodayEvents(); // TODO -> INTEGRATE IT
  useEffect(() => {
    if (eventsCanvasHandler && getEventsResponse) {
      eventsCanvasHandler.updateEvents(
        getEventsResponse.items,
        onRenderEventMarker
      );
    }
  }, [eventsCanvasHandler, getEventsResponse]);

  return (
    <div className="flex relative w-full h-full justify-center align-center items-center">
      <canvas
        key={"base-canvas"}
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
      <canvas
        key={"events-canvas"}
        className="absolute z-20"
        ref={eventsCanvasRef}
        width={2000}
        height={2000}
      ></canvas>
      <ClockContent time={time} />
      <Events eventsToRender={eventsToRender} />
    </div>
  );
}
