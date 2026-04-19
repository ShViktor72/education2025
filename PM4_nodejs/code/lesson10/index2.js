const http = require('http');

const server = http.createServer((req, res) => {
    // Читаем данные из req
    const userAgent = req.headers['user-agent'];
    const url = req.url;

    //res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // Формируем ответ на основе данных запроса
    res.write(`<h1>Ваш отчет:</h1>`);
    res.write(`<p>Вы запрашивали страницу: <b>${url}</b></p>`);
    res.write(`<p>Ваш браузер: ${userAgent}</p>`);    
    res.end();
});

// 3. Заставляем сервер "слушать" определенный порт
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен! Адрес: http://localhost:${PORT}`);
    console.log('Нажмите Ctrl+C, чтобы остановить его.');
});


