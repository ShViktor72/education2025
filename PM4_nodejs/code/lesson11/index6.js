const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = ''; // Сюда будем складывать кусочки данных

        // 1. Слушаем порции данных
        req.on('data', chunk => {
            // chunk — это Buffer (байты), превращаем его в строку и добавляем в body
            body += chunk.toString();
        });

        // 2. Когда данные закончились
        req.on('end', () => {
            console.log('Данные получены:', body);
            
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Сервер получил ваши данные: ${body}`);
        });

    } else {
        res.writeHead(405);
        res.end('Используйте POST запрос');
    }
});

server.listen(3000);