class CanvasHandler {
  _clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  _rescaleCanvasToFitOnScreen(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const screenHeight = window.innerHeight - 230;
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

export default CanvasHandler;
