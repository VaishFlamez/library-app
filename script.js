const submitButton = document.querySelector("#submit");

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class UI {
  static displayBooks() {
    // const DEFAULT_BOOKS = [
    //   {
    //     title: "Book 1",
    //     author: "author 1",
    //     pages: 69,
    //     status: "read",
    //   },
    //   {
    //     title: "Book 2",
    //     author: "author 2",
    //     pages: 99,
    //     status: "unread",
    //   },
    // ];
    const books = Store.getBooks();
    books.forEach((book) => UI.addBooksToList(book));
  }

  static addBooksToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.pages} </td>
    <td> ${book.status} </td>
    <td> <a href = "#" class = "delete"> Delete </a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(pages) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.pages === pages) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector(".add-books").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("#read").value;

  const book = new Book(title, author, pages, status);

  console.log(book);

  UI.addBooksToList(book);
  Store.addBook(book);
  UI.clearFields();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(
    e.target.parentElement.previousSibling.previousElementSibling.textContent
  );
});
