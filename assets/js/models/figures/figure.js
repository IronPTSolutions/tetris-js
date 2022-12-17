class Figure {

  constructor(ctx, x, y, color = 'red') {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.strokeColor = FIGURE_STOKE_COLOR;

    this.isFreeze = false;
    this.pieces = [];
    this.position = 1;
    this.maxPositions = 1;
    this.setupPieces();
  }

  transportTo(x, y) {
    this.x = x;
    this.y = y;
    this.setupPieces();
  }

  setupPieces() {
    this.pieces = [];
  } 

  onKeyEvent(event) {
    if (!this.isFreeze) {
      this.pieces.forEach(piece => piece.onKeyEvent(event))
    }
  }

  move() {
    if (!this.isFreeze) {
      this.pieces.forEach(piece => piece.move())
    }
  }

  draw() {
    this.pieces.forEach(piece => piece.draw())
  }

  rotate() {
    this.position++;
    if (this.position > this.maxPositions) {
      this.position = 1
    }
  }

  clone() {
    const figure =  Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    figure.pieces = figure.pieces.map(piece => Object.assign(Object.create(Object.getPrototypeOf(piece)), piece))
    return figure;
  }

  changeContext(ctx) {
    this.ctx = ctx;
    this.pieces.forEach(piece => piece.ctx = ctx)
  }
}
