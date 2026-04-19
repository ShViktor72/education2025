const http = require('http');

const server = http.createServer((req, res) => {
    // 1. Создаем объект URL (вторым аргументом передаем хост для корректной сборки)
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    
    // 2. Получаем чистый путь без параметров (например, "/products")
    const pathname = fullUrl.pathname;
    
    // 3. Получаем доступ к параметрам через searchParams
    const category = fullUrl.searchParams.get('category'); // "phones"
    const limit = fullUrl.searchParams.get('limit');       // "10"

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    if (pathname === '/search') {
        res.end(`<h1>Результаты поиска</h1>
                 <p>Категория: ${category}</p>
                 <p>Показать товаров: ${limit}</p>`);
    } else {
        res.end('Используйте /search?category=...&limit=...');
    }
});

server.listen(3000);