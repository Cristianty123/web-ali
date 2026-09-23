// js/model.js
// Modelo: obtiene los libros desde api/books.json y los expone al controlador.
// No accede al DOM (sin document, getElementById ni querySelector).

let books = [];

export async function getBooks() {
  const response = await fetch('http://localhost:3000/books');

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  books = await response.json();
  return books;
}

export async function createBook({title, author, price}) {
  const response = await fetch('http://localhost:3000/books',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, author, price}),
  })

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  return await response.json();
}

export async function updateBook(id,parcial){

  const response = await fetch(`http://localhost:3000/books/${id}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(parcial),
  })

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  return await response.json();
}

export async function deleteBook(id){
  const response = await fetch(`http://localhost:3000/books/${id}`,{
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
}

export function getBookById(id) {
  return books.find((book) => book.id === Number(id));
}
