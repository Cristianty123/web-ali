//js/view.js

//Dibuja las tarjetas en listEl (foto, nombre, topics, data-id).
//Vacía la lista antes. No hace fetch.
export function renderAuthorList(authors, listEl) {
  //TODO: una tarjeta por autor con photo, nombre, topics y data-id
    listEl.innerHTML = '';

    authors.forEach(author => {
        const card = document.createElement('article');
        card.classList.add('author-card');
        card.dataset.id = author.id;

        card.innerHTML = `
        <h1>${author.name}</h1>
        <img src="../${author.photo}" alt="${author.photoAlt}">
        <p>${author.topics}</p>
        `;

    });
}

//Rellena el panel de detalle (foto, nombre, bio, topics, libros con portada y sinopsis) y lo muestra.
export function showAuthorDetail(author, detailEl) {
  //TODO: foto, nombre, bio, temas y libros (portada, título, sinopsis)
}

//Oculta el panel de detalle. No toca la lista de tarjetas.
export function hideAuthorDetail(detailEl) {
  //TODO: ocultar el panel de detalle
}
