//js/app.js
import { loadEvents, getEvents, getEventById, addEvent, removeEvent } from './model.js';
import { renderCalendar, renderAgenda, showEventDetail, hideEventDetail } from './view.js';

const calendarEl = document.getElementById('calendar');
const agendaEl = document.getElementById('agenda');
const detailEl = document.getElementById('event-detail');
const closeBtn = document.getElementById('close-detail');
const btnCalendar = document.getElementById('btn-calendar');
const btnAgenda = document.getElementById('btn-agenda');
const statusEl = document.getElementById('status');
const dateInput = document.getElementById('event-date');
const titleInput = document.getElementById('event-title');
const typeInput = document.getElementById('event-type');
const addBtn = document.getElementById('add-event');
const removeBtn = document.getElementById('remove-event');

let currentView = 'calendar';

//Vuelve a dibujar la vista activa. No solicita JSON. No agrega ni quita eventos.
//1. Si currentView es 'agenda', renderAgenda(getEvents(), agendaEl).
//2. Si no, renderCalendar(getEvents(), calendarEl).
function refreshView() {
  if(currentView === 'agenda'){
    renderAgenda(getEvents(), agendaEl);
  } else {
    renderCalendar(getEvents(), calendarEl);
  }
}

//Muestra el calendario y oculta agenda y detalle.
//1. currentView = 'calendar'.
//2. hideEventDetail.
//3. Ocultar #agenda, mostrar #calendar, is-active en Calendario.
//4. refreshView.
function showCalendarView() {

  currentView = 'calendar';
  hideEventDetail(detailEl);
  agendaEl.classList.add('hidden');
  calendarEl.classList.remove('hidden');
  btnCalendar.classList.add('is-active');
  btnAgenda.classList.remove('is-active');

  refreshView();
}

//Muestra la agenda y oculta calendario y detalle.
//1. currentView = 'agenda'.
//2. hideEventDetail.
//3. Ocultar #calendar, mostrar #agenda, is-active en Agenda.
//4. refreshView.
function showAgendaView() {
  currentView = 'agenda';

  hideEventDetail(detailEl);
  calendarEl.classList.add('hidden');
  agendaEl.classList.remove('hidden');
  btnAgenda.classList.add('is-active');
  btnCalendar.classList.remove('is-active');

  refreshView();
}

//Clic en Calendario: mostrar la vista del mes.
//1. showCalendarView.
btnCalendar.addEventListener('click', () => {
  showCalendarView();
});

//Clic en Agenda: mostrar la lista ordenada por fecha.
//1. showAgendaView.
btnAgenda.addEventListener('click', () => {
  showAgendaView();
});

//Clic en chip: abrir el detalle de ese evento.
//1. closest .event-chip. Si no hay chip, return.
//2. getEventById(chip.dataset.id) y showEventDetail.
calendarEl.addEventListener('click', (event) => {
  const chip = event.target.closest('.event-chip');

  if(!chip){
    return;
  }

  const eventById = getEventById(chip.dataset.id);

  showEventDetail(eventById, detailEl);
});

//Clic en fila: abrir el detalle de ese evento.
//1. closest .agenda-item. Si no hay fila, return.
//2. getEventById(item.dataset.id) y showEventDetail.
agendaEl.addEventListener('click', (event) => {
  const item = event.target.closest('.agenda-item');

  if(!item){
    return;
  }

  const eventById = getEventById(item.dataset.id);

  showEventDetail(eventById, detailEl);
});

//Clic en Agregar evento: mutar el modelo y redibujar la vista activa.
//1. Leer date, title (trim) y type. Si falta título o fecha, return.
//2. addEvent con { date, title, type }.
//3. Limpiar #event-title y refreshView.
addBtn.addEventListener('click', () => {
  const date = dateInput.value;
  const title = titleInput.value.trim();
  const type = typeInput.value;

  if (!title || !date) {
    return;
  }

  addEvent({ date, title, type });
  titleInput.value = '';
  refreshView();
});

//Clic en Quitar evento: mutar el modelo, ocultar detalle y redibujar.
//1. Leer data-id del panel. Si no hay id, return.
//2. removeEvent, hideEventDetail, refreshView.
removeBtn.addEventListener('click', () => {
  const id = detailEl.dataset.id;

  if(!id){
    return;
  }

  removeEvent(id);
  hideEventDetail(detailEl);
  refreshView();
});

//Clic en Cerrar: ocultar el detalle. No cambia events ni la vista activa.
//1. hideEventDetail(detailEl).
closeBtn.addEventListener('click', () => {
  hideEventDetail(detailEl);
});

//Carga JSON y dibuja el calendario. Si falla, texto en #status.
//1. await loadEvents.
//2. showCalendarView.
//3. Si lanza, mensaje breve en #status. La grilla queda sin chips.
async function start() {

  try{
    await loadEvents();
    showCalendarView();
  }catch (error){
    console.error(error);
    statusEl.textContent = "Error al cargar los eventos.";
  }
}

start();
