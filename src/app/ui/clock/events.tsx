"use client";

import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { formatDateFromString } from "@/app/dayjs";

import Loader from "../loader";

import { ICoordinates } from "./canvas-handlers/types";
import { IEventRender } from ".";

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
      width: "4rem",
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
      top: "-0.6rem",
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
        {eventsToRender ? (
          eventsToRender.map(({ event, coordinates }) => (
            <div
              key={`event-render-${event.id}`}
              className={twMerge("relative tracking-wide")}
              style={getPosition(coordinates)}
            >
              <div
                className="text-xs rounded-xl max-w-[15rem] shadow-lg shadow-dark/20"
                style={getLabelPosition(coordinates)}
              >
                <div
                  className="rounded-xl font-bold bg-white text-dark py-[1px] "
                  style={getEventTimeStyle(coordinates)}
                >
                  {formatDateFromString(event.start.dateTime, "HH:mm")}
                </div>
                <div className="rounded-xl font-normal truncate bg-dark text-white px-3 py-[1px] z-[200]">
                  {event.summary}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute bottom-8 left-8 bg-white shadow-xl shadow-black/10 rounded-full pl-3 pr-8 py-3">
            <Loader message="Obtendo eventos..." className="flex-row gap-4" />
          </div>
        )}
      </div>
    </div>
  );
}
