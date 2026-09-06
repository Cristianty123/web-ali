//js/app.js
const catalogEl = document.getElementById('catalog');
const wishlistEl = document.getElementById('wishlist');
const countEl = document.getElementById('wishlist-count');

import {Wishlist} from './wishlist.js';

const whishlist = new Wishlist();

//Dibuja #wishlist (un li por elemento, título y Quitar) y actualiza #wishlist-count.
function renderWishlist() {
    wishlistEl.innerHTML = '';

    const items = whishlist.getWishList();

    items.forEach(item =>{
        const lista = document.createElement('li');
        lista.innerHTML = `
        <span>${item.title}</span>
        <button type="button" class="remove-wish" data-id="${item.id}">remover de la lista</button>
        `;

        wishlistEl.appendChild(lista);
    });

    countEl.textContent = items.length;
}

//Clic en boton [+ Añadir a mi lista de deseos]: closest .add-wish y .book-card, addToWishlist, dibujar.
catalogEl.addEventListener('click', (event) => {

    const button = event.target.closest('.add-wish');

    if(!button){
        return;
    }

    const card = button.closest('.book-card');

    const id = card.dataset.id;
    const title = card.querySelector('h3').textContent;

    whishlist.addToWishlist(id, title);

    renderWishlist();
});

//Clic en boton [- Quitar de mi lista]: closest .remove-wish, removeFromWishlist, dibujar.
wishlistEl.addEventListener('click', (event) => {
    const button = event.target.closest('.remove-wish');

    if(!button){
        return;
    }

    whishlist.removeFromWishlist(button.dataset.id);

    renderWishlist();
});

renderWishlist();
