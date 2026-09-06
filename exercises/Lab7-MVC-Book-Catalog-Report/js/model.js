export class Bookshop{

    #books;

    constructor() {
        this.#books = [
            new Book(1, 'Clean Code', 'Robert C. Martin', 34.99),
            new Book(2, 'Eloquent JavaScript', 'Marijn Haverbeke', 0),
            new Book(3, 'Refactoring', 'Martin Fowler', 47.99)
        ];
    }

    get Books(){
        return this.#books;
    }

    getBookById(id){
       return this.#books.find(book => book.id === id);
    }

}

class Book {
    #id;
    #title;
    #author;
    #price;

    constructor(id, title, author, price) {
        this.#id = id;
        this.#title = title;
        this.#author = author;
        this.#price = price;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get price() {
        return this.#price;
    }

    set title(newTitle) {
        if (newTitle.trim() === '') {
            throw new Error('El título no puede estar vacío');
        }
        this.#title = newTitle;
    }

    set author(newAuthor) {
        this.#author = newAuthor;
    }

    set price(newPrice) {
        if (newPrice < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        this.#price = newPrice;
    }
}
