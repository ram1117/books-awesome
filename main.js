class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('book-list'));
  }

  getBooks() {
    return this.books;
  }

  // Add a new book to the local storage
  addBook(book) {
    this.books.push(book);
    this.#writeLocalStorage();
  }

  // remove book from the container and update local storage
  removeBook(target) {
    if (target.tagName === 'BUTTON') {
      const divId = target.id.substring(target.id.indexOf('-') + 1);
      const divElement = document.getElementById(divId);
      divElement.parentNode.removeChild(divElement);
      this.books.forEach((item) => {
        if (item.id === parseInt(divId, 10)) {
          this.books.splice(this.books.indexOf(item), 1);
        }
      });
      this.#writeLocalStorage();
    }
  }

  #writeLocalStorage() {
    localStorage.setItem('book-list', JSON.stringify(this.books));
  }
}

// load booklist in main page 'display-book' section
function loadBooksList() {
  const displaySection = document.querySelector('.display-book-container');
  const books = new BookCollection();
  while (displaySection.firstChild) {
    displaySection.removeChild(displaySection.firstChild);
  }
  let i = 1;
  books.getBooks().forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    bookDiv.id = book.id;
    if (i % 2 === 0) { bookDiv.classList.add('book-card-grey'); }
    i += 1;
    bookDiv.innerHTML = `<div class='text-content'>
      <h4>"${book.title}"</h2>
      <h4>by ${book.author}</h3>
      </div>
    `;
    const removeButton = document.createElement('button');
    removeButton.classList.add('button-remove');
    removeButton.textContent = 'Remove';
    removeButton.id = `button-${book.id}`;
    bookDiv.appendChild(removeButton);
    displaySection.appendChild(bookDiv);
  });
  // event listener for the book container
  displaySection.onclick = function (event) {
    books.removeBook(event.target);
  };
}

window.onload = () => {
  // initialise booklist for the first time  with null array
  if (localStorage.getItem('book-list') === null) {
    const books = [];
    localStorage.setItem('book-list', JSON.stringify(books));
  }
  loadBooksList();
};

const bookForm = document.getElementById('form-book-submit');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
bookForm.onsubmit = (event) => {
  event.preventDefault();
  const books = new BookCollection();
  /* eslint-disable no-undef */
  books.addBook(new Book(Math.floor(Math.random() * 100000), bookTitle.value, bookAuthor.value));
  bookForm.reset();

  const alertDiv = document.querySelector('.fade-add-message');
  alertDiv.classList.toggle('fade-add-message-show');
  window.setTimeout(() => { alertDiv.classList.toggle('fade-add-message-show'); }, 1000);
};

// navigation menu functionality

const listbtn = document.getElementById('list-books-link');
const addBookBtn = document.getElementById('add-books-link');
const contactBtn = document.getElementById('contact-link');

const displayBk = document.querySelector('.display-book');
const addBk = document.querySelector('.add-book');
const contact = document.querySelector('.contact-section');
listbtn.onclick = function () {
  loadBooksList();
  displayBk.style.display = 'block';
  addBk.style.display = 'none';
  contact.style.display = 'none';
};

addBookBtn.onclick = function () {
  displayBk.style.display = 'none';
  addBk.style.display = 'block';
  contact.style.display = 'none';
};

contactBtn.onclick = function () {
  displayBk.style.display = 'none';
  addBk.style.display = 'none';
  contact.style.display = 'block';
};