// js/app.js
// Controlador: orquesta modelo y vista. Espera la carga del modelo con await
// y refleja el estado en #status.

import { getBooks, getBookById } from './model.js';
import { renderCatalog, showBookDetail, hideBookDetail } from './view.js';

const catalogEl = document.getElementById('catalog');
const statusEl = document.getElementById('status');
const detailEl = document.getElementById('book-detail');
const closeBtn = document.getElementById('close-detail');

async function loadCatalog() {
  statusEl.textContent = 'Cargando catálogo...';

  try {
    const books = await getBooks();
    renderCatalog(books, catalogEl);
    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = 'No se pudo cargar el catálogo.';
  }
}

catalogEl.addEventListener('click', (event) => {
  const card = event.target.closest('.book-card');
  if (!card) return;

  const book = getBookById(card.dataset.id);
  if (book) {
    showBookDetail(book, detailEl);
  }
});

closeBtn.addEventListener('click', () => {
  hideBookDetail(detailEl);
});

loadCatalog();
