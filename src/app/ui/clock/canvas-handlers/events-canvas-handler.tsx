import CanvasHandler from "../../general/canvas-handler";
import { CLOCK_DARK_COLOR_HEX } from "./constants";

import { calculateTimeAsDailyPercentage } from "./helper";
import { ICoordinates } from "./types";

class EventsCanvasHandler extends CanvasHandler {
  _eventsCtx: CanvasRenderingContext2D | null = null;

  _canvasMiddlePoint: number = 0;
  _circleRadius: number = 0;
  _circleThickness: number = 0;

  constructor(eventsCanvas: HTMLCanvasElement) {
    super();

    this._eventsCtx = this._configure_events_canvas(eventsCanvas);

    this._set_general_drawing_references(this._eventsCtx);
  }

  updateEvents(events: Array<IEvent>) {
    if (this._eventsCtx) {
      events.forEach((event) => {
        // 1. GET POSITION PERCENTAGE BY TIME
        const eventStartTimeAsDate = new Date(event.start.dateTime);
        const eventStartTimeAsDailyPercentage =
          calculateTimeAsDailyPercentage(eventStartTimeAsDate);

        // 2. PLACE EVENT POINTER ON CLOCK
        const eventMarkerCoordinates = this._calculate_clock_marker_coordinates(
          eventStartTimeAsDailyPercentage
        );
        this._placeEventMarkerOnClock(
          this._eventsCtx as CanvasRenderingContext2D,
          eventMarkerCoordinates
        );

        // 3. RENDER THE EVENT DATA
      });
    }
  }

  _placeEventMarkerOnClock(
    ctx: CanvasRenderingContext2D,
    coordinates: ICoordinates
  ) {
    const pointerRadius = 2.5;

    ctx.beginPath();
    ctx.arc(coordinates.x, coordinates.y, pointerRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.save();
  }

  _calculate_clock_marker_coordinates(
    timeAsDailyPercentage: number
  ): ICoordinates {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * timeAsDailyPercentage + startAngleInRadians;

    const xCoordinate =
      this._canvasMiddlePoint +
      this._circleRadius * Math.cos(endAngleInRadians);
    const yCoordinate =
      this._canvasMiddlePoint +
      this._circleRadius * Math.sin(endAngleInRadians);

    return { x: xCoordinate, y: yCoordinate };
  }

  _configure_pointer_canvas(
    pointerCanvas: HTMLCanvasElement
  ): CanvasRenderingContext2D | null {
    const _pointerCtx = pointerCanvas.getContext("2d");
    if (!_pointerCtx) return null;

    const rescaledPointerCanvasContext = this._rescaleCanvasToFitOnScreen(
      pointerCanvas,
      _pointerCtx
    );

    const styledPointerCanvasContext = this._setContextStyles(
      rescaledPointerCanvasContext,
      "#6C6C6C",
      2,
      { color: "#6C6C6C", blur: 2 }
    );

    return styledPointerCanvasContext;
  }

  _configure_events_canvas(
    eventsCanvas: HTMLCanvasElement
  ): CanvasRenderingContext2D | null {
    const _baseCtx = eventsCanvas.getContext("2d");
    if (!_baseCtx) return null;

    const rescaledEventsCanvasContext = this._rescaleCanvasToFitOnScreen(
      eventsCanvas,
      _baseCtx
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
