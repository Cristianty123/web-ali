const repo = require('../model/bookRepository');
const {BookView} = require("../view/bookView");


async function getBooks(req, res){
    try {
        const books = await repo.findAll();
        res.status(200).json(BookView.listbooks(books));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo leer el catálogo' });
    }
}

async function createBook(req, res){
    try{
        const {title, author, price} = req.body;

        const isValidtitle = typeof title === 'string' && title.trim() !== '';
        const isValidauthor = typeof author === 'string' && author.trim() !== '';
        const numericPrice = Number(price);
        const isValidPrice = typeof price !== 'undefined' && !isNaN(numericPrice) && numericPrice >= 0;

        if(!isValidtitle || !isValidauthor || !isValidPrice){
            return res.status(400).json({error: 'Datos inválidos para crear el libro'});
        }

        const newbook = await repo.create({
            title: title.trim(),
            author: author.trim(),
            price: numericPrice
        });
        res.status(201).json(BookView.book(newbook));

    }catch (error){
        console.log(error);
        res.status(500).json({error: 'Error al crear el libro'});
    }
}

async function updateBook (req, res){
    const { id } = req.params;
    const { title, author, price } = req.body;

    try {
        const book = await repo.update(Number(id), { title, author, price });
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.status(200).json(BookView.book(book));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
}

async function deleteBook(req, res){
    try{
        const {id} = req.params;
        const remove = await repo.remove(id);

        if(remove){
            res.status(200).send();
        }else{
            res.status(404).send();
        }

    }catch (error){
        console.log(error);
        res.status(500).json({error: 'Error al eliminar el libro'});
    }
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook
};

