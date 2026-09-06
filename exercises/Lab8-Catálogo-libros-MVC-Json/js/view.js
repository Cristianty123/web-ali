// js/view.js
// Vista: dibuja el catálogo y el detalle de un libro. No se modifica en el Lab 8.

export function renderCatalog(books, catalogEl) {
  catalogEl.innerHTML = '';

  books.forEach((book) => {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p class="price">$${book.price.toFixed(2)}</p>
    `;

    catalogEl.appendChild(card);
  });
}

export function showBookDetail(book, detailEl) {
  const contentEl = detailEl.querySelector('#book-detail-content');

  contentEl.innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Autor:</strong> ${book.author}</p>
    <p><strong>Precio:</strong> $${book.price.toFixed(2)}</p>
  `;

  detailEl.classList.remove('hidden');
}

export function hideBookDetail(detailEl) {
  detailEl.classList.add('hidden');
}
