// демонстрация блокирующей задачи
console.log("Начало");

function heavy() {
    let start = Date.now();
    while (Date.now() - start < 5000) {
        // 5 секунд процессора!
    }
    console.log("Тяжёлая задача завершена");
}

heavy();
console.log("Конец");

// Пример (асинхронность через setTimeout):
console.log("1");

setTimeout(() => {
  console.log("2 (через 1 секунду)")
}, 1000);

console.log("3");


// HTTP-запрос
console.log("Запрос отправлен...");

fetch("https://jsonplaceholder.typicode.com/posts/10")
    .then(response => {
        // Ответ приходит в формате JSON, нужно преобразовать
        return response.json();
    })
    .then(data => {
        console.log("Ответ получен:", data);
    })
    .catch(error => {
        console.error("Ошибка при запросе:", error);
    });

console.log("Код продолжает выполняться...");

// Мигающее сообщение
// <p id="msg">Hello</p>

let visible = true;

setInterval(() => {
    const p = document.getElementById("msg");
    p.style.visibility = visible ? "hidden" : "visible";
    visible = !visible;
}, 500);
