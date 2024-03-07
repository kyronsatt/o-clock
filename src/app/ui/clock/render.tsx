class ClockRender {
  canvasMiddlePoint: number = 0;
  circleRadius: number = 0;
  clockCtx: CanvasRenderingContext2D | null = null;
  pointerCtx: CanvasRenderingContext2D | null = null;

  constructor(
    clockCanvas: HTMLCanvasElement,
    pointerCanvas: HTMLCanvasElement
  ) {
    // CONFIGURE CLOCK CANVAS
    const clockCtx = clockCanvas.getContext("2d");
    if (!clockCtx) return;

    const rescaledClockCanvasContext = this.rescaleCanvasToFitOnScreen(
      clockCanvas,
      clockCtx
    );
    const styledClockCanvasContext = this.setContextStyles(
      rescaledClockCanvasContext,
      "#2E2E2E",
      8,
      { color: "black", blur: 3 }
    );
    this.clockCtx = styledClockCanvasContext;

    const { width } = styledClockCanvasContext.canvas;
    this.canvasMiddlePoint = width / 2;

    const offsetMarginInPixels = 10;
    this.circleRadius = this.canvasMiddlePoint - offsetMarginInPixels;

    // CONFIGURE POINTER CANVAS
    const pointerCtx = pointerCanvas.getContext("2d");
    if (!pointerCtx) return;

    const rescaledPointerCanvasContext = this.rescaleCanvasToFitOnScreen(
      pointerCanvas,
      pointerCtx
    );
    const styledPointerCanvasContext = this.setContextStyles(
      rescaledPointerCanvasContext,
      "#FFFFFF",
      1,
      { color: "white", blur: 2 }
    );

    this.pointerCtx = styledPointerCanvasContext;
  }

  start() {
    if (this.clockCtx) {
      this.renderBase(this.clockCtx);
    }
  }

  updatePointer(time: Date) {
    if (this.pointerCtx) {
      const dayCompletionPercentage =
        this.calculateDayCompletionPercentage(time);
      this.clearCanvas(this.pointerCtx);
      this.renderClockPointer(this.pointerCtx, dayCompletionPercentage);
    }
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  calculateDayCompletionPercentage(time: Date) {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const totalMinutes = hours * 60 + minutes;
    const dayCompletionPercentage = totalMinutes / 1440;

    return dayCompletionPercentage;
  }

  rescaleCanvasToFitOnScreen(
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

  setContextStyles(
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

  renderBase(clockCtx: CanvasRenderingContext2D) {
    clockCtx.beginPath();
    clockCtx.arc(
      this.canvasMiddlePoint,
      this.canvasMiddlePoint,
      this.circleRadius,
      0,
      2 * Math.PI
    );
    clockCtx.stroke();
    clockCtx.closePath();
    clockCtx.save();
  }

  renderClockPointer(
    pointerCtx: CanvasRenderingContext2D,
    dayCompletionPercentage: number
  ) {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * dayCompletionPercentage + startAngleInRadians;

    pointerCtx.beginPath();
    pointerCtx.arc(
      this.canvasMiddlePoint,
      this.canvasMiddlePoint,
      this.circleRadius,
      startAngleInRadians,
      endAngleInRadians
    );
    pointerCtx.stroke();
    pointerCtx.closePath();
    pointerCtx.save();
  }
}

export default ClockRender;
