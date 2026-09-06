//js/view.js

//Dibuja las tarjetas en listEl (foto, nombre, topics, data-id).
//Vacía la lista antes. No hace fetch.
export function renderAuthorList(authors, listEl) {
    listEl.innerHTML = '';

    authors.forEach(author => {
        const card = document.createElement('article');
        card.classList.add('author-card');
        card.dataset.id = author.id;

        card.innerHTML = `
        <h1>${author.name}</h1>
        <img src="${author.photo}" alt="${author.photoAlt}">
        <p>${author.topics}</p>
        `;

        listEl.appendChild(card);
    });
}

//Rellena el panel de detalle (foto, nombre, bio, topics, libros con portada y sinopsis) y lo muestra.
export function showAuthorDetail(author, detailEl) {
    const authorFhoto = detailEl.querySelector('#detail-image');
    const authorName = detailEl.querySelector('#author-name');
    const authorBio = detailEl.querySelector('#author-bio');
    const authorTopics = detailEl.querySelector('#author-topics');
    const authorBooks = detailEl.querySelector('#author-books-list');

    authorFhoto.src = author.photo;
    authorFhoto.alt = author.photoAlt;
    authorName.textContent = author.name;
    authorBio.textContent = author.bio;
    authorTopics.textContent = author.topics;

    authorBooks.innerHTML = '';

    for(const book of author.books){
        const li = document.createElement('li');
        li.dataset.id = book.id;
        li.classList.add('book-item');

        li.innerHTML = `
        
        <h3>${book.title}</h3>
        <img class="book-cover" src="${book.cover}" alt="${book.coverAlt}">
        <p>${book.synopsis}</p> 
        `;

        authorBooks.appendChild(li);
    }

    detailEl.classList.remove('hidden');
}

//Oculta el panel de detalle. No toca la lista de tarjetas.
export function hideAuthorDetail(detailEl) {
  detailEl.classList.add('hidden');
}
