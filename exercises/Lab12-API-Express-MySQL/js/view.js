//js/view.js
/**
 * Capa MVC: Vista.
 * Solo manipula el DOM (`createElement`, `textContent`). No llama a `fetch` ni conoce MySQL.
 */
/**
 * Formatea el precio numérico como texto con dos decimales y símbolo `$`.
 */
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

/**
 * Dibuja el catálogo: vacía `#catalog` y agrega una tarjeta por libro.
 */
export function renderCatalog(books, catalogEl) {
  catalogEl.textContent = '';

  for (const book of books) {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.id = String(book.id);

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.className = 'author';
    author.textContent = book.author;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = formatPrice(book.price);

    card.append(title, author, price);
    catalogEl.append(card);
  }
}

/**
 * Muestra el panel de detalle con datos del libro y el precio editable.
 */
export function showBookDetail(book, detailEl) {
  detailEl.querySelector('#detail-title').textContent = book.title;
  detailEl.querySelector('#detail-author').textContent = book.author;
  detailEl.querySelector('#detail-price-input').value = String(book.price);
  detailEl.dataset.id = String(book.id);
  detailEl.classList.remove('hidden');
}

/**
 * Oculta el panel de detalle (`#book-detail`).
 */
export function hideBookDetail(detailEl) {
  detailEl.classList.add('hidden');
}
