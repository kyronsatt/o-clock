"use client";

import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { ICoordinates } from "./canvas-handlers/types";
import { IEventRender } from ".";
import { CLOCK_DARK_COLOR_HEX } from "./canvas-handlers/constants";
import { formatDate, formatDateFromString } from "@/app/dayjs";

interface IEvents {
  eventsToRender?: Array<IEventRender>;
}

export default function Events({ eventsToRender }: IEvents) {
  const isCoordinateOnTheLeft = (coordinates: ICoordinates) =>
    coordinates.x <= innerWidth / 2;
  const getPosition = (coordinates: ICoordinates): CSSProperties => {
    const positionStyle: CSSProperties = {
      left: Math.round(coordinates.x),
      top: Math.round(coordinates.y),
      position: "absolute",
      textAlign: "right",
      display: "flex",
      width: "15rem",
    };

    if (isCoordinateOnTheLeft(coordinates)) {
      positionStyle.transform = "translateX(-100%)";
      positionStyle.textAlign = "left";
    } else {
      positionStyle.justifyContent = "flex-end";
    }

    return positionStyle;
  };

  const getLabelPosition = (coordinates: ICoordinates) => {
    const positionStyle: CSSProperties = {
      position: "absolute",
      display: "flex",
      top: "-0.5rem",
    };

    if (!isCoordinateOnTheLeft(coordinates)) {
      positionStyle.flexDirection = "row-reverse";
    }

    return positionStyle;
  };

  const getEventTimeStyle = (coordinates: ICoordinates): CSSProperties => {
    const paddingInlineGreater = "1.3rem";
    const paddingInlineLower = "0.8rem";
    const positionStyle: CSSProperties = {
      marginInline: "-0.8rem",
    };

    if (isCoordinateOnTheLeft(coordinates)) {
      positionStyle.paddingInlineStart = paddingInlineLower;
      positionStyle.paddingInlineEnd = paddingInlineGreater;
    } else {
      positionStyle.paddingInlineStart = paddingInlineGreater;
      positionStyle.paddingInlineEnd = paddingInlineLower;
    }

    return positionStyle;
  };

  return (
    <div className="absolute w-screen h-screen z-[200]">
      <div className="relative w-full h-full">
        {eventsToRender?.map(({ event, coordinates }) => (
          <div
            key={`event-render-${event.id}`}
            className={twMerge(
              "relative tracking-wide",
              `border-t-[1px] border-soft-dark`
            )}
            style={getPosition(coordinates)}
          >
            <div className="text-xs" style={getLabelPosition(coordinates)}>
              <div
                className="rounded-xl font-bold bg-white text-soft-dark py-[1px]"
                style={getEventTimeStyle(coordinates)}
              >
                {formatDateFromString(event.start.dateTime, undefined, "HH:MM")}
              </div>
              <div className="rounded-xl font-medium truncate bg-soft-dark text-white px-3 py-[1px] z-[200]">
                {event.summary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
