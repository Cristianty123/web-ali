// js/app.js
// Controlador: orquesta modelo y vista. Espera la carga del modelo con await
// y refleja el estado en #status.

import {getBooks, getBookById, createBook, updateBook, deleteBook} from './model.js';
import { renderCatalog, showBookDetail, hideBookDetail } from './view.js';

const catalogEl = document.getElementById('catalog');
const statusEl = document.getElementById('status');
const detailEl = document.getElementById('book-detail');
const closeBtn = document.getElementById('close-detail');
const formEl = document.getElementById('book-form');
const savePrice = document.getElementById('save-price');
const bookDelete = document.getElementById('delete-book');

async function loadCatalog() {
  statusEl.textContent = 'Cargando catálogo...';

  try {
    const books = await getBooks();
    renderCatalog(books, catalogEl);
    statusEl.textContent = '';
  } catch (error) {
    console.log(error);
    statusEl.textContent = 'No se pudo cargar el catálogo.';
  }
}

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = formEl.querySelector('#book-title').value.trim();

  if(!title){
    statusEl.textContent = 'No puede estar vacío el título';
    return;
  }
  const author = formEl.querySelector('#book-author').value;
  const price = Number(formEl.querySelector('#book-price').value);

  if(Number.isNaN(price)||price < 0){
    statusEl.textContent = 'El precio debe ser un número positivo';
    return;
  }

  try{
    await createBook({title, author, price});
    await loadCatalog();
    formEl.reset();
  }catch(error){
    statusEl.textContent = 'Ocurrió un error al crear el libro';
    console.log(error);
  }
})

savePrice.addEventListener('click', async () => {

  const price = Number(detailEl.querySelector('#detail-price-input').value);

  if(Number.isNaN(price)||price < 0){
    statusEl.textContent = 'El precio debe ser un número positivo';
    return;
  }

  const id = Number(detailEl.dataset.id);

  if(Number.isNaN(id) || !id){
    statusEl.textContent = 'ID inválido';
    return;
  }

  try{

    await updateBook(id, {price})
    await loadCatalog();

  }catch(error){
    statusEl.textContent = 'Ocurrió un error al actualizar el libro';
    console.log(error);
  }
})

bookDelete.addEventListener('click', async () => {
  const id = Number(detailEl.dataset.id);

  if(Number.isNaN(id) || !id){
    statusEl.textContent = 'ID inválido';
    return;
  }

  try{
    await deleteBook(id);
    await loadCatalog();
  }catch(error){
    statusEl.textContent = 'Ocurrió un error al eliminar el libro';
    console.log(error);
  }
})

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
