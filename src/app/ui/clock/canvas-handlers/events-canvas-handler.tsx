import CanvasHandler from "../../general/canvas-handler";
import { CLOCK_DARK_COLOR_HEX } from "./constants";

import { calculateTimeAsDailyPercentage } from "./helper";
import { ICoordinates } from "./types";

class EventsCanvasHandler extends CanvasHandler {
  _eventsCtx: CanvasRenderingContext2D | null = null;
  _clockCentralCoordinates: ICoordinates | null;

  constructor(
    eventsCanvas: HTMLCanvasElement,
    clockRadius: number,
    clockCentralCoordinates: ICoordinates | null
  ) {
    super();

    this._eventsCtx = this._configureEventsCanvas(eventsCanvas);
    this._clockCentralCoordinates = clockCentralCoordinates;

    this._setGeneralDrawingReferences(this._eventsCtx, clockRadius, 0);
  }

  updateEvents(events: Array<IEvent>) {
    if (this._eventsCtx) {
      events.forEach((event) => {
        // 1. GET POSITION PERCENTAGE BY TIME
        const eventStartTimeAsDate = new Date(event.start.dateTime);
        const eventStartTimeAsDailyPercentage =
          calculateTimeAsDailyPercentage(eventStartTimeAsDate);

        // 2. PLACE EVENT POINTER ON CLOCK
        const eventMarkerCoordinates = this._calculateClockMarkerCoordinates(
          eventStartTimeAsDailyPercentage
        );

        this._placeEventMarkerOnClock(
          this._eventsCtx as CanvasRenderingContext2D,
          eventMarkerCoordinates
        );

        // // 3. RENDER THE EVENT DATA
        // this._placeEventDataOnClock(
        //   this._eventsCtx as CanvasRenderingContext2D,
        //   eventMarkerCoordinates
        // );
      });
    }
  }

  _placeEventMarkerOnClock(
    ctx: CanvasRenderingContext2D,
    coordinates: ICoordinates
  ) {
    const markerRadius = 2.5;

    ctx.beginPath();
    ctx.arc(coordinates.x, coordinates.y, markerRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.save();
  }

  _placeEventDataOnClock(
    ctx: CanvasRenderingContext2D,
    coordinates: ICoordinates
  ) {
    const connectionLineBoundaryCoordinates = (): ICoordinates => {
      return { x: coordinates.x + 200, y: coordinates.y };
    };
    const lineBoundaryCoordinates = connectionLineBoundaryCoordinates();

    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.moveTo(coordinates.x, coordinates.y);
    ctx.lineTo(lineBoundaryCoordinates.x, lineBoundaryCoordinates.y);
    ctx.stroke();
  }

  _calculateClockMarkerCoordinates(
    timeAsDailyPercentage: number
  ): ICoordinates {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * timeAsDailyPercentage + startAngleInRadians;

    if (this._clockCentralCoordinates) {
      const xCoordinate =
        this._clockCentralCoordinates.x +
        this._circleRadius * Math.cos(endAngleInRadians);
      const yCoordinate =
        this._clockCentralCoordinates.y +
        this._circleRadius * Math.sin(endAngleInRadians);

      return { x: xCoordinate, y: yCoordinate };
    }

    return { x: 0, y: 0 };
  }

  _configureEventsCanvas(
    eventsCanvas: HTMLCanvasElement
  ): CanvasRenderingContext2D | null {
    const _eventsCtx = eventsCanvas.getContext("2d");
    if (!_eventsCtx) return null;

    const rescaledEventsCanvasContext = this._rescaleCanvasToFitOnScreen(
      eventsCanvas,
      _eventsCtx
    );

    const styledEventsCanvasContext = this._setContextStyles(
      rescaledEventsCanvasContext,
      CLOCK_DARK_COLOR_HEX,
      undefined,
      { color: CLOCK_DARK_COLOR_HEX, blur: 4 }
    );

    return styledEventsCanvasContext;
  }
}

export default EventsCanvasHandler;
