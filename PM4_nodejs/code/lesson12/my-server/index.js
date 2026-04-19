const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {
    // 1. Формируем путь к файлу в папке 'public'
    // Если зашли на '/', отдаем index.html, иначе берем имя из URL
    const fileName = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(__dirname, 'public', fileName);

    // 2. Определяем расширение файла
    const ext = path.extname(filePath);

    // 3. Мапа MIME-типов
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.ico': 'image/x-icon'
    };

    // 4. Проверяем, существует ли файл
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404: Файл не найден');
            return;
        }

        // 5. Отдаем файл потоком (Stream) с нужным типом
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

server.listen(3000, () => {
    console.log('Сервер статики запущен на http://localhost:3000');
});