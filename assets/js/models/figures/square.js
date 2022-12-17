class Square extends Figure {

  constructor(ctx, x, y, color = 'red', position = 0) {
    super(ctx, x, y, color);

    this.w = SQUARE_SIZE;
    this.h = SQUARE_SIZE;
    
    this.position = position;
    this.pieces = [this];
  }

  onKeyEvent(event) {
    if (event.type === 'keydown' && !this.isFreeze) {
      switch (event.keyCode) {
        case KEY_RIGHT:
          this.x += 1;
          break;
        case KEY_LEFT:
          this.x -= 1;
          break;
        case KEY_DOWN:
          this.y += 1;
          break;
      }
    }
  }
  
  move() {
    if (!this.isFreeze) {
      this.y += 1;
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x * this.w, this.y * this.h, this.w, this.h);
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.strokeRect(this.x * this.w, this.y * this.h, this.w, this.h);

    if (DEBUG) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.position, this.x * this.w + 6, this.y * this.h + this.h / 2);
    }

    this.ctx.restore();
  }

}
