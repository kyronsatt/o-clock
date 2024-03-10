import CanvasHandler from "../../general/canvas-handler";

import { CLOCK_DARK_COLOR_HEX, CLOCK_LIGHT_COLOR_HEX } from "./constants";
import { calculateTimeAsDailyPercentage } from "./helper";
import { ICoordinates } from "./types";

class ClockCanvasHandler extends CanvasHandler {
  _baseCtx: CanvasRenderingContext2D | null = null;
  _pointerCtx: CanvasRenderingContext2D | null = null;

  _circleThickness: number = 0;
  _heightMargin = 230;
  _canvasScreenCenterCoordinates: ICoordinates | null = null;
  _offsetMarginInPixels = 10;

  constructor(baseCanvas: HTMLCanvasElement, pointerCanvas: HTMLCanvasElement) {
    super();

    this._baseCtx = this._configureBaseCanvas(baseCanvas);
    this._pointerCtx = this._configurePointerCanvas(pointerCanvas);

    this._setGeneralDrawingReferences(
      this._baseCtx,
      undefined,
      this._offsetMarginInPixels
    );
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
      _baseCtx,
      this._heightMargin,
      true
    );

    const boundingClientRect = baseCanvas.getBoundingClientRect();
    const xCoordinateOfCanvasScreenCenter =
      boundingClientRect.left + boundingClientRect.width / 2;
    const yCoordinateOfCanvasScreenCenter =
      boundingClientRect.top + boundingClientRect.height / 2;

    this._canvasScreenCenterCoordinates = {
      x: xCoordinateOfCanvasScreenCenter,
      y: yCoordinateOfCanvasScreenCenter,
    };

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
      _pointerCtx,
      this._heightMargin,
      true
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
      this._canvasMiddlePoint,
      this._canvasMiddlePoint,
      this._circleRadius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.closePath();
    ctx.save();
  }

  _renderTimeTicks(ctx: CanvasRenderingContext2D) {
    const canvasSide = ctx.canvas.width;
    const tickMargin = 10;
    const innerCircleToCanvasOffset =
      this._canvasMiddlePoint -
      this._circleRadius +
      this._circleThickness / 2 +
      tickMargin;

    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF90";

    // 6AM
    ctx.fillRect(innerCircleToCanvasOffset, this._canvasMiddlePoint, 8, 1);

    // 12AM
    ctx.fillRect(this._canvasMiddlePoint, innerCircleToCanvasOffset, 1, 8);

    // 6PM
    ctx.fillRect(
      canvasSide - innerCircleToCanvasOffset - tickMargin,
      this._canvasMiddlePoint,
      8,
      1
    );

    // 12PM
    ctx.fillRect(
      this._canvasMiddlePoint,
      canvasSide - innerCircleToCanvasOffset - tickMargin,
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
      this._canvasMiddlePoint,
      this._canvasMiddlePoint,
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
