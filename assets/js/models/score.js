class Score {

  constructor(containerId) {
    this.scoreContainer = document.querySelector(`#${containerId} .score`);
    this.linesContainer = document.querySelector(`#${containerId} .lines`);

    this.score = 0;
    this.lines = 0;
  }

  scoreUp(amount = 1) {
    this.score += amount
  }

  lineUp(amount = 1) {
    this.lines += amount;
  }

  render() {
    this.scoreContainer.textContent = this.score;
    this.linesContainer.textContent = this.lines;
  }
}
