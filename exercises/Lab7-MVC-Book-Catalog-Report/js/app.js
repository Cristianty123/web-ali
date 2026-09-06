import { renderCatalog, showBookDetail, hideBookDetail } from './view.js';
import {Bookshop} from "./model.js";

const bookshop = new Bookshop();
const catalogEl = document.getElementById('catalog');
const detailEl = document.getElementById('book-detail');
const closeBtn = document.getElementById('close-detail');

renderCatalog(bookshop.Books, catalogEl);

//Clic en una tarjeta (delegación en #catalog).
catalogEl.addEventListener('click', (event) => {

    const card = event.target.closest('.book-card');

    if (card) {
        const bookId = card.dataset.id;
        const book = bookshop.getBookById(bookId);

        if (book) {
            showBookDetail(book, detailEl);
        }
    }
});

//Botón Cerrar: oculta el detalle.
closeBtn.addEventListener('click', () => {
    hideBookDetail(detailEl);
});