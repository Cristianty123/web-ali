export class Wishlist{
    #whishlist;

    constructor() {
        this.#whishlist = [];
    }

    addToWishlist(id,title){
        if(!this.#whishlist.some(items => items.id === id)){
            const item = new Item(id,title);
            this.#whishlist.push(item);
        }
    }

    removeFromWishlist(id){
        this.#whishlist = this.#whishlist.filter(item => item.id !== id);
    }

    getWishList(){
        return this.#whishlist;
    }
}
class Item{
    #id
    #title

    constructor(id,title) {
        this.#id = id;
        this.#title = title;
    }

    get id(){
        return this.#id;
    }

    get title(){
        return this.#title;
    }

    set title(title){
        this.#title = title;
    }
}