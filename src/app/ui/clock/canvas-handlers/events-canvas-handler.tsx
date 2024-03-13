import CanvasHandler from "../../general/canvas-handler";
import { IEventRender } from "..";

import { CLOCK_DARK_COLOR_HEX } from "./constants";
import { calculateTimeAsDailyPercentage } from "./helper";
import { ICoordinates } from "./types";

class EventsCanvasHandler extends CanvasHandler {
  _eventsCtx: CanvasRenderingContext2D | null = null;
  _eventLineLength: number = 200;
  _eventDataVerticalPadding: number = 5;

  constructor(eventsCanvas: HTMLCanvasElement) {
    super();

    this._eventsCtx = this._configureEventsCanvas(eventsCanvas);

    this._setGeneralDrawingReferences(this._eventsCtx);
  }

  updateEvents(
    events: Array<IEvent>,
    onRenderEventMarker: (eventsToRender: Array<IEventRender>) => void
  ) {
    if (this._eventsCtx) {
      const eventsToRender = events.map((event): IEventRender => {
        const eventStartTimeAsDate = new Date(event.start.dateTime);
        const eventStartTimeAsDailyPercentage =
          calculateTimeAsDailyPercentage(eventStartTimeAsDate);

        const eventMarkerCoordinates = this._calculateClockMarkerCoordinates(
          eventStartTimeAsDailyPercentage
        );

        this._placeEventMarkerOnClock(
          this._eventsCtx as CanvasRenderingContext2D,
          eventMarkerCoordinates
        );

        const coordinates = this._placeEventConnectionsOnClock(
          this._eventsCtx as CanvasRenderingContext2D,
          eventMarkerCoordinates,
          eventStartTimeAsDate
        );

        return { event, coordinates };
      });

      onRenderEventMarker(eventsToRender);
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

  _placeEventConnectionsOnClock(
    ctx: CanvasRenderingContext2D,
    coordinates: ICoordinates,
    time: Date
  ) {
    const isEventOnFirstHalf = time.getHours() <= 12;
    const coordinateDirection = isEventOnFirstHalf ? -1 : 1;
    const connectionLineBoundaryCoordinates = (): ICoordinates => {
      const lineBoundaryXCoordinate =
        coordinates.x + this._eventLineLength * coordinateDirection;

      return { x: lineBoundaryXCoordinate, y: coordinates.y };
    };
    const connectionBoundaryCoordinates = connectionLineBoundaryCoordinates();

    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.shadowBlur = 0;
    ctx.moveTo(coordinates.x, coordinates.y);
    ctx.lineTo(
      connectionBoundaryCoordinates.x,
      connectionBoundaryCoordinates.y
    );
    ctx.stroke();

    return connectionBoundaryCoordinates;
  }

  _calculateClockMarkerCoordinates(
    timeAsDailyPercentage: number
  ): ICoordinates {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * timeAsDailyPercentage + startAngleInRadians;

    if (this._canvasScreenCenterCoordinates) {
      const xCoordinate =
        this._canvasScreenCenterCoordinates.x +
        this._circleRadius * Math.cos(endAngleInRadians);
      const yCoordinate =
        this._canvasScreenCenterCoordinates.y +
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
