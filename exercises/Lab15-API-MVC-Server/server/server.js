//server/server.js
/**
 * Punto de entrada de la API Express (puerto 3000, script `npm run api`).
 * Carga variables con dotenv, habilita CORS y JSON, monta el router en `/books`.
 * Live Server sigue sirviendo el cliente en :5500, este proceso solo responde HTTP.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const booksRouter = require('./routes/books');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`API del catálogo en http://localhost:${port}`);
});
