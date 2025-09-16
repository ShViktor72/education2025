// Класс ProductCard реализует логику, связанную с одной карточкой товара.
// управляет данными, DOM-элементами.
class ProductCard {
    // приватное поле для хранения объекта с данными о товаре.
    // Использование `#` делает поле недоступным извне класса.
    #data;
    // приватное поле для хранения DOM-элемента, представляющего карточку.
    #element;

    // Публичный конструктор. Принимает данные товара и родительский элемент,
    // куда будет добавлена карточка.
    constructor(data, parentElement) {
        // Сохраняем переданные данные в приватном поле.
        this.#data = data;
        // Сохраняем ссылку на родительский контейнер.
        this.parentElement = parentElement;
    }

    // Публичный метод render() отвечает за создание HTML-структуры карточки
    // и добавление её на страницу.
    render() {
        // Создаём корневой элемент div для карточки.
        this.#element = document.createElement('div');
        // Добавляем CSS-класс для стилизации.
        this.#element.classList.add('product-card');

        // Используем шаблонные строки для создания внутренней разметки.
        // Структура разделена на контейнер для изображения и блок с информацией.
        this.#element.innerHTML = `
            <div class="product-image-container">
                <img src="${this.#data.image}" alt="${this.#data.title}">
            </div>
            <div class="product-info">
                <h3>${this.#data.title}</h3>
                <div class="product-footer">
                    <p class="product-price">${this.#data.price}</p>
                    <button class="add-to-cart-btn">Добавить в корзину</button>
                </div>
            </div>
        `;

        // Вызываем приватный метод для добавления слушателей событий.
        this.#attachEvents();
        // Добавляем созданную карточку в родительский элемент на странице.
        this.parentElement.appendChild(this.#element);
    }

    // Приватный метод #attachEvents() навешивает все необходимые обработчики событий.
    #attachEvents() {
        // Добавляем слушатель для события 'mouseenter' (наведение мыши).
        // Используем стрелочную функцию, чтобы сохранить контекст this.
        this.#element.addEventListener('mouseenter', () => this.#handleMouseEnter());
        
        // Добавляем слушатель для события 'mouseleave' (уход мыши).
        this.#element.addEventListener('mouseleave', () => this.#handleMouseLeave());

        // Находим кнопку "Добавить в корзину" внутри нашей карточки.
        const cartButton = this.#element.querySelector('.add-to-cart-btn');
        // Добавляем слушатель для клика по кнопке.
        cartButton.addEventListener('click', () => {
            // Создаём кастомное событие 'addToCart'.
            const addToCartEvent = new CustomEvent('addToCart', {
                // bubbles: true позволяет событию "всплывать" вверх по DOM-дереву,
                // что позволяет слушать его на уровне документа.
                bubbles: true,
                // detail передаёт данные о товаре вместе с событием.
                detail: { product: this.#data }
            });
            // Отправляем (диспатчим) кастомное событие от DOM-элемента карточки.
            this.#element.dispatchEvent(addToCartEvent);
        });
    }

    // Приватный метод #handleMouseEnter() обрабатывает наведение мыши.
    #handleMouseEnter() {
        // Добавляем CSS-класс 'hovered' для запуска анимации.
        this.#element.classList.add('hovered');
    }

    // Приватный метод #handleMouseLeave() обрабатывает уход мыши.
    #handleMouseLeave() {
        // Удаляем CSS-класс 'hovered', чтобы сбросить анимацию.
        this.#element.classList.remove('hovered');
    }
}

// --- ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ---
// Пример данных о товарах, которые будут использоваться для создания карточек.
const products = [
    { title: "Наушники X100", price: "49900 T", image: "https://m.media-amazon.com/images/I/61-0dR5fsdL._AC_UY654_QL65_.jpg" },
    { title: "Игровая мышь GX200", price: "29900 T", image: "https://compress.ru/img/post/2015/03/30/genius-gx-gaming-gila.jpg" },
    { title: "Клавиатура ProKey", price: "39900 T", image: "https://extremecomp.ru/media/img/330000/337182_v01_b.jpg" }
];

// Находим контейнер на странице, куда будут добавлены карточки.
const productsContainer = document.getElementById('products');

// Перебираем массив данных и для каждого элемента создаём новый экземпляр ProductCard,
// а затем вызываем его метод render() для отображения на странице.
products.forEach(productData => {
    const card = new ProductCard(productData, productsContainer);
    card.render();
});

// Добавляем  слушатель на документ для  события 'addToCart'.
// обработчик событий , который "слушает" происходящее на всей веб-странице
// Благодаря bubbles: true, событие "всплывает" до этого уровня и мы можем его поймать.
document.addEventListener('addToCart', (event) => {
    // Выводим в консоль данные о товаре, переданные через event.detail.
    console.log('Товар добавлен в корзину:', event.detail.product);
});