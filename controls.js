import { Game2048 } from './game2048.js';

const game = new Game2048();

// Ход назад
document.getElementById("undo").addEventListener("click", () => {
    if (game.history.length > 0 && game.balance >= 30) {
        game.grid = game.history.pop();  // Восстанавливаем последнее состояние
        game.balance -= 30;  // Списываем 30 баллов
        game.additionalClicks++; // Увеличиваем счетчик нажатий
        game.updateGrid(); // Обновление интерфейса
    }
});

// Удаление плитки
function deleteTile() {
    if (game.balance >= 50) {
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach(tile => {
            tile.addEventListener("click", () => {
                const tileValue = parseInt(tile.innerText);
                if (tileValue > 0) {
                    const [rowIndex, colIndex] = getTileIndex(tile);
                    game.grid[rowIndex][colIndex] = 0; // Удаляем плитку
                    tile.innerText = ''; // Обновляем интерфейс
                    game.balance -= 50; // Списываем 50
                    game.additionalClicks++; // Увеличиваем счетчик нажатий
                    game.updateGrid(); // Обновление интерфейса
                    game.saveState(); 
                }
            }, { once: true });
        });
    }
}

// Логика получения индекса плитки
function getTileIndex(tile) {
    const index = Array.from(tile.parentNode.children).indexOf(tile);
    const rowIndex = Math.floor(index / 4);
    const colIndex = index % 4;
    return [rowIndex, colIndex];
}

// Перемешивание плиток
document.getElementById("shuffle").addEventListener("click", () => {
    if (game.balance >= 20) {
        shuffleTiles();
        game.balance -= 20;
        game.additionalClicks++; // Увеличиваем счетчик нажатий
        game.updateGrid(); // Обновление интерфейса
        game.saveState();
    }
});

// Логика перемешивания плиток
function shuffleTiles() {
    const flattenedGrid = game.grid.flat();
    flattenedGrid.sort(() => Math.random() - 0.5); // Перемешиваем массив
    for (let i = 0; i < 4; i++) {
        game.grid[i] = flattenedGrid.slice(i * 4, (i + 1) * 4);
    }
}

// Пополнение баланса
document.getElementById("add-funds").addEventListener("click", () => {
    game.balance += 50;
    game.additionalClicks++; // Увеличиваем счетчик нажатий
    game.updateGrid(); // Обновление интерфейса
});

// Уровень сложности
document.getElementById("difficulty").addEventListener("click", () => {
    currentDifficulty = (currentDifficulty + 1) % 5; // Циклический переход по уровням
    document.getElementById("difficulty").innerText = currentDifficulty + 1; // Обновляем текст кнопки
    game.setDifficulty(currentDifficulty); // Устанавливаем уровень сложности
});

// Перезапуск игры
document.getElementById("restart").addEventListener("click", () => {
    gameOverDisplay.classList.add("hidden");
    game.initGame(); // Инициализация новой игры
});

// Переход на страницу таблицы лидеров
document.getElementById("rating").addEventListener("click", () => {
    window.location.href = "victory.html"; // Переход на страницу таблицы лидеров
});

// Управление звуком
document.getElementById("sound").addEventListener("click", () => {
    game.soundEnabled = !game.soundEnabled; // Переключаем состояние звука
    document.getElementById("sound-icon").src = game.soundEnabled ? "sound-on.png" : "sound-off.png"; // Меняем иконку
});

// Сохранение результата в таблицу лидеров
document.getElementById("submit-score").addEventListener("click", () => {
    const name = game.playerNameInput.value.trim();
    if (name) {
        game.saveToLeaderboard(name, document.getElementById("difficulty").innerText); // Сохраняем результат
        game.playerNameInput.value = ''; // Очищаем поле ввода
        gameOverDisplay.classList.add("hidden"); // Скрываем окно окончания игры
        game.initGame(); // Перезагрузка игры
    } else {
        alert("Пожалуйста, введите ваше имя!");
    }
});
