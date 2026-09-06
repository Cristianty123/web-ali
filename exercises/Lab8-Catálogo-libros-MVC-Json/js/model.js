// js/model.js
// Modelo: obtiene los libros desde api/books.json y los expone al controlador.
// No accede al DOM (sin document, getElementById ni querySelector).

let books = [];

export async function getBooks() {
  const response = await fetch('api/books.json');

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  const data = await response.json();
  books = data.books;
  return books;
}

export function getBookById(id) {
  return books.find((book) => book.id === Number(id));
}
