//js/app.js
import { getAuthors, getAuthorById } from './model.js';
import { renderAuthorList, showAuthorDetail, hideAuthorDetail } from './view.js';

const authorsEl = document.getElementById('authors');
const detailEl = document.getElementById('author-detail');
const closeBtn = document.getElementById('close-detail');
const statusEl = document.getElementById('status');

//Carga la colección, dibuja la lista y usa #status para carga o error.
async function loadDirectory() {
  statusEl.textContent = 'Cargando autores...';

  try{
    const authors = await getAuthors();
    renderAuthorList(authors, authorsEl);
    statusEl.textContent = '';
  }catch(error){
    console.log(error);
    statusEl.textContent = 'Error al cargar los autores.';
  }
}

loadDirectory();

//Clic en tarjeta: closest .author-card, ocultar el panel, await getAuthorById, mostrar detalle.
//Si el fetch de detalle falla, #status lo indica y la lista permanece.
authorsEl.addEventListener('click', async (event) => {
  const card = event.target.closest('.author-card');

  if(!card){
    return;
  }

  detailEl.classList.add('hidden');

  try{
    const author = await getAuthorById(card.dataset.id);
    showAuthorDetail(author, detailEl);
    statusEl.textContent = '';

  }catch (error){
    console.log(error);
    statusEl.textContent = 'Error al cargar el autor.';
  }
});

//Clic en Cerrar: solo hideAuthorDetail.
closeBtn.addEventListener('click', () => {
  hideAuthorDetail(detailEl);
});
