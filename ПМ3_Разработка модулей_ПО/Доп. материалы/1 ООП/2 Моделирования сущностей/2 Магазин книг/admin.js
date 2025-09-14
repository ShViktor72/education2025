import { Book, BookStore } from "./store.js";

const form = document.getElementById("bookForm");
const store = new BookStore();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  const id = Date.now().toString();
  const book = new Book(id, { title, author, price, image });

  // TODO: добавить книгу в BookStore
  // store.addBook(book);

  alert("Книга добавлена (сохранение пока не реализовано).");
  form.reset();
});
