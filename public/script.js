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

    // Fetch all books from the API
    $.ajax({
      url: 'https://6553b7405449cfda0f2f14a9.mockapi.io/books',
      method: 'GET',
      success: function (response) {
        // Display the fetched books
        displayBooks(response);
      },
      error: function (error) {
        console.error('Error fetching books:', error);
        // Display an empty list in case of an error
        displayBooks([]);
      }
    });
  }

  // Function to get books from the API by ID
  function getBooksById(bookId) {
    // Fetch books by ID from the API
    $.ajax({
      url: `https://6553b7405449cfda0f2f14a9.mockapi.io/books/${bookId}`,
      method: 'GET',
      success: function (response) {
        // Create an array with the single fetched book or an empty array
        var books = response ? [response] : [];
        // Display the fetched books
        displayBooks(books);
      },
      error: function (error) {
        console.error('Error fetching books by ID:', error);
        // Display an empty list in case of an error
        displayBooks([]);
      }
    });
  }

  // Function to display books on the page
  function displayBooks(books) {
    var bookList = $('#bookList');
    bookList.empty(); // Clear the display

    if (books.length === 0) {
      // Display a message when no books are available
      bookList.append('<p>No books available.</p>');
    } else {
      // Create an unordered list for the books
      var ul = $('<ul class="list-group"></ul>');
      books.forEach(function (book) {
        // Create a list item for each book
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

        // Append buttons to the list item
        li.append(updateButton);
        li.append(deleteButton);

        // Append the list item to the unordered list
        ul.append(li);
      });
      // Append the unordered list to the bookList container
      bookList.append(ul);
    }
  }

  // Form submission to add a new book
  $('#bookForm').submit(function (event) {
    event.preventDefault();

    var title = $('#title').val();
    var name = $('#name').val();

    if (title && name) {
      // Add a new book to the API
      $.ajax({
        url: 'https://6553b7405449cfda0f2f14a9.mockapi.io/books',
        method: 'POST',
        data: {
          title: title,
          name: name
        },
        success: function () {
          // Refresh the book list after adding a new book
          getBooks();
        },
        error: function (error) {
          console.error('Error adding book:', error);
        }
      });
    }
  });

  // Function to update a book
  function updateBook() {
    var bookId = $(this).data('bookId');
    var newTitle = prompt('Enter the new title:');

    if (newTitle) {
      // Update the title of the book in the API
      $.ajax({
        url: `https://6553b7405449cfda0f2f14a9.mockapi.io/books/${bookId}`,
        method: 'PUT',
        data: {
          title: newTitle
        },
        success: function () {
          // Refresh the book list after updating
          getBooks();
        },
        error: function (error) {
          console.error('Error updating book:', error);
        }
      });
    }
  }

  // Function to delete a book
  function deleteBook() {
    var bookId = $(this).data('bookId');

    // Delete the book from the API
    $.ajax({
      url: `https://6553b7405449cfda0f2f14a9.mockapi.io/books/${bookId}`,
      method: 'DELETE',
      success: function () {
        // Refresh the book list after deleting
        getBooks();
      },
      error: function (error) {
        console.error('Error deleting book:', error);
      }
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






