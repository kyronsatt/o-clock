class ClockRender {
  _canvasMiddlePoint: number = 0;
  _circleRadius: number = 0;
  _baseCtx: CanvasRenderingContext2D | null = null;
  _pointerCtx: CanvasRenderingContext2D | null = null;

  constructor(
    clockCanvas: HTMLCanvasElement,
    pointerCanvas: HTMLCanvasElement
  ) {
    // CONFIGURE CLOCK CANVAS
    const _baseCtx = clockCanvas.getContext("2d");
    if (!_baseCtx) return;

    const rescaledClockCanvasContext = this._rescaleCanvasToFitOnScreen(
      clockCanvas,
      _baseCtx
    );
    const styledClockCanvasContext = this._setContextStyles(
      rescaledClockCanvasContext,
      "#2E2E2E",
      8,
      { color: "black", blur: 3 }
    );
    this._baseCtx = styledClockCanvasContext;

    const { width } = styledClockCanvasContext.canvas;
    this._canvasMiddlePoint = width / 2;

    const offsetMarginInPixels = 10;
    this._circleRadius = this._canvasMiddlePoint - offsetMarginInPixels;

    // CONFIGURE POINTER CANVAS
    const _pointerCtx = pointerCanvas.getContext("2d");
    if (!_pointerCtx) return;

    const rescaledPointerCanvasContext = this._rescaleCanvasToFitOnScreen(
      pointerCanvas,
      _pointerCtx
    );
    const styledPointerCanvasContext = this._setContextStyles(
      rescaledPointerCanvasContext,
      "#FFFFFF",
      1,
      { color: "white", blur: 2 }
    );

    this._pointerCtx = styledPointerCanvasContext;
  }

  start() {
    if (this._baseCtx) {
      this._renderBase(this._baseCtx);
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

    canvas.width *= scale;
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

  _renderBase(_baseCtx: CanvasRenderingContext2D) {
    _baseCtx.beginPath();
    _baseCtx.arc(
      this._canvasMiddlePoint,
      this._canvasMiddlePoint,
      this._circleRadius,
      0,
      2 * Math.PI
    );
    _baseCtx.stroke();
    _baseCtx.closePath();
    _baseCtx.save();
  }

  _renderClockPointer(
    _pointerCtx: CanvasRenderingContext2D,
    dayCompletionPercentage: number
  ) {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * dayCompletionPercentage + startAngleInRadians;

    _pointerCtx.beginPath();
    _pointerCtx.arc(
      this._canvasMiddlePoint,
      this._canvasMiddlePoint,
      this._circleRadius,
      startAngleInRadians,
      endAngleInRadians
    );
    _pointerCtx.stroke();
    _pointerCtx.closePath();
    _pointerCtx.save();
  }
}

export default ClockRender;
