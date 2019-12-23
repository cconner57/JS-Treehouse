// Creates a new instance of the Game class
let game;

const btn = document.querySelector('#btn__reset');
btn.addEventListener('click', () => {
    game = new Game();
    game.startGame();
});
