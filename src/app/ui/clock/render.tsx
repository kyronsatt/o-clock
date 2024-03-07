class ClockRender {
  canvasMiddlePoint: number = 0;
  circleRadius: number = 0;
  ctx: CanvasRenderingContext2D | null = null;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rescaledCanvasContext = this.rescaleCanvasToFitOnScreen(canvas, ctx);
    const styledCanvasContext = this.setGeneralStyles(rescaledCanvasContext);
    this.ctx = styledCanvasContext;

    const { width } = styledCanvasContext.canvas;
    this.canvasMiddlePoint = width / 2;

    const offsetMarginInPixels = 10;
    this.circleRadius = this.canvasMiddlePoint - offsetMarginInPixels;
  }

  render() {
    if (this.ctx) {
      this.renderClockCircle(this.ctx);
      this.renderClockPointer(this.ctx, 0.4);
    }
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

  setGeneralStyles(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = "#2E2E2E";
    ctx.strokeStyle = "#2E2E2E";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    return ctx;
  }

  renderClockCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.canvasMiddlePoint,
      this.canvasMiddlePoint,
      this.circleRadius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }

  renderClockPointer(
    ctx: CanvasRenderingContext2D,
    currentTimePercentage: number
  ) {
    const startAngleInRadians = Math.PI / 2;
    const endAngleInRadians =
      Math.PI * 2 * currentTimePercentage + startAngleInRadians;

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(
      this.canvasMiddlePoint,
      this.canvasMiddlePoint,
      this.circleRadius,
      startAngleInRadians,
      endAngleInRadians
    );
    ctx.stroke();
  }
}

export default ClockRender;
