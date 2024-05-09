/* js dates */ 

function Book(title, author, year, read, id) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
    id = count;
} 

const books = [];

/* dark/light theme function */
const switcher = document.querySelector(".header img");
const root = document.documentElement;
let count = 0;

let light = true;
let dark = false;
switcher.addEventListener("click", function() {
    if (light) {
        light = false;
        dark = true;
        switcher.src = "moon_black.svg";
        root.style.setProperty('--main-color', 'black');
        root.style.setProperty('--second-color', 'white');
        root.style.setProperty('--third-color', 'lightgray');
        root.style.setProperty('--fourth-color', 'darkgray');
    }
    else if (dark) {
        light = true;
        dark = false;
        switcher.src = "sun_white.svg";
        root.style.setProperty('--main-color', 'white');
        root.style.setProperty('--second-color', 'black');
        root.style.setProperty('--third-color', 'darkgray');
        root.style.setProperty('--fourth-color', 'black');
    }
})

/* open/close a form */

const form = document.querySelector(".form");
const background = document.querySelector(".background");
const addButton = document.querySelector(".header button");
const addANewBook = document.querySelector(".form button");
const grid = document.querySelector(".grid-container");

addButton.addEventListener("click", function() {
    form.style.display = "flex";
    background.style.display = "flex";
})

const title = document.querySelector(".form .title");
const author = document.querySelector(".form .author");
const year = document.querySelector(".form .year");

let IsTitleValid = false;
let IsAuthorValid = false;
let IsYearValid = false;

addANewBook.addEventListener("click", function() {
    count++;
    const read = document.querySelector('input[type="checkbox"]');
    const titleOfNewBook = title.value;
    const authorOfNewBook = author.value;
    const yearOfNewBook = year.value;
    let isBookRead;
    if (read.checked) {
        isBookRead = true;
    }
    else {
        isBookRead = false;
    }
    const newBook = new Book(titleOfNewBook, authorOfNewBook, yearOfNewBook, isBookRead, count);
    const bookDiv = document.createElement("div");
    const titleP = document.createElement("p");
    const authorP = document.createElement("p");
    const yearP = document.createElement("p");
    const statusP = document.createElement("p");
    const deleteP = document.createElement("p");
    titleP.classList.add("title");
    authorP.classList.add("author");
    yearP.classList.add("year");
    statusP.classList.add("status");
    deleteP.classList.add("delete");
    /* start of delete card function */

    /* end of delete card function */
    bookDiv.id = `id${count}`;
    titleP.textContent = titleOfNewBook;
    authorP.textContent = authorOfNewBook;
    yearP.textContent = yearOfNewBook;
    if (isBookRead) {
        statusP.textContent = "read";
        statusP.style.backgroundColor = "green";
    } 
    else {
        statusP.textContent = "unread";
        statusP.style.backgroundColor = "red";
    }
    deleteP.textContent = "delete";
    deleteP.style.backgroundColor = "red";
    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(yearP);
    bookDiv.appendChild(statusP);
    bookDiv.appendChild(deleteP);
    bookDiv.classList.add("book");
    if (title.value.length >= 1) {
        IsTitleValid = true;
        title.style.border = "2px solid green";
    } else {
        IsTitleValid = false;
        title.style.border = "2px solid red";
    }
    if (author.value.length >= 1) {
        IsAuthorValid = true;
        author.style.border = "2px solid green";
    } else {
        IsAuthorValid = false;
        author.style.border = "2px solid red";
    }
    if (year.value.length >= 1) {
        IsYearValid = true;
        year.style.border = "2px solid green";
    } else {
        IsYearValid = false;
        year.style.border = "2px solid red";
    }
    if (IsTitleValid && IsAuthorValid && IsYearValid) {
        form.style.display = "none";
        background.style.display = "none";
        grid.appendChild(bookDiv);
        title.value = "";
        author.value = "";
        year.value = "";
        read.checked = false;
        title.style.border = "2px solid var(--second-color)";
        author.style.border = "2px solid var(--second-color)";
        year.style.border = "2px solid var(--second-color)";
        books.push(newBook);
    }
});




