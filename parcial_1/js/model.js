//js/model.js
let events = [];
let loaded = false;

//Solicita api/events.json una vez y guarda data.events en memoria.
//Lanza si response.ok es falso o falta el arreglo events.
//1. Si loaded es verdadero, devolver events (no volver a solicitar).
//2. fetch('api/events.json') y comprobar response.ok.
//3. response.json(): data.events debe ser un arreglo.
//4. Guardar en events, loaded = true, devolver events.
export async function loadEvents() {

    if(loaded){
        return events;
    }

    const response = await fetch("api/events.json");


    if(!response.ok){
        throw new Error('Error en la solicitud a los eventos');
    }

    const data = await response.json();

    if(!data || !Array.isArray(data.events)){
        throw new Error('El arreglo de eventos no existe o no es un arreglo');
    }

    events = data.events;
    loaded = true;

    return events;
}

//Devuelve el arreglo en memoria. No usa document.
//1. return events.
export function getEvents() {
  return events;
}

//Busca un evento por id en el arreglo en memoria.
//1. Convertir id con Number.
//2. find en events por event.id.
export function getEventById(id) {
    const numberId = Number(id);

    return events.find(event => event.id === numberId);
}

//Agrega { id, date, title, type } al arreglo. No dibuja ni usa fetch.
//1. trim del título. Si queda vacío, return (no insertar).
//2. Recorrer events y hallar el id máximo.
//3. push con id = máximo + 1, date, title y type del payload.
export function addEvent(payload) {

    const titleEvent = payload.title.trim();

    if(!titleEvent){
        return;
    }

    let idEventMax = 0;
    let idEvent;

    for(const element of events) {
        idEvent = element.id;

         if(idEvent > idEventMax){
             idEventMax = idEvent;
         }
    }

    const newEvent = {
        "id": idEventMax + 1,
        "date": payload.date,
        "title": titleEvent,
        "type": payload.type
    }

    events.push(newEvent);
}

//Quita el evento con ese id.
//1. Convertir id con Number.
//2. filter: dejar los eventos cuyo id no coincida.
export function removeEvent(id) {
    const numberId = Number(id);

    events = events.filter(event => event.id !== numberId);
}
