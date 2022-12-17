class NextFigurePanel {
  
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 5 * SQUARE_SIZE;
    this.canvas.height = 5 * SQUARE_SIZE;
    this.ctx = this.canvas.getContext('2d');
    
    this.figure = undefined;
  }

  setupFigure(figure) {
    this.figure = figure.clone();
    this.figure.ctx = this.ctx;
    this.figure.pieces.forEach(figure => figure.ctx = this.ctx);
    this.figure.transportTo(1, 1);
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = CANVAS_BG_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    this.figure?.draw();
  }
  
}