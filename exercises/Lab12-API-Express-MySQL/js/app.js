//js/app.js
/**
 * Capa MVC: Controlador.
 * Orquesta modelo y vista, escribe en `#status`, registra eventos de formulario y botones.
 * Lab 12: el trabajo nuevo está en `server/`; este archivo repasa el flujo CRUD del Lab 11.
 */
import { getBooks, getBookById, createBook, updateBook, deleteBook } from './model.js';
import { renderCatalog, showBookDetail, hideBookDetail } from './view.js';

const catalogEl = document.getElementById('catalog');
const detailEl = document.getElementById('book-detail');
const closeBtn = document.getElementById('close-detail');
const statusEl = document.getElementById('status');
const bookForm = document.getElementById('book-form');
const savePriceBtn = document.getElementById('save-price');
const deleteBookBtn = document.getElementById('delete-book');

/**
 * Recarga el catálogo desde la API, dibuja tarjetas y limpia mensajes de estado si todo sale bien.
 */
async function loadCatalog() {
  statusEl.textContent = 'Cargando catálogo...';
  hideBookDetail(detailEl);
  catalogEl.textContent = '';

  try {
    const books = await getBooks();
    renderCatalog(books, catalogEl);
    statusEl.textContent = '';
  } catch {
    statusEl.textContent = 'No se pudo cargar el catálogo.';
  }
}

loadCatalog();

/**
 * Clic en tarjeta: abre detalle con datos en memoria (`getBookById`).
 */
catalogEl.addEventListener('click', (event) => {
  const card = event.target.closest('.book-card');
  if (!card) {
    return;
  }

  const book = getBookById(card.dataset.id);
  if (book) {
    showBookDetail(book, detailEl);
  }
});

closeBtn.addEventListener('click', () => {
  hideBookDetail(detailEl);
});

/**
 * Formulario Nuevo libro: POST vía `createBook`, luego vuelve a solicitar la lista completa.
 */
bookForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const price = Number(document.getElementById('book-price').value);

  if (!title || Number.isNaN(price) || price < 0) {
    statusEl.textContent = 'Título y precio válidos son obligatorios.';
    return;
  }

  try {
    await createBook({ title, author, price });
    bookForm.reset();
    await loadCatalog();
  } catch {
    statusEl.textContent = 'No se pudo guardar el libro.';
  }
});

/**
 * Guardar precio en detalle: PATCH vía `updateBook`, luego recarga catálogo.
 */
savePriceBtn.addEventListener('click', async () => {
  const id = detailEl.dataset.id;
  const price = Number(document.getElementById('detail-price-input').value);

  if (!id || Number.isNaN(price)) {
    statusEl.textContent = 'Título y precio válidos son obligatorios.';
    return;
  }

  try {
    await updateBook(id, { price });
    await loadCatalog();
  } catch {
    statusEl.textContent = 'No se pudo guardar el libro.';
  }
});

/**
 * Eliminar libro abierto: DELETE vía `deleteBook`, luego recarga catálogo.
 */
deleteBookBtn.addEventListener('click', async () => {
  const id = detailEl.dataset.id;
  if (!id) {
    return;
  }

  try {
    await deleteBook(id);
    await loadCatalog();
  } catch {
    statusEl.textContent = 'No se pudo guardar el libro.';
  }
});
