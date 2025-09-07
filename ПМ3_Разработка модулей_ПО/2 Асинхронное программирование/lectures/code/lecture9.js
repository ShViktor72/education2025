// Дрейф интервалов 
let count = 0;
const startTime = Date.now();
const myInterval = setInterval(() => {
    count++;
    const actualTime = Date.now() - startTime;
    const expectedTime = count * 1000;
    const drift = actualTime - expectedTime;
    
    console.log(`Прошло: ${actualTime} мс. Ожидалось: ${expectedTime} мс. Дрейф: ${drift} мс.`);
}, 1000);

function blockMainThread() {
    const start = Date.now();
    // Этот цикл будет работать примерно 3 секунды
    while (Date.now() - start < 3000) {
        // Просто ждём и ничего не делаем, но поток занят
    }
}

setTimeout(blockMainThread, 2000);

// самокорректирующийся таймер
let count = 0;
const startTime = Date.now();
const interval = 1000; // Наш желаемый интервал в 1000 мс

function scheduleNextCall() {
    count++;
    const actualTime = Date.now() - startTime; // Вычисляем, сколько времени прошло с начала
    const expectedTime = count * interval;     // Вычисляем, сколько времени должно было пройти
    const drift = actualTime - expectedTime;   // Вычисляем дрейф
    console.log(`Прошло: ${actualTime} мс. Ожидалось: ${expectedTime} мс. Дрейф: ${drift} мс.`);
    
    // Вычисляем, через сколько времени нужно запланировать следующий вызов
    // Если дрейф положительный, уменьшаем задержку
    // Если дрейф слишком большой, то следующая задержка будет 0, и функция вызовется сразу
    const nextCallIn = interval - drift;
    
    // Запускаем следующий вызов. Используем Math.max(0, nextCallIn), чтобы избежать отр. значений
    setTimeout(scheduleNextCall, Math.max(0, nextCallIn));
}

// Запускаем первый вызов, чтобы начать цепочку
setTimeout(scheduleNextCall, interval);

// Имитация "тяжёлой" работы, чтобы показать дрейф
function blockMainThread() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Блокируем поток на 3 секунды
    }
}

// Запускаем блокирующую функцию через 2 секунды
setTimeout(blockMainThread, 2000);

// Практические примеры
// обратный отсчет

// <p id="timer"></p>

let count = 10;
const timerEl = document.getElementById("timer");

const intervalId = setInterval(() => {
    timerEl.textContent = count;
    if (count === 0) {
        clearInterval(intervalId);
        timerEl.textContent = "🚀 Старт!";
    }
    count--;
}, 1000);

// Часы
// <p id="clock"></p>

function updateClock() {
    document.getElementById("clock")
        .textContent = new Date()
        .toLocaleTimeString();
}

updateClock(); // сразу показать
setInterval(updateClock, 1000);


// светофор
// <div id="light" style="width:100px; height:100px; border-radius:50%; background:red;"></div>

const light = document.getElementById("light");
const colors = ["red", "yellow", "green"];
let i = 0;

function changeColor() {
    light.style.background = colors[i];
    i = (i + 1) % colors.length;
    setTimeout(changeColor, i === 1 ? 500 : 2000);
    // жёлтый - 0.5 сек, остальные - 2 сек
}

changeColor();
