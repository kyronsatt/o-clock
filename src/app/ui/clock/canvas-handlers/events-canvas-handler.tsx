import CanvasHandler from "../../general/canvas-handler";

import { calculateTimeAsDailyPercentage } from "./helper";

class EventsCanvasHandler extends CanvasHandler {
  _eventsCtx: CanvasRenderingContext2D | null = null;

  _canvasMiddlePoint: number = 0;
  _circleRadius: number = 0;
  _circleThickness: number = 0;

  constructor(baseCanvas: HTMLCanvasElement, pointerCanvas: HTMLCanvasElement) {
    super();
    // this._set_general_drawing_references();
  }

  render(events: Array<IEvent>) {
    if (this._eventsCtx) {
      events.forEach((event) => {
        // 1. GET POSITION PERCENTAGE BY TIME
        const eventStartTimeAsDate = new Date(event.start.dateTime);
        const eventStartTimeAsDailyPercentage =
          calculateTimeAsDailyPercentage(eventStartTimeAsDate);

        // 2. PLACE EVENT POINTER ON CLOCK
        this._placeEventPointerOnClock(
          this._eventsCtx as CanvasRenderingContext2D,
          eventStartTimeAsDailyPercentage
        );

        // 3. RENDER THE EVENT DATA
      });
    }
  }

  _placeEventPointerOnClock(
    ctx: CanvasRenderingContext2D,
    timeAsDailyPercentage: number
  ) {
    const pointerRadius = 3;
    const { xCoordinate, yCoordinate } =
      this._calculate_clock_marker_coordinates(timeAsDailyPercentage);

    ctx.beginPath();
    ctx.arc(xCoordinate, yCoordinate, pointerRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.save();
  }

  _calculate_clock_marker_coordinates(timeAsDailyPercentage: number) {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * timeAsDailyPercentage + startAngleInRadians;

    const xCoordinate =
      this._canvasMiddlePoint +
      this._circleRadius * Math.cos(endAngleInRadians);
    const yCoordinate =
      this._canvasMiddlePoint +
      this._circleRadius * Math.sin(endAngleInRadians);

    return { xCoordinate, yCoordinate };
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
}

export default EventsCanvasHandler;
