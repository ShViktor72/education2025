const http = require('http');

// Наша имитация базы данных
let tasks = [
    { id: 1, title: 'Выучить основы Node.js', completed: false }
];

const server = http.createServer((req, res) => {
    // Устанавливаем заголовок JSON для всех ответов
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // --- МАРШРУТИЗАЦИЯ ---

    // 1. Получение всех задач
    if (req.url === '/tasks' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify(tasks));
    }

    // 2. Добавление новой задачи
    else if (req.url === '/tasks' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                // Валидация: проверим, прислал ли пользователь текст задачи
                if (!data.title) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ error: 'Поле title обязательно' }));
                }

                const newTask = {
                    id: tasks.length + 1,
                    title: data.title,
                    completed: false
                };

                tasks.push(newTask);

                res.statusCode = 201; // 201 означает "Успешно создано"
                res.end(JSON.stringify(newTask));
            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Некорректный JSON' }));
            }
        });
    }

    // 3. Обработка всех остальных запросов
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Маршрут не найден' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`API запущен на порту ${PORT}`);
});