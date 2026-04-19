// 1. Подключаем встроенный модуль
const http = require('http');

// 2. Создаем сервер
// Мы передаем в createServer функцию-обработчик. 
// Она как "дежурный", который просыпается при каждом запросе.
const server = http.createServer((req, res) => {
    // Пока что мы просто отправляем один и тот же ответ всем
    res.end('Hello! This is my first Node.js Server');
});

// 3. Заставляем сервер "слушать" определенный порт
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен! Адрес: http://localhost:${PORT}`);
    console.log('Нажмите Ctrl+C, чтобы остановить его.');
});
