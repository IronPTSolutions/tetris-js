class Square4x4 extends Figure {

  constructor(ctx, x, y, color = 'red') {
    super(ctx, x, y, color);
  }

  setupPieces() {
    this.pieces = [
      new Square(this.ctx, this.x, this.y, this.color, 0),
      new Square(this.ctx, this.x, this.y + 1, this.color, 1),
      new Square(this.ctx, this.x + 1, this.y, this.color, 2),
      new Square(this.ctx, this.x + 1, this.y + 1, this.color, 3),
    ]
  }

}