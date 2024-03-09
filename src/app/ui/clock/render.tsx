class ClockRender {
  _baseCtx: CanvasRenderingContext2D | null = null;
  _pointerCtx: CanvasRenderingContext2D | null = null;

  _canvasMiddlePoint: number = 0;
  _circleRadius: number = 0;
  _circleThickness: number = 0;

  constructor(baseCanvas: HTMLCanvasElement, pointerCanvas: HTMLCanvasElement) {
    this._baseCtx = this._configure_base_canvas(baseCanvas);
    this._pointerCtx = this._configure_pointer_canvas(pointerCanvas);
    this._configure_general_drawing_references();
  }

  start() {
    if (this._baseCtx) {
      this._renderBase(this._baseCtx);
      this._renderTimeTicks(this._baseCtx);
    }
  }

  updatePointer(time: Date) {
    if (this._pointerCtx) {
      const dayCompletionPercentage =
        this._calculateDayCompletionPercentage(time);
      this._clearCanvas(this._pointerCtx);
      this._renderClockPointer(this._pointerCtx, dayCompletionPercentage);
    }
  }

  _configure_base_canvas(
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
      "#FFFFFF",
      this._circleThickness,
      { color: "white", blur: 4 }
    );

    return styledBaseCanvasContext;
  }

  _configure_general_drawing_references() {
    if (this._baseCtx) {
      const { width } = this._baseCtx.canvas;
      this._canvasMiddlePoint = width / 2;

      const offsetMarginInPixels = 10;
      this._circleRadius = this._canvasMiddlePoint - offsetMarginInPixels;
    }
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
      "#525252",
      2,
      { color: "black", blur: 2 }
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
      this._circleRadius,
      canvasSide - innerCircleToCanvasOffset - tickMargin,
      1,
      8
    );

    ctx.closePath();
    ctx.save();
  }

  _renderClockPointer(
    ctx: CanvasRenderingContext2D,
    dayCompletionPercentage: number
  ) {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * dayCompletionPercentage + startAngleInRadians;

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

    // const endPointX =
    //   this._canvasMiddlePoint +
    //   this._circleRadius * Math.cos(endAngleInRadians);
    // const endPointY =
    //   this._canvasMiddlePoint +
    //   this._circleRadius * Math.sin(endAngleInRadians);

    // ctx.beginPath();

    // ctx.arc(endPointX, endPointY, 3, 0, 2 * Math.PI); // Assuming you want a circle with radius 5px at the end of the arc
    // ctx.fill();
    // ctx.closePath();
    // ctx.save();
  }

  _clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  _calculateDayCompletionPercentage(time: Date) {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const totalMinutes = hours * 60 + minutes;
    const dayCompletionPercentage = totalMinutes / 1440;

    return dayCompletionPercentage;
  }

  _rescaleCanvasToFitOnScreen(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const screenHeight = window.innerHeight - 200;
    const scale = screenHeight / canvas.height;

    canvas.width = screenHeight;
    canvas.height = screenHeight;

    ctx.scale(scale, scale);
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
}

export default ClockRender;
