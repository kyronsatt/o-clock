class CanvasHandler {
  _canvasMiddlePoint: number = 0;
  _circleRadius: number = 0;

  _clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  _rescaleCanvasToFitOnScreen(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    heightOffset?: number,
    useSquareAspectRatio?: boolean
  ) {
    const screenHeight = window.innerHeight - (heightOffset ?? 0);
    const screenWidth = window.innerWidth;

    const scale = screenHeight / canvas.height;

    canvas.width = useSquareAspectRatio ? screenHeight : screenWidth;
    canvas.height = screenHeight;

    if (heightOffset) {
      ctx.scale(scale, scale);
    }

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

  _setGeneralDrawingReferences(
    ctx: CanvasRenderingContext2D | null,
    manualCanvasMiddlePoint?: number,
    offsetMarginInPixels?: number
  ) {
    if (ctx) {
      const { width } = ctx.canvas;
      this._canvasMiddlePoint = width / 2;

      this._circleRadius =
        (manualCanvasMiddlePoint ?? this._canvasMiddlePoint) -
        (offsetMarginInPixels ?? 0);
    }
  }
}

export default CanvasHandler;
