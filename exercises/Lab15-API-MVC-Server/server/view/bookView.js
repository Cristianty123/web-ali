export class BookView{

    id
    title
    author
    price
    constructor(book) {
        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.price = Number(book.price);
    }

    static listbooks(books){
        return books.map(book => new BookView(book));
    }

    static book(book){
        return new BookView(book);
    }


}