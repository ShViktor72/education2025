const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
};

const server = http.createServer((req, res) => {
    // Определяем путь к файлу
    let url = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(__dirname, 'public', url);
    const ext = path.extname(filePath);

    // Проверяем наличие файла
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404: Страница города не найдена');
            return;
        }

        // Отдача файла через Stream
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
});