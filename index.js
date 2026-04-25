let bookShelf = []; // List of books in the library

// Book constructor
class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.id = crypto.randomUUID();
	}
}

// Method to provide information about book instances
Book.prototype.info = function() {
	return `${this.title} by ${this.author}, ${this.pages}pages, ${this.read}`;
};

// Create and add a new book entry to library using details provided
function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	bookShelf.push(newBook);
}

// Remove book entry from the library
function removeBookFromLibrary(id) {
	bookShelf.filter(book => book.id !== id);
}

// Display a single book in the UI
function addBookToUI(book) {
	const shelf = document.querySelector(".shelf");
	const bookCard = document.createElement("div");
	bookCard.classList.add("book-card");
	const bookId = document.createElement("span");
	bookId.textContent = `${book.id}`;
	bookId.classList.add("book-id");
	const author = document.createElement("h4");
	author.textContent = book.author;
	author.classList.add("author");
	const readStatusBtn = document.createElement("button");
	readStatusBtn.textContent = book.read ? "Done reading" : "Not yet read";
	readStatusBtn.setAttribute("class", `status ${book.read ? "read" : ""}`);
	readStatusBtn.addEventListener("click", () => {
		book.read = !book.read;
		readStatusBtn.classList.toggle("read");
		readStatusBtn.textContent = book.read ? "Done reading" : "Not yet read";
	});
	const title = document.createElement("h2");
	title.textContent = book.title;
	title.classList.add("title");
	const pages = document.createElement("h3");
	pages.textContent = `${book.pages} Pages`;
	pages.classList.add("pages");
	const removeBtn = document.createElement("button");
	removeBtn.classList.add("delete-btn");
	removeBtn.textContent = "Delete";
	removeBtn.addEventListener("click", () => {
		shelf.removeChild(bookCard);
		bookShelf.length = 0;
		bookShelf
			.filter((b) => b.title !== book.title)
			.forEach((b) => bookShelf.push(b));
	});
	const div1 = document.createElement("div");
	div1.appendChild(pages);
	div1.appendChild(removeBtn);
	div1.classList.add("details-lower-section");
	const div2 = document.createElement("div");
	div2.appendChild(author);
	div2.appendChild(readStatusBtn);
	div2.appendChild(title);
	div2.classList.add("details-upper-section");
	const details = document.createElement("div");
	details.appendChild(div2);
	details.appendChild(div1);
	details.classList.add("details");
	bookCard.appendChild(bookId);
	bookCard.appendChild(details);
	shelf.appendChild(bookCard);
}

// Display all books currently in library to user
function displayBooks() {
	bookShelf.forEach(addBookToUI);
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	e.stopPropagation();
	const data = new FormData(form);
	addBookToLibrary(...Object.values(Object.fromEntries(data)));
	addBookToUI(bookShelf[bookShelf.length - 1]);
	form.reset();
	document.querySelector("dialog").close();
});

// Sample
addBookToLibrary("Eloquent JavaScript", "Marijn Haverbeke", 456, true);
addBookToLibrary("The Rust Programming Language", "Carol Nicoles", 624, false);
addBookToLibrary("C Programming: A Modern Approach", "K.N.King", 864, false);
addBookToLibrary(
	"The C programming Language",
	"Brian Kernighan, Dennis Ritchie",
	228,
	true,
);
displayBooks();
