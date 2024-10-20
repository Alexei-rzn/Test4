<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Турнирная таблица игры 2048">
    <title>Турнирная таблица 2048</title>
    <link rel="stylesheet" href="style.css">
    <style>
        table {
            width: 90%; /* Установим ширину таблицы на 90% */
            border-collapse: collapse;
            margin: 0 auto; /* Центрируем таблицу */
        }
        th, td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
        }
        @media (max-width: 600px) {
            table {
                width: 100%; /* Полная ширина на мобильных устройствах */
            }
        }
    </style>
</head>
<body>
    <div class="victory-container">
        <h2>Турнирная таблица</h2>
        <table id="leaderboard">
            <tr>
                <th>Имя</th>
                <th>Счёт</th>
                <th>Дата</th>
                <th>Макс. плитка</th>
                <th>Уровень сложности</th>
                <th>Доп. нажатия</th>
            </tr>
        </table>
        <button id="back-button" class="back-button">Назад к игре</button>
    </div>

    <script>
        // Загрузка таблицы лидеров
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
                    <th>Доп. нажатия</th>
                </tr>
            `;
            leaderboard.sort((a, b) => b.score - a.score).forEach(entry => {
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
    </script>
</body>
</html>
