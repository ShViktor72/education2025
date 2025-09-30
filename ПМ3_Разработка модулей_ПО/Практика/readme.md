# Интернет-магазин (учебный проект)

# 📂 Структура проекта интернет-магазина (на Fake Store API)
/project-root
│
├── index.html       // Главная + каталог
├── product.html     // Страница товара
├── cart.html        // Корзина
├── auth.html        // Вход / регистрация
│
├── /css
│   └── style.css    // Стили
│
├── /js
│   ├── api.js       // Работа с API
│   ├── models.js    // Классы (User, Product, Cart, CartItem)
│   ├── catalog.js   // Логика главной страницы
│   ├── product.js   // Логика страницы товара
│   ├── cart.js      // Логика корзины
│   ├── auth.js      // Логика входа/регистрации
│   └── common.js    // Общие функции (шапка, проверка авторизации)


## /js/models.js
# Классы, которые описывают объекты проекта.
class User {
  constructor(name, email, password) { ... }
  checkPassword(password) { ... }
}
👉 используется в auth.js для регистрации и входа.

class Product {
  constructor(id, title, price, description, image, category) { ... }
  renderCard() { ... }   // вернёт HTML карточки
}
👉 используется в catalog.js и product.js.

class CartItem {
  constructor(product, quantity = 1) { ... }
  getTotalPrice() { ... }
}
👉 используется в cart.js.

class Cart {
  constructor() { ... }
  addProduct(product) { ... }
  removeProduct(productId) { ... }
  getTotal() { ... }
  clear() { ... }
}
👉 используется в cart.js для управления корзиной.


## /js/api.js
Работа с Fake Store API.
	async function getProducts() — все товары.
	async function getProductById(id) — один товар.
	async function getCategories() — список категорий.
	async function getProductsByCategory(category) — товары по категории.
👉 используется в catalog.js и product.js.

## /js/catalog.js
Логика главной страницы (index.html).
	async function renderCatalog() — загрузить товары и отрисовать карточки.
	function renderProductCard(product) — создать карточку (можно через Product.renderCard()).
	function setupCategoryFilter() — фильтр по категориям.
	function setupSearch() — поиск (опционально).
👉 работает с классом Product, получает данные через api.js.

## /js/product.js
Логика страницы товара (product.html?id=ID).
    async function renderProduct() — загрузить товар по ID и показать его.
    function addToCart(product) — добавить товар в корзину.
👉 работает с Product, сохраняет через Cart.

## /js/cart.js
Логика корзины (cart.html).
    function getCart() — получить корзину из LocalStorage.
    function saveCart(cart) — сохранить корзину.
    function renderCart() — показать список товаров.
    function removeFromCart(id) — удалить товар.
    function updateCartCount() — обновить количество в шапке.
    function calculateTotal() — итоговая сумма.
👉 активно использует классы Cart и CartItem.

## /js/auth.js
Логика входа и регистрации (auth.html).
    function registerUser(name, email, password) — регистрация (создать User).
    function loginUser(email, password) — вход (проверить email+пароль).
    function logoutUser() — выход.
    function getCurrentUser() — получить текущего пользователя.
👉 использует класс User, хранит данные в LocalStorage.

## /js/common.js
Общие функции, которые нужны на всех страницах.
    function renderHeader() — шапка с учётом авторизации (Привет, Имя / Вход).
    function showGreeting() — вывод имени пользователя.
    function updateCartIcon() — обновить иконку корзины.
	
# Как это работает вместе:
- Пользователь открывает index.html → catalog.js берёт товары через api.js, создаёт объекты Product → рендерит карточки.
- Кликает на товар → попадает в product.html?id=5 → product.js загружает товар, создаёт Product, даёт кнопку «Добавить в корзину».
- Добавляет в корзину → Cart.addProduct() + сохранение в LocalStorage.
- Открывает корзину → cart.js берёт данные, создаёт Cart и CartItem, рендерит список и сумму.
- Авторизация → в auth.html создаётся User → сохраняется в LocalStorage → при входе проверяется пароль.
- На всех страницах → common.js проверяет, вошёл ли пользователь → в шапке либо «Привет, Имя», либо «Вход / Регистрация».


# Этапы реализации интернет-магазина (Fake Store API)
## Этап 1. Подключение к API и вывод списка товаров (выполнено)
Подключить api.js и реализовать функции:
getProducts() — получить все товары с https://fakestoreapi.com/products.
getProductById(id) — получить товар по ID.
В catalog.js:
При загрузке страницы (DOMContentLoaded) вызвать getProducts().
Вывести карточки товаров (фото, название, цена, кнопка «Подробнее»).
Проверить, что товары загружаются и отображаются на главной странице.

## Этап 2. Создание моделей (ООП)
В models.js описать классы:
Product (id, title, price, description, image, category, метод renderCard()).
User (id/email/password/name).
CartItem (product + quantity).
Cart (список товаров, методы: addItem(), removeItem(), getTotal()).
Подключить models.js во все страницы.
На главной заменить «сырой HTML» на генерацию карточек через Product.renderCard().

## Этап 3. Страница товара
В product.js:
Получить ID товара из URLSearchParams.
Вызвать getProductById(id) из api.js.
Отрисовать фото, название, цену, описание.
Сделать кнопку «Добавить в корзину» (сохранение в localStorage).
Добавить кнопки «В каталог» и «В корзину».

## Этап 4. Корзина
В cart.js:
Загрузить данные корзины из localStorage.
Отрисовать список товаров (название, цена, количество, кнопка «Удалить»).
Подсчитать итоговую сумму.
Реализовать кнопку «Оформить заказ» (пока просто alert("Заказ оформлен")).
Сделать кнопку «В каталог».

## Этап 5. Шапка (header)
В common.js:
Реализовать функцию renderHeader():
Логотип → ссылка на index.html.
Ссылки «Главная», «Корзина», «Вход/Регистрация».
Если пользователь вошёл → «Привет, [имя]» и кнопка «Выйти».
Подключить renderHeader() на всех страницах.

## Этап 6. Вход и регистрация
В auth.html:
Сделать две вкладки: «Вход» и «Регистрация».
Форма регистрации: email, пароль, имя.
Форма входа: email + пароль.
В auth.js:
При регистрации → сохранять пользователя в localStorage.
При входе → проверять email + пароль и сохранять в localStorage «текущего пользователя».
Реализовать функции:
getCurrentUser()
setCurrentUser(user)
logout()
В common.js:
Добавить отображение имени пользователя и кнопку «Выйти».

## Этап 7. Доработки и улучшения
Фильтрация товаров по категориям.
Поиск по названию.
Количество товаров в корзине (отображение в шапке).
Валидация форм входа/регистрации.
Анимации, стилизация карточек, адаптивная верстка.
Firebase вместо LocalStorage.
Хранение паролей в зашифрованном виде
Страница оформления заказа

# Шпаргалка по Fake Store API
## Базовый URL:

https://fakestoreapi.com

## 1. 📦 Товары
## 🔹 Все товары
GET https://fakestoreapi.com/products
👉 Вернёт массив всех товаров.
Пример:
const products = await fetch("https://fakestoreapi.com/products").then(r => r.json());
console.log(products);

## 🔹 Один товар
GET https://fakestoreapi.com/products/1
👉 Вернёт товар с id = 1.
Пример:
const product = await fetch("https://fakestoreapi.com/products/1").then(r => r.json());
console.log(product.title);

## 🔹 Все категории
GET https://fakestoreapi.com/products/categories
👉 Вернёт список категорий:
["electronics", "jewelery", "men's clothing", "women's clothing"]

## 🔹 Товары по категории
GET https://fakestoreapi.com/products/category/electronics
👉 Вернёт все товары из категории electronics.
