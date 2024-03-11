import { ICoordinates } from "../clock/canvas-handlers/types";

class CanvasHandler {
  _canvasScreenCenterCoordinates: ICoordinates = { x: 0, y: 0 };
  _circleRadius: number = 0;
  _offsetMarginInPixels: number = 100;

  _clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  _rescaleCanvasToFitOnScreen(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    const scale = screenHeight / canvas.height;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    return ctx;
  }

  _setContextStyles(
    ctx: CanvasRenderingContext2D,
    color: string,
    lineWidth: number = 4,
    shadow?: { color: string; blur: number }
  ) {
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    if (shadow) {
      ctx.shadowColor = shadow.color;
      ctx.shadowBlur = shadow.blur;
    }
    return ctx;
  }

  _setGeneralDrawingReferences(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      const boundingClientRect = ctx.canvas.getBoundingClientRect();
      const xCoordinateOfCanvasScreenCenter =
        boundingClientRect.left + boundingClientRect.width / 2;
      const yCoordinateOfCanvasScreenCenter =
        boundingClientRect.top + boundingClientRect.height / 2;

      this._canvasScreenCenterCoordinates = {
        x: xCoordinateOfCanvasScreenCenter,
        y: yCoordinateOfCanvasScreenCenter,
      };

      this._circleRadius =
        yCoordinateOfCanvasScreenCenter - this._offsetMarginInPixels;
    }
  }
}

export default CanvasHandler;
