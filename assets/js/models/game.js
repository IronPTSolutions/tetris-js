class Game {
  
  constructor(canvasId, scoreContainerId, nextFigureCanvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = W_SQUARES * SQUARE_SIZE;
    this.canvas.height = H_SQUARES * SQUARE_SIZE;
    this.ctx = this.canvas.getContext('2d');

    this.figure = undefined;
    this.nextFigure = undefined;
    this.matrix = new Matrix(this.ctx);

    this.nextFigurePanel = new NextFigurePanel(nextFigureCanvasId);
    this.score = new Score(scoreContainerId);

    this.drawIntervalId = undefined;
    this.moveDownIntervalId = undefined;
    this.fps = 1000 / 60;
    this.prepareNextFigure();
    this.onGameOver = () => {}
  }

  dropFigure() {
    this.figure = this.nextFigure;
    this.prepareNextFigure();
    if (!this.matrix.fits(this.figure)) {
      this.gameOver()
    }
  }

  prepareNextFigure() {
    const color = Utils.randomColor();
    const x = parseInt(W_SQUARES / 2);
    const y = 0;
    const index = Math.floor(Math.random() * 6);
    switch (index) {
      case 0:
        this.nextFigure = new LL(this.ctx, x, y, color);
        break;
      case 1:
        this.nextFigure = new LR(this.ctx, x, y, color);
        break;
      case 2:
        this.nextFigure = new Line(this.ctx, x, y, color);
        break;
      case 3:
        this.nextFigure = new SkewL(this.ctx, x, y, color);
        break;
      case 4:
        this.nextFigure = new SkewR(this.ctx, x, y, color);
        break;
      case 5:
        this.nextFigure = new Square4x4(this.ctx, x, y, color);
        break;
      case 6:
        this.nextFigure = new T(this.ctx, x, y, color);
        break;
    }
    this.nextFigurePanel.setupFigure(this.nextFigure);
  }

  start() {
    if (!this.drawIntervalId) {
      this.dropFigure();
      this.moveDownIntervalId = setInterval(() => this.move(), MOVE_BACK_OFF_MS);
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.draw();
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    clearInterval(this.moveDownIntervalId);
    this.drawIntervalId = undefined;
    this.moveDownIntervalId = undefined
  }

  gameOver() {
    console.log('Game Over');
    this.figure.draw();
    this.stop();
    this.onGameOver(this.score);
  }

  onKeyEvent(event) {
    if (event.type === 'keydown' && !this.isFreeze) {
      switch (event.keyCode) {
        case KEY_ROTATE:
          if (this.matrix.fits(this.figure, 'rotate')) {
            this.figure.rotate();
          }
          break;
        case KEY_DOWN:
          if (this.matrix.fits(this.figure, 'down')) {
            this.figure.onKeyEvent(event);
            this.score.scoreUp();
          }
          break;
        case KEY_RIGHT:
          if (this.matrix.fits(this.figure, 'right')) {
            this.figure.onKeyEvent(event);
          }
          break;
        case KEY_LEFT:
          if (this.matrix.fits(this.figure, 'left')) {
            this.figure.onKeyEvent(event);
          }
          break;
      }
    }
  }

  clear() {
    this.ctx.save();
    this.ctx.fillStyle = CANVAS_BG_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  move() {
    if (this.matrix.fits(this.figure, 'down')) {
      this.figure.move();
      this.score.scoreUp();
    } else {
      this.figure.isFreeze = true;
      const completedLines = this.matrix.fill(this.figure);
      this.score.lineUp(completedLines);
      this.score.scoreUp(completedLines * POINTS_BY_LINE);
      this.dropFigure();
    }
  }

  draw() {
    this.matrix.draw();
    this.figure.draw();
    this.score.render();
    this.nextFigurePanel.draw();
  }

}