//js/model.js
/**
 * Capa MVC: Modelo (DAO HTTP).
 * Único módulo del cliente que llama a `fetch` contra `http://localhost:3000/books`.
 * Lab 12: no suele modificarse si la API Express cumple el mismo contrato que json-server.
 */
let books = [];

/**
 * GET /books. Carga la colección, actualiza el arreglo en memoria `books` y lo devuelve.
 * Lanza error si la respuesta no es OK o no es un arreglo JSON.
 */
export async function getBooks() {
  //fetch(url) sin segundo argumento usa GET por omisión
  const response = await fetch('http://localhost:3000/books');
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('La respuesta no es un arreglo');
  }

  books = data;
  return books;
}

/**
 * Lectura síncrona en memoria (sin `fetch`). Usado al abrir detalle tras `getBooks()`.
 * Entrada: `id` del dataset de tarjeta. Salida: libro o `undefined`.
 */
export function getBookById(id) {
  const numericId = Number(id);
  return books.find((book) => book.id === numericId);
}

/**
 * POST /books. Crea un recurso, cuerpo sin `id`. Depende de la Parte 2 del servidor (201).
 */
export async function createBook({ title, author, price }) {
  const response = await fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, price }),
  });
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  return response.json();
}

/**
 * PATCH /books/:id. Envía solo campos parciales (ej: `{ price }`). Depende de la Parte 3 del servidor.
 */
export async function updateBook(id, partial) {
  const response = await fetch('http://localhost:3000/books/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partial),
  });
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  return response.json();
}

/**
 * DELETE /books/:id. Sin cuerpo. Depende de la Parte 4 del servidor (`response.ok`).
 */
export async function deleteBook(id) {
  const response = await fetch('http://localhost:3000/books/' + id, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
}
