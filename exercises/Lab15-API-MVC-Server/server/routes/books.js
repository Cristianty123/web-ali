//server/routes/books.js
/**
 * Capa: HTTP (rutas Express montadas en `/books`).
 * Traduce peticiones REST a llamadas del repositorio y elige códigos de estado.
 */
const express = require('express');

const router = express.Router();

const controller = require('../controller/bookController');

/**
 * Parte 1. GET /books - contrato Lab 11: 200 y arreglo JSON de libros.
 */
router.get('/', controller.getBooks);

/**
 * Parte 2. POST /books - validar body, llamar `repo.create`, responder 201 con el libro.
 * Hasta implementar: responde 501. Contrato final: 201, 400 (body inválido), 500 (error DB).
 */
router.post('/', controller.createBook);

/**
 * Parte 3. PATCH /books/:id - actualización parcial desde `req.body`.
 * Hasta implementar: responde 501. Contrato final: 200 con JSON, 404 si no existe, 400 si id inválido.
 */
router.patch('/:id', controller.updateBook);

/**
 * Parte 4. DELETE /books/:id - eliminar recurso.
 * Hasta implementar: responde 501. Contrato final: 200 sin cuerpo, 404 si no existe.
 */
router.delete('/:id', controller.deleteBook);

module.exports = router;
