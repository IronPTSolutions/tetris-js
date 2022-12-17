class Matrix {

  constructor(ctx) {
    this.ctx = ctx;

    this.squares = [];
    this.grid = [];

    this.init();
    this.initGrid();
  }

  init() {
    this.squares = [];
    for (let y = 0; y < H_SQUARES; y++) {
      this.squares.push(new Array(W_SQUARES).fill(null))
    }
  }

  initGrid() {
    this.grid = [];
    for (let y = 0; y < H_SQUARES; y++) {
      let squares = [];
      for (let x = 0; x < W_SQUARES; x++) {
        const square = new Square(this.ctx, x, y, CANVAS_BG_COLOR);
        square.strokeColor = MATRIX_GRID_COLOR;
        squares.push(square)
      }
      this.grid.push(squares)
    }
  }

  /**
   * Fill new square in the matrix, shift completed lines and return the number of completed lines
   */
  fill(figure) {
    figure.pieces.forEach(square => this.squares[square.y][square.x] = square)
    return this.shift();
  }

  fits(figure, movement = 'still') {
    let x = 0;
    let y = 0;
    switch (movement) {
      case 'rotate':
        figure = figure.clone();
        figure.rotate();
        break;
      case 'left':
        x = -1
        break;
      case 'right':
        x = 1;
        break;
      case 'down':
        y = 1;
        break;
    }
    return figure.pieces.every(piece => 
        piece.x + x >= 0 && piece.y + y >= 0 && 
        piece.x + x < W_SQUARES && piece.y + y < H_SQUARES && 
        this.squares[piece.y + y][piece.x + x] === null)
  }

  shift() {
    let lines = 0;
    for (let y = 0; y < H_SQUARES; y++) {
      const isLineCompleted = this.squares[y].every(square => square !== null);
      if (isLineCompleted) {
        lines++;
        for (let j = y; j >= 0; j--) {
          if (j === 0) {
            this.squares[j] = new Array(W_SQUARES).fill(null);
          } else {
            this.squares[j] = this.squares[j - 1]
            this.squares[j].forEach(square => square?.move())
          }
        }
      }
    }
    return lines;
  }

  draw() {
    this.grid.forEach(squares => squares.forEach(square => square.draw()));

    for (let y = 0; y < H_SQUARES; y++) {
      for (let x = 0; x < W_SQUARES; x++) {
        const square = this.squares[y][x];
        if (square) {
          square.draw();
        }
      }
    }
  }

}