class Square4x4 extends Figure {

  constructor(ctx, x, y, color = 'red') {
    super(ctx, x, y, color);

    this.pieces = [
      new Square(this.ctx, x, y, color, 0),
      new Square(this.ctx, x, y + 1, color, 1),
      new Square(this.ctx, x + 1, y, color, 2),
      new Square(this.ctx, x + 1, y + 1, color, 3),
    ]
  }

}