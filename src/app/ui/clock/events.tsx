"use client";

import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { ICoordinates } from "./canvas-handlers/types";
import { IEventRender } from ".";

interface IEvents {
  eventsToRender?: Array<IEventRender>;
}

export default function Events({ eventsToRender }: IEvents) {
  const getPositionStyle = (coordinates: ICoordinates): CSSProperties => {
    const positionStyle: CSSProperties = {
      left: Math.round(coordinates.x),
      top: Math.round(coordinates.y),
      position: "absolute",
    };

    if (coordinates.x <= innerWidth / 2) {
      positionStyle.transform = "translateX(-100%)";
    }

    return positionStyle;
  };

  return (
    <div className="absolute w-screen h-screen z-[200]">
      <div className="relative w-full h-full">
        {eventsToRender?.map(({ event, coordinates }) => (
          <div
            key={`event-render-${event.id}`}
            className={twMerge("w-fit")}
            style={getPositionStyle(coordinates)}
          >
            <div>{event.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
