//js/app.js
import { getAuthors, getAuthorById } from './model.js';
import { renderAuthorList, showAuthorDetail, hideAuthorDetail } from './view.js';

const authorsEl = document.getElementById('authors');
const detailEl = document.getElementById('author-detail');
const closeBtn = document.getElementById('close-detail');
const statusEl = document.getElementById('status');

//Carga la colección, dibuja la lista y usa #status para carga o error.
async function loadDirectory() {
  //TODO: await getAuthors, dibujar la lista, texto de carga o error en #status


}

loadDirectory();

//Clic en tarjeta: closest .author-card, ocultar el panel, await getAuthorById, mostrar detalle.
//Si el fetch de detalle falla, #status lo indica y la lista permanece.
authorsEl.addEventListener('click', async (event) => {
  //TODO: closest .author-card, ocultar el panel, await getAuthorById, mostrar detalle
  //TODO: si el fetch de detalle falla, #status lo indica y la lista permanece
});

//Clic en Cerrar: solo hideAuthorDetail.
closeBtn.addEventListener('click', () => {
  hideAuthorDetail(detailEl);
});
