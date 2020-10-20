const game = new Game();
const startButton = document.getElementById('begin-game');

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
startButton.addEventListener('click', (event) => {
    game.startGame();
    event.target.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});