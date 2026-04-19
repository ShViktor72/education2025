const http = require('http');

const server = http.createServer((req, res) => {
    // 1. Извлекаем адрес из запроса
    const path = req.url;

    // 2. Устанавливаем общий заголовок для всех ответов
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // 3. Распределяем логику (Роутинг)
    switch (path) {
        case '/':
            res.statusCode = 200;
            res.end('<h1>Главная страница</h1>');
            break;

        case '/users':
            res.statusCode = 200;
            res.end('<h1>Список студентов</h1><ul><li>Иван</li><li>Мария</li></ul>');
            break;

        case '/api/status':
            // Пример ответа для мобильного приложения
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'OK', uptime: '100%' }));
            break;

        default:
            // Если адрес не совпал ни с одним из вышеуказанных
            res.statusCode = 404;
            res.end('<h1>404: Страница не найдена</h1>');
            break;
    }
});

// 3. Заставляем сервер "слушать" определенный порт
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен! Адрес: http://localhost:${PORT}`);
    console.log('Нажмите Ctrl+C, чтобы остановить его.');
});