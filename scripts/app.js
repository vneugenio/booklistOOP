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

// Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(e) {
    const title = document.querySelector('#book-form #title').value,
          author = document.querySelector('#book-form #author').value,
          isbn = document.querySelector('#book-form #isbn').value;

    // Create a book object
    const book = new Book(title, author, isbn);

    // create UI obj
    const uI = new UI();

    // Add book to list
    uI.addBookToList(book);

    // Clear fields
    uI.clearFields();

    e.preventDefault();
});
