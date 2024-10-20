const undoButton = document.getElementById("undo");
const deleteTileButton = document.getElementById("delete");
const shuffleButton = document.getElementById("shuffle");
const addFundsButton = document.getElementById("add-funds");
const restartButton = document.getElementById("restart");
const rulesButton = document.getElementById("rules");
const ratingButton = document.getElementById("rating");
const soundButton = document.getElementById("sound");
const soundIcon = document.getElementById("sound-icon");
const submitScoreButton = document.getElementById("submit-score");
const gameOverDisplay = document.getElementById("game-over");
const playerNameInput = document.getElementById("player-name");
const difficultyButton = document.getElementById("difficulty");

// Инициализация текущего уровня сложности
let currentDifficulty = 0;
difficultyButton.innerText = currentDifficulty + 1; // Устанавливаем текст кнопки

// Ход назад
undoButton.addEventListener("click", () => {
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

// Показать и скрыть режим удаления плиток
deleteTileButton.addEventListener("mousedown", () => {
    deleteTileButton.classList.add("active");
    deleteTile();
});

deleteTileButton.addEventListener("mouseup", () => {
    deleteTileButton.classList.remove("active");
});

// Логика получения индекса плитки
function getTileIndex(tile) {
    const index = Array.from(tile.parentNode.children).indexOf(tile);
    const rowIndex = Math.floor(index / 4);
    const colIndex = index % 4;
    return [rowIndex, colIndex];
}

// Перемешивание плиток
shuffleButton.addEventListener("click", () => {
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
addFundsButton.addEventListener("click", () => {
    game.balance += 50;
    game.additionalClicks++; // Увеличиваем счетчик нажатий
    game.updateGrid(); // Обновление интерфейса
});

// Уровень сложности
difficultyButton.addEventListener("click", () => {
    currentDifficulty = (currentDifficulty + 1) % 5; // Циклический переход по уровням
    difficultyButton.innerText = currentDifficulty + 1; // Обновляем текст кнопки
    game.setDifficulty(currentDifficulty); // Устанавливаем уровень сложности
});

// Перезапуск игры
restartButton.addEventListener("click", () => {
    gameOverDisplay.classList.add("hidden");
    game.initGame(); // Инициализация новой игры
});

// Переход на страницу таблицы лидеров
ratingButton.addEventListener("click", () => {
    window.location.href = "victory.html"; // Переход на страницу таблицы лидеров
});

// Переход на страницу правил
rulesButton.addEventListener("click", () => {
    window.location.href = "rules.html"; // Переход на страницу правил
});

// Управление звуком
soundButton.addEventListener("click", () => {
    game.soundEnabled = !game.soundEnabled; // Переключаем состояние звука
    soundIcon.src = game.soundEnabled ? "sound-on.png" : "sound-off.png"; // Меняем иконку
});

// Сохранение результата в таблицу лидеров
submitScoreButton.addEventListener("click", () => {
    const name = playerNameInput.value.trim();
    if (name) {
        game.saveToLeaderboard(name, difficultyButton.innerText); // Сохраняем результат
        playerNameInput.value = ''; // Очищаем поле ввода
        gameOverDisplay.classList.add("hidden"); // Скрываем окно окончания игры
        game.initGame(); // Перезагрузка игры
    } else {
        alert("Пожалуйста, введите ваше имя!");
    }
});
