class SkewL extends Figure {

  constructor(ctx, x, y, color = 'red') {
    super(ctx, x, y, color);
    this.maxPositions = 2;
  }

  setupPieces() {
    this.pieces = [
      new Square(this.ctx, this.x, this.y, this.color, 0),
      new Square(this.ctx, this.x, this.y + 1, this.color, 1),
      new Square(this.ctx, this.x + 1, this.y + 1, this.color, 2),
      new Square(this.ctx, this.x + 1, this.y + 2, this.color, 3),
    ]
  }

  rotate() {
    if (this.position == 1) {
      this.pieces[0].x += 2;

      this.pieces[1].x += 1;
      this.pieces[1].y -= 1;

      this.pieces[3].y -= 1;
      this.pieces[3].x -= 1;
    } else if (this.position == 2) {
      this.pieces[0].x -= 2;

      this.pieces[1].x -= 1;
      this.pieces[1].y += 1;

      this.pieces[3].y += 1;
      this.pieces[3].x += 1;
    }

    super.rotate();
  }

}