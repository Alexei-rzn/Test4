// game.js
import { Game2048 } from './game2048.js';

const game = new Game2048();

document.getElementById("mode").addEventListener("click", () => {
    game.toggleMode(); // Переключение режима
});

game.start();
