//server/routes/books.js
/**
 * Capa: HTTP (rutas Express montadas en `/books`).
 * Traduce peticiones REST a llamadas del repositorio y elige códigos de estado.
 */
const express = require('express');
const repo = require('../bookRepository');

const router = express.Router();

/**
 * Parte 1. GET /books - contrato Lab 11: 200 y arreglo JSON de libros.
 */
router.get('/', async (req, res) => {
  try {
    const books = await repo.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo leer el catálogo' });
  }
});

/**
 * Parte 2. POST /books - validar body, llamar `repo.create`, responder 201 con el libro.
 * Hasta implementar: responde 501. Contrato final: 201, 400 (body inválido), 500 (error DB).
 */
router.post('/', async (req, res) => {
  try{
    const {title, author, price} = req.body;

    const isValidtitle = typeof title === 'string' && title.trim() !== '';
    const isValidauthor = typeof author === 'string' && author.trim() !== '';
    const numericPrice = Number(price);
    const isValidPrice = typeof price !== 'undefined' && !isNaN(numericPrice) && numericPrice >= 0;

    if(!isValidtitle || !isValidauthor || !isValidPrice){
      return res.status(400).json({error: 'Datos inválidos para crear el libro'});
    }

    const newbook = await repo.create({
      title: title.trim(),
      author: author.trim(),
      price: numericPrice
    });
    res.status(201).json(newbook);

  }catch (error){
    console.log(error);
    res.status(500).json({error: 'Error al crear el libro'});
  }
});

/**
 * Parte 3. PATCH /books/:id - actualización parcial desde `req.body`.
 * Hasta implementar: responde 501. Contrato final: 200 con JSON, 404 si no existe, 400 si id inválido.
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  try {
    const book = await repo.update(Number(id), { title, author, price });
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
});

/**
 * Parte 4. DELETE /books/:id - eliminar recurso.
 * Hasta implementar: responde 501. Contrato final: 200 sin cuerpo, 404 si no existe.
 */
router.delete('/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const remove = await repo.remove(id);

    if(remove){
      res.status(200).send();
    }else{
      res.status(404).send();
    }

  }catch (error){
    console.log(error);
    res.status(500).json({error: 'Error al eliminar el libro'});
  }
});

module.exports = router;
