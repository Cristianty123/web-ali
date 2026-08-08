console.log('UPB Bookstore -JS cargado');
const bookTitle = 'Clean Code';
const bookAuthor = 'Robert C. Martin';
const bookPrice = 34.99;

console.log(`${bookTitle} - ${bookAuthor}`);

function formatPrice(price){
    return `${price.toFixed(2)}`;
}
console.log(formatPrice(bookPrice));

const priceEl = document.getElementById('book-price');
priceEl.textContent = `Precio: ${formatPrice(bookPrice)}`;

const toggleButton = document.getElementById('toggle-synopsis');
const synopsisElement = document.getElementById('synopsis');

function toggleSynopsis() {
    synopsisElement.classList.toggle('hidden');

    if (synopsisElement.classList.contains('hidden')) {
        toggleButton.textContent = 'Mostrar sinopsis';
    } else {
        toggleButton.textContent = 'Ocultar sinopsis';
    }
}

toggleButton.addEventListener('click', toggleSynopsis);