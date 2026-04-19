const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/user') {
        let body = '';

        req.on('data', chunk => { body += chunk.toString(); });

        req.on('end', () => {
            // 1. Парсим входящие данные
            const userData = JSON.parse(body);
            
            // 2. Логика (например, "создаем" ID для пользователя)
            const responseData = {
                message: 'Пользователь успешно создан',
                userId: Math.floor(Math.random() * 1000),
                receivedData: userData
            };

            // 3. Отправляем JSON-ответ
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(responseData));
        });
    }
});

server.listen(3000);



