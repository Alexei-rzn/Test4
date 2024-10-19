// Функция для загрузки таблицы лидеров
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardTable = document.getElementById('leaderboard');
    leaderboardTable.innerHTML = `
        <tr>
            <th>Имя</th>
            <th>Счёт</th>
            <th>Дата</th>
            <th>Макс. плитка</th>
            <th>Уровень сложности</th>
            <th>Доп. кнопки</th>
        </tr>
    `;
    leaderboard.filter(entry => entry.tile === 2048 || new Date(entry.date).toDateString() === new Date().toDateString())
    .sort((a, b) => b.score - a.score).forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td><td>${entry.date}</td><td>${entry.tile}</td><td>${entry.difficulty}</td><td>${entry.additionalClicks}</td>`;
        leaderboardTable.appendChild(row);
    });
}

// Обработчик для кнопки назад
document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "index.html"; // Переход обратно к игре
});

// Инициализация
loadLeaderboard(); // Загрузка таблицы лидеров
