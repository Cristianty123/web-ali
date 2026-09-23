//server/bookRepository.js
/**
 * Capa: repositorio (acceso a datos).
 * Concentración de SQL parametrizado sobre la tabla `books`. Sin `fetch` ni DOM.
 */
const { pool } = require('./db');

/**
 * Convierte una fila de MySQL al objeto JSON que espera el cliente (`price` numérico).
 */
function mapBook(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    price: Number(row.price),
  };
}

/**
 * Parte 1 (referencia). Lista todos los libros ordenados por `id`.
 * Salida: arreglo de objetos `{ id, title, author, price }` para `GET /books` (200).
 */
async function findAll() {
  const [rows] = await pool.execute(
    'SELECT id, title, author, price FROM books ORDER BY id ASC',
  );
  return rows.map(mapBook);
}

/**
 * Parte 1 (referencia). Lee un libro por clave primaria.
 * Entrada: `id` numérico. Salida: objeto libro o `null` si no existe fila.
 */
async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, title, author, price FROM books WHERE id = ?',
    [id],
  );
  if (rows.length === 0) {
    return null;
  }
  return mapBook(rows[0]);
}

/**
 * Parte 2 (implementar). Inserta un libro sin `id` en el cuerpo (AUTO_INCREMENT).
 * Entrada: `{ title, author, price }`. Salida: libro creado con `id` asignado por MySQL.
 */
async function create({ title, author, price }) {
  const [create] = await pool.execute(
      'INSERT INTO books (title,author, price) VALUES (?, ?, ?)',
      [title,author,price]
  );

  return await findById(create.insertId);
}

/**
 * Parte 3 (implementar). Actualiza solo campos presentes en `partial` (PATCH parcial).
 * Entrada: `id` y objeto parcial (`title`, `author` y/o `price`). Salida: libro actualizado o `null` si no hay fila.
 */
async function update(id, partial) {
  //TODO: UPDATE parcial solo con campos presentes en partial

  const [update] = await pool.execute(
      'UPDATE books SET price = ? WHERE id = ?',
      [partial.price, id]
  );

  if(update.affectedRows === 0){
    return null;
  }

  return await findById(id);
}

/**
 * Parte 4 (implementar). Elimina la fila con ese `id`.
 * Salida: `true` si se eliminó al menos una fila, `false` si el id no existía.
 */
async function remove(id) {
  //TODO: DELETE FROM books WHERE id = ?
  const [remove] = await pool.execute(
    'DELETE FROM books WHERE id = ?',
    [id]
  );


  return remove.affectedRows !== 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
