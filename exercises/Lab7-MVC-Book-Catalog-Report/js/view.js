//Convierte el precio numérico a texto con dos decimales.
function formatPrice(price) {
    return Number(price).toFixed(2);
}

//Vacía catalogEl y dibuja una tarjeta por libro.
export function renderCatalog(books, catalogEl) {
    catalogEl.innerHTML = '';

    books.forEach(book => {
        const card = document.createElement('article')
        card.classList.add('book-card');

        card.dataset.id = book.id;

        catalogEl.appendChild(card);
    });
}

//Rellena título, autor y precio. Quita la clase hidden.
export function showBookDetail(book, detailEl) {

    const titleEL = detailEl.querySelector('#detail-title');
    const authorEL = detailEl.querySelector('#detail-author');
    const priceEL = detailEl.querySelector('#detail-price');

    titleEL.textContent = book.title;
    authorEL.textContent = `Autor: ${book.author}`;
    priceEL.textContent = `Precio: $${formatPrice(book.price)}`;

    detailEl.classList.remove('hidden')

}

//Añade la clase hidden al panel de detalle.
export function hideBookDetail(detailEl) {
    detailEl.classList.add('hidden');
}