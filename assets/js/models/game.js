class Game {
  
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = W_SQUARES * SQUARE_SIZE;
    console.log(this.canvas.width / W_SQUARES);
    this.canvas.height = H_SQUARES * SQUARE_SIZE;
    this.ctx = this.canvas.getContext('2d');

    this.figure = new Square(this.ctx, 0, 0);

    this.drawIntervalId = undefined;
    this.fps = 1000;
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.draw();
        
      }, this.fps);
    }
  }

  draw() {
    this.figure.draw();
  }

}