// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function  UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
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

UI.prototype.clearFields = function() {
    const fields = document.querySelectorAll('input[type=text]');
    let i = 0;
    for(i = 0; i < fields.length; i++) {
        fields[i].value = '';
    }
}


UI.prototype.deleteBook = function (target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message, className) {
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

    // Show alert
    uI.showAlert('Book removed', 'success');

    e.preventDefault();
});

