import CanvasHandler from "../../general/canvas-handler";

import { CLOCK_DARK_COLOR_HEX, CLOCK_LIGHT_COLOR_HEX } from "./constants";
import { calculateTimeAsDailyPercentage } from "./helper";

class ClockCanvasHandler extends CanvasHandler {
  _baseCtx: CanvasRenderingContext2D | null = null;
  _pointerCtx: CanvasRenderingContext2D | null = null;

  _circleThickness: number = 0;

  constructor(baseCanvas: HTMLCanvasElement, pointerCanvas: HTMLCanvasElement) {
    super();

    this._baseCtx = this._configureBaseCanvas(baseCanvas);
    this._pointerCtx = this._configurePointerCanvas(pointerCanvas);

    this._setGeneralDrawingReferences(this._baseCtx);
  }

  render() {
    if (this._baseCtx) {
      this._renderBase(this._baseCtx);
      this._renderTimeTicks(this._baseCtx);
    }
  }

  updatePointer(time: Date) {
    if (this._pointerCtx) {
      const timeAsDailyPercentage = calculateTimeAsDailyPercentage(time);
      this._clearCanvas(this._pointerCtx);
      this._renderClockPointer(this._pointerCtx, timeAsDailyPercentage);
    }
  }

  _configureBaseCanvas(
    baseCanvas: HTMLCanvasElement
  ): CanvasRenderingContext2D | null {
    const _baseCtx = baseCanvas.getContext("2d");
    if (!_baseCtx) return null;

    const rescaledBaseCanvasContext = this._rescaleCanvasToFitOnScreen(
      baseCanvas,
      _baseCtx
    );

    this._circleThickness = 10;
    const styledBaseCanvasContext = this._setContextStyles(
      rescaledBaseCanvasContext,
      CLOCK_LIGHT_COLOR_HEX,
      this._circleThickness,
      { color: CLOCK_LIGHT_COLOR_HEX, blur: 4 }
    );

    return styledBaseCanvasContext;
  }

  _configurePointerCanvas(
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
      CLOCK_DARK_COLOR_HEX,
      2,
      { color: CLOCK_DARK_COLOR_HEX, blur: 2 }
    );

    return styledPointerCanvasContext;
  }

  _renderBase(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this._canvasScreenCenterCoordinates.x,
      this._canvasScreenCenterCoordinates.y,
      this._circleRadius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.closePath();
    ctx.save();
  }

  _renderTimeTicks(ctx: CanvasRenderingContext2D) {
    const tickMargin = 10;

    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF90";

    // 6AM
    ctx.fillRect(
      this._canvasScreenCenterCoordinates.x -
        this._circleRadius +
        this._circleThickness / 2 +
        tickMargin,
      this._canvasScreenCenterCoordinates.y,
      8,
      1
    );

    // 6PM
    ctx.fillRect(
      this._canvasScreenCenterCoordinates.x +
        this._circleRadius -
        this._circleThickness -
        tickMargin,
      this._canvasScreenCenterCoordinates.y,
      8,
      1
    );

    // 12AM
    ctx.fillRect(
      this._canvasScreenCenterCoordinates.x,
      this._canvasScreenCenterCoordinates.y - this._circleRadius + tickMargin,
      1,
      8
    );

    // 12PM
    ctx.fillRect(
      this._canvasScreenCenterCoordinates.x,
      this._canvasScreenCenterCoordinates.y +
        this._circleRadius -
        this._circleThickness -
        tickMargin,
      1,
      8
    );

    ctx.closePath();
    ctx.save();
  }

  _renderClockPointer(
    ctx: CanvasRenderingContext2D,
    timeAsDailyPercentage: number
  ) {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * timeAsDailyPercentage + startAngleInRadians;

    ctx.beginPath();
    ctx.arc(
      this._canvasScreenCenterCoordinates.x,
      this._canvasScreenCenterCoordinates.y,
      this._circleRadius,
      startAngleInRadians,
      endAngleInRadians
    );
    ctx.stroke();
    ctx.closePath();
    ctx.save();
  }
}

export default ClockCanvasHandler;
