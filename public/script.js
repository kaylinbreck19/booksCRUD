$(document).ready(function () {
  // Function to get all books from the API
  function getBooks() {
    // Check if the "Get Books" button was clicked without entering an ID
    var bookId = $('#bookId').val();
    if (bookId) {
      // If an ID is provided, fetch and display books by ID
      getBooksById(bookId);
      return;
    }

    axios.get('https://6553b7405449cfda0f2f14a9.mockapi.io/books')
      .then(function (response) {
        displayBooks(response.data);
      })
      .catch(function (error) {
        console.error('Error fetching books:', error);
        displayBooks([]);
      });
  }

  // Function to get books from the API by ID
  function getBooksById(bookId) {
    axios.get(`https://6553b7405449cfda0f2f14a9.mockapi.io/books/${bookId}`)
      .then(function (response) {
        var books = response.data ? [response.data] : [];
        displayBooks(books);
      })
      .catch(function (error) {
        console.error('Error fetching books by ID:', error);
        displayBooks([]);
      });
  }

  // Function to display books on the page
  function displayBooks(books) {
    var bookList = $('#bookList');
    bookList.empty();

    if (books.length === 0) {
      bookList.append('<p>No books available.</p>');
    } else {
      var ul = $('<ul class="list-group"></ul>');
      books.forEach(function (book) {
        var li = $('<li class="list-group-item"></li>');
        li.text(`${book.title} by ${book.name}`);

        // Add buttons for update and delete
        var updateButton = $('<button class="btn btn-warning btn-sm ml-2">Update</button>');
        var deleteButton = $('<button class="btn btn-danger btn-sm ml-2">Delete</button>');

        // Attach book ID to data attribute for update and delete actions
        updateButton.data('bookId', book.id);
        deleteButton.data('bookId', book.id);

        // Attach event handlers
        updateButton.click(updateBook);
        deleteButton.click(deleteBook);

        li.append(updateButton);
        li.append(deleteButton);
        ul.append(li);
      });
      bookList.append(ul);
    }
  }

  // Form submission to add a new book
  $('#bookForm').submit(function (event) {
    event.preventDefault();

    var title = $('#title').val();
    var name = $('#name').val();

    if (title && name) {
      axios.post('https://6553b7405449cfda0f2f14a9.mockapi.io/books', {
        title: title,
        name: name
      })
        .then(function () {
          // Refresh the book list after adding a new book
          getBooks();
        })
        .catch(function (error) {
          console.error('Error adding book:', error);
        });
    }
  });

  // Function to update a book
  function updateBook() {
    var bookId = $(this).data('bookId');
    var newTitle = prompt('Enter the new title:');

    if (newTitle) {
      axios.put(`https://6553b7405449cfda0f2f14a9.mockapi.io/books/${bookId}`, {
        title: newTitle
      })
        .then(function () {
          // Refresh the book list after updating
          getBooks();
        })
        .catch(function (error) {
          console.error('Error updating book:', error);
        });
    }
  }

  // Function to delete a book
  function deleteBook() {
    var bookId = $(this).data('bookId');

    axios.delete(`https://6553b7405449cfda0f2f14a9.mockapi.io/books/${bookId}`)
      .then(function () {
        // Refresh the book list after deleting
        getBooks();
      })
      .catch(function (error) {
        console.error('Error deleting book:', error);
      });
  }

  // Event handler for the "Get Books" button
  $('#getBooksBtn').click(function () {
    // Fetch and display books when the button is clicked
    getBooks();
  });

  // Event handler for the "Get by ID" button
  $('#getByIdBtn').click(function () {
    // Prompt user to enter book ID
    var bookId = prompt('Enter the Book ID:');
    if (bookId) {
      // Fetch and display books by ID when the button is clicked
      getBooksById(bookId);
    } else {
      alert('Please enter a valid Book ID.');
    }
  });
});








