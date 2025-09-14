// Заготовка классов — студентам нужно реализовать методы

export class Book {
  #id;
  #title;
  #author;
  #price;
  #image;

  constructor(id, data) {
    this.#id = id;
    this.#title = data.title;
    this.#author = data.author;
    this.#price = data.price;
    this.#image = data.image;
  }

  // TODO: метод render() для отображения книги
  render(parent, cart) {}

  // TODO: метод getData() для возврата данных книги
  getData() {}
}

export class Cart {
  #items = [];

  constructor() {
    this.load();
  }

  // TODO: метод add() для добавления книги
  add(book) {}

  save() {
    localStorage.setItem("cart", JSON.stringify(this.#items));
  }

  load() {
    this.#items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  // TODO: метод render() для отображения корзины
  render(parent) {}
}

export class BookStore {
  #books = [];

  constructor() {
    this.loadBooks();
  }

  // TODO: метод addBook() для добавления книги
  addBook(book) {}

  saveBooks() {
    localStorage.setItem("books", JSON.stringify(this.#books));
  }

  loadBooks() {
    this.#books = JSON.parse(localStorage.getItem("books")) || [];
  }

  // TODO: метод render() для отображения всех книг
  render(parent, cart) {}
}
