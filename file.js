/* js dates */ 

function Book(title, author, year, read, id) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
    this.id = id;
} 

let books = [];

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
    console.log("ошибочка вышла");
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
    /* start of change of a status of a book */
    statusP.addEventListener("click", function() {
        const idToChange = statusP.parentElement.id.substring(2);
        const currentBooks = document.querySelectorAll(".book");
        for (const book of books) {
            if (book.id == idToChange) {
                if (book.read) {
                    book.read = false;
                    statusP.style.backgroundColor = "red";
                    statusP.textContent = "unread";
                }
                else {
                    book.read = true;
                    statusP.style.backgroundColor = "green";
                    statusP.textContent = "read";
                }
            }
        }
    })
    /* end of change of a status of a book */
    deleteP.classList.add("delete");
    /* start of delete card function */
    deleteP.addEventListener("click", function() {
        const idToDelete = deleteP.parentElement.id.substring(2);
        const currentBooks = document.querySelectorAll(".book");
        books = books.filter(item => item.id != idToDelete);
        grid.removeChild(deleteP.parentElement);
        currentBooks.forEach(currentBook => {
            const currentId = currentBook.id.substring(2);
            if (currentId > idToDelete) {
                currentBook.id = `id${currentId - 1}`;
            }
        }
        )
        for (const book of books) {
            if (book.id > idToDelete) {
                book.id = book.id - 1;
            }
        }
        count--;
    })
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

/* filter function */

const filter = document.querySelector(".select2");

filter.addEventListener("change", function() {
    const selectedValue = filter.value;
    const currentBooks = document.querySelectorAll(".book");
    if (selectedValue == "filter2") {
        for (const book of books) {
            const currentId = book.id;
            if (book.read == false) {
                currentBooks.forEach(currentBook => {
                    if (currentBook.id.substring(2) == currentId) {
                        currentBook.style.display = "none";
                    }
                })
            }
            else {
                currentBooks.forEach(currentBook => {
                    if (currentBook.id.substring(2) == currentId) {
                        currentBook.style.display = "flex";
                    }
                })
            }    
        }
    }
    else if (selectedValue == "filter3") {
        for (const book of books) {
            const currentId = book.id;
            if (book.read == true) {
                currentBooks.forEach(currentBook => {
                    if (currentBook.id.substring(2) == currentId) {
                        currentBook.style.display = "none";
                    }
                })
            }   
            else {
                currentBooks.forEach(currentBook => {
                    if (currentBook.id.substring(2) == currentId) {
                        currentBook.style.display = "flex";
                    }
                })
            }      
        }
    }
    else if (selectedValue == "filter1") {
        currentBooks.forEach(currentBook => {
            currentBook.style.display = "flex";
        })
    }
})

/* sorting */

const sorter = document.querySelector(".select1");

sorter.addEventListener("change", function() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    const selectedValue = sorter.value;
    if (selectedValue == "sort1") {
        books = books.sort((a, b) => a.id - b.id);
    }
    else if (selectedValue == "title") {
        books = books.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (selectedValue == "sort2") {
        books = books.sort((a, b) => a.year - b.year);
    }
    else if (selectedValue == "sort3") {
        books = books.sort((a, b) => a.author.localeCompare(b.author));
    }
    for (const book of books) {
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
        /* start of change of a status of a book */
        statusP.addEventListener("click", function() {
            const idToChange = statusP.parentElement.id.substring(2);
            const currentBooks = document.querySelectorAll(".book");
            for (const book of books) {
                if (book.id == idToChange) {
                    if (book.read) {
                        book.read = false;
                        statusP.style.backgroundColor = "red";
                        statusP.textContent = "unread";
                    }
                    else {
                        book.read = true;
                        statusP.style.backgroundColor = "green";
                        statusP.textContent = "read";
                    }
                }
            }
        })
        /* end of change of a status of a book */
        deleteP.classList.add("delete");
        /* start of delete card function */
        deleteP.addEventListener("click", function() {
            const idToDelete = deleteP.parentElement.id.substring(2);
            const currentBooks = document.querySelectorAll(".book");
            books = books.filter(item => item.id != idToDelete);
            grid.removeChild(deleteP.parentElement);
            currentBooks.forEach(currentBook => {
                const currentId = currentBook.id.substring(2);
                if (currentId > idToDelete) {
                    currentBook.id = `id${currentId - 1}`;
                }
            }
            )
            for (const book of books) {
                if (book.id > idToDelete) {
                    book.id = book.id - 1;
                }
            }
            count--;
        })
        /* end of delete card function */
        bookDiv.id = `id${book.id}`;
        titleP.textContent = book.title;
        authorP.textContent = book.author;
        yearP.textContent = book.year;
        if (book.read) {
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
        grid.appendChild(bookDiv);
    }
})




