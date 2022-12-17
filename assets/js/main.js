window.addEventListener('load', () => {
  const btnRestart = document.getElementById('btn-restart');
  btnRestart.addEventListener('click', () => location.reload());

  const game = new Game('main-canvas', 'score-container', 'next-figure-canvas');
  game.start();

  game.onGameOver = (score) => {
    const gameOverPanel = document.getElementById('game-over-panel');
    gameOverPanel.style.display = 'block';

    const gamePanel = document.getElementById('game-panel');
    gamePanel.style.display = 'none';

    
    const gameOverScore = document.getElementById('game-over-score');
    gameOverScore.textContent = score.score;
  }

  document.addEventListener('keydown', (event) => game.onKeyEvent(event))
  document.addEventListener('keyup', (event) => game.onKeyEvent(event))

});
