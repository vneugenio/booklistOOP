class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book) {
        const list = document.querySelector('table.u-full-width tbody#book-list');

        // Create <tr> element
        const row = document.createElement('tr');
        
        // Insert columns
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="delete">X</a></td>`;
            
        list.appendChild(row);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className) {
        //create div
        const div = document.createElement('div');
        div.className = `alert ${className}`;

        // Add message
        div.appendChild(document.createTextNode(message));

        // Parent
        const container = document.querySelector('.container');
        // Form
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        // disappear after 3 secs -- 3000 millisecs
        setTimeout(function() {
            div.remove();
        }, 3000);
    }

    clearFields() {
        const fields = document.querySelectorAll('input[type=text]');
        let i = 0;
        for(i = 0; i < fields.length; i++) {
            fields[i].value = '';
        }
    }
}

class Storage {
    // getBooks() is to fetch data from localStorage
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Storage.getBooks();

        books.forEach(function(book) {
            const uI = new UI();

            uI.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        let books = Storage.getBooks();
        
        // use loop to check each object in the array that
        // contains the isbn of the item to remove
        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
                // set new array to 'books' in localStorage
                localStorage.setItem('books', JSON.stringify(books));
            }
        });
    }
}

// Display books upon loading of page
document.addEventListener('DOMContentLoaded', Storage.displayBooks());

// Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(e) {
    const title = document.querySelector('#book-form #title').value,
          author = document.querySelector('#book-form #author').value,
          isbn = document.querySelector('#book-form #isbn').value;


    // Create a book object
    const book = new Book(title, author, isbn);

    // create UI obj
    const uI = new UI();

    if(title.search(/\w/g) === -1 || author.search(/\w/g) === -1 || 
        isbn.search(/\w/g) === -1) {
        // Error alert
        uI.showAlert('Please fill out all fields', 'error');
    } else {

        // Add book to list
        uI.addBookToList(book);

        // Clear fields
        uI.clearFields();

        // Add to localStorage
        Storage.addBook(book);

        // Success Alert
        uI.showAlert('Book Added', 'success');
    }

    e.preventDefault();
});

// Event listener for delete

document.querySelector('#book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const uI = new UI();

    // passing e.target as an argument to be able to detect whether
    // user clicks the <a> element
    uI.deleteBook(e.target);

    // Remove from localStorage
    // access text content of <td>, previous sibling of <a> parent element
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show alert
    uI.showAlert('Book removed', 'success');

    e.preventDefault();
});