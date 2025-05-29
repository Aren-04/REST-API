const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body data
app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien' }
];

// GET /books - return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.json(books[bookIndex]);
});

// DELETE /books/:id - delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(bookIndex, 1);

  res.json({ message: 'Book deleted', book: deletedBook[0] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
