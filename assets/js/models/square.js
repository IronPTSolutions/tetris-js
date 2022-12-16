class Square {

  constructor(ctx, x, y, color = 'red') {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;

    this.w = SQUARE_SIZE;
    this.h = SQUARE_SIZE;
  }

  draw() {
    console.log('drawing square')
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x * this.w, this.y * this.h, this.w, this.h);
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(this.x * this.w, this.y * this.h, this.w, this.h);
    this.ctx.restore();
  }

}