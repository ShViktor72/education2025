// XMLHttpRequest
let xhr = new XMLHttpRequest();  // 1. Создаём объект

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");  
// 2. Говорим: хотим сделать запрос "GET" по адресу (URL)

xhr.send();  
// 3. Отправляем запрос

xhr.onload = function() {        // 4. Ждём, когда придёт ответ
  if (xhr.status === 200) {      // Проверяем, что запрос прошёл успешно
    console.log("Ответ сервера:", xhr.responseText);
  } else {
    console.error("Ошибка:", xhr.status);
  }
};


// fetch
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json()) // преобразуем ответ в JSON
  .then(data => console.log("Данные:", data))
  .catch(error => console.error("Ошибка:", error));



async function getPost() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await response.json();
    console.log("Данные:", data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

getPost();

// POST
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST", // отправка данных
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Пример",
    body: "Текст сообщения",
    userId: 1
  })
})
  .then(response => response.json())
  .then(data => console.log("Создано:", data));
  
// 👉 Пример проверки:
fetch("https://jsonplaceholder.typicode.com/unknown")
  .then(response => {
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
  
// fetch и промисы
let promise = fetch("https://jsonplaceholder.typicode.com/posts/1");
console.log(promise); // Promise { <pending> }


fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => {
    console.log("Статус:", response.status); // 200
    return response.json(); // парсим тело ответа в JSON
  })
  .then(data => {
    console.log("Данные:", data); // объект с постом
  });
  
// catch
fetch("https://jsonplaceholder.typicode.com/unknown") // неправильный URL
  .then(response => {
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Ошибка запроса:", error.message));
  
// Последовательная обработка
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(post => {
    console.log("Заголовок поста:", post.title);
    return fetch("https://jsonplaceholder.typicode.com/users/" + post.userId);
  })
  .then(res => res.json())
  .then(user => console.log("Автор поста:", user.name))
  .catch(err => console.error("Ошибка:", err));
  
// async/await для HTTP-запросов
async function getPost() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await response.json(); // ждём, пока ответ превратится в JSON
    console.log("Пост:", data);
  } catch (error) {
    console.error("Ошибка сети:", error);
  }
}

getPost();


// Проверка успешности ответа
async function getData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/unknown");

    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }

    let data = await response.json();
    console.log("Данные:", data);

  } catch (error) {
    console.error("Запрос не удался:", error.message);
  }
}

getData();

// Последовательные запросы

async function getPostAndUser() {
  try {
    let postRes = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let post = await postRes.json();

    let userRes = await fetch("https://jsonplaceholder.typicode.com/users/" + post.userId);
    let user = await userRes.json();

    console.log("Пост:", post.title);
    console.log("Автор:", user.name);
  } catch (e) {
    console.error("Ошибка:", e);
  }
}

getPostAndUser();

// Параллельные запросы
async function getParallel() {
  try {
    let [postsRes, usersRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/users")
    ]);

    let posts = await postsRes.json();
    let users = await usersRes.json();

    console.log("Всего постов:", posts.length);
    console.log("Всего пользователей:", users.length);
  } catch (e) {
    console.error("Ошибка:", e);
  }
}

getParallel();

// Сетевые ошибки
async function networkErrorDemo() {
  try {
    let response = await fetch("https://wrong-domain.example.com/data");
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Сетевая ошибка:", err.message);
  }
}
networkErrorDemo();

// Ошибки статуса ответа
async function statusErrorDemo() {
  let response = await fetch("https://jsonplaceholder.typicode.com/unknown");

  if (!response.ok) {
    console.error("Ошибка HTTP:", response.status); // 404
    return;
  }

  let data = await response.json();
  console.log(data);
}

statusErrorDemo();

// Комбинированный подход
async function safeFetch() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/unknown");

    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }

    let data = await response.json();
    console.log("Данные:", data);

  } catch (error) {
    console.error("Запрос не удался:", error.message);
  }
}

safeFetch();

// Практические примеры с открытыми API
// Курсы валют — ExchangeRate API
async function getRates() {
  let res = await fetch("https://open.er-api.com/v6/latest/USD");
  let data = await res.json();
  console.log("Курс USD к EUR:", data.rates.EUR);
  console.log("Курс USD к JPY:", data.rates.JPY);
}

getRates();

//Случайная цитата — Quotable API
async function getQuote() {
  let res = await fetch("https://api.quotable.io/random");
  let data = await res.json();
  console.log(`"${data.content}" — ${data.author}`);
}

getQuote();

// Данные о стране — REST Countries API
async function getCountry() {
  let res = await fetch("https://restcountries.com/v3.1/name/france");
  let data = await res.json();
  console.log("Страна:", data[0].name.common);
  console.log("Столица:", data[0].capital[0]);
  console.log("Регион:", data[0].region);
}

getCountry();

// Случайный пользователь — Random User Generator
async function getUser() {
  let res = await fetch("https://randomuser.me/api/");
  let data = await res.json();
  let user = data.results[0];
  console.log("Имя:", user.name.first, user.name.last);
  console.log("Email:", user.email);
  console.log("Страна:", user.location.country);
}

getUser();

//Картинка кота  — The Cat API
async function getCat() {
  let res = await fetch("https://api.thecatapi.com/v1/images/search");
  let data = await res.json();
  console.log("Картинка кота:", data[0].url);
}

getCat();