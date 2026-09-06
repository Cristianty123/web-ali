//js/model.js

//Colección: pide api/authors.json y devuelve data.authors.
//Lanza si response.ok es falso o falta el arreglo authors.
export async function getAuthors() {
  //TODO: fetch api/authors.json, comprobar response.ok y devolver data.authors
}

//Recurso: pide api/authors/{id}.json y devuelve el objeto autor (bio, books).
//Lanza si el recurso falla. No busca en el arreglo de getAuthors.
export async function getAuthorById(id) {
  //TODO: fetch api/authors/{id}.json, comprobar response.ok y devolver el objeto autor
}
