const datosServidor = "https://mindhub-xj03.onrender.com/api/amazing";
let eventosDeDatos,
  data,
  pasadoCat = [],
  futuroCat = [];

console.log(pasadoCat);

const categoriasFuturo = document.getElementById("upcoming-tabla");
const categoriasPasado = document.getElementById("past-tabla");

// ----- DATOS DEL SERVIDOR A TRAVES DE FETCH. UPDATE DEL AJAX XML -----//

fetch(datosServidor)
  .then((response) => response.json())
  .then((datos) => {
    eventosDeDatos = datos.events;
    data = datos;
    arrayfuturo = obtenerEventosFuturos(datos.events, datos.currentDate);
    arrayPasado = obtenerEventosPasados2(datos.events, datos.currentDate)
    obtenerEventosPasados();
   // obtenerEventosFuturos();
    obtenerEstadisticas();
    dibujarTablaResult(estadisticasPorCategorias(arrayfuturo), "past-tabla");
    dibujarTablaResult(estadisticasPorCategorias(arrayPasado), "upcoming-tabla");

    estadisticasPorCategorias(futuroCat, categoriasFuturo);
    estadisticasPorCategorias(pasadoCat, categoriasPasado);
  });

// ---- SE CREA UN FILTRO PARA OBTENER EVENTOS PASADOS A TRAVES DEL FETCH REALIZADO ANTERIORMENTE ---- //
function obtenerEventosPasados() {
  pasadoCat = eventosDeDatos
    .filter((evento) => data.currentDate > evento.date)
    .map((evento) => ({
      // --este operador (...) nos permite copiar de manera simple una parte o la totalidad de un elemento array o un objeto en JavaScript. ---//
      ...evento,
      porc: (evento.assistance / evento.capacity) * 100,
    }));
}

// ---- SE CREA UN FILTRO PARA OBTENER EVENTOS FUTUROS A TRAVES DEL FETCH REALIZADO ANTERIORMENTE ---- //

function obtenerEventosFuturos(data, currentDate) {
  return data.filter((evento) => evento.date < currentDate);
}

function obtenerEventosPasados2(data, currentDate) {
  return data.filter((evento) => evento.date > currentDate);
}

// --- ESTA FUNCION RESCATA PORCENTAJES DE LOS EVENTOS PARA FILTRAR Y CONOCER LA CAPACIDAD MAXIMA PARA LUEGO DEVOLVER EL PORCENTAJE DE ASISTENCIA ---//

function obtenerEstadisticas() {
  const porcEventosPasados = pasadoCat.map((evento) => evento.porc);
  const capacidadEventosPasados = pasadoCat.map((evento) => evento.capacity);
  const calcularMax = Math.max(...porcEventosPasados);
  const calcularMin = Math.min(...porcEventosPasados);
  const capacidadMax = Math.max(...capacidadEventosPasados);
  const cantMaxDeEventos = pasadoCat.filter(
    (evento) => evento.porc === calcularMax
  );
  const cantMinDeEventos = pasadoCat.filter(
    (evento) => evento.porc === calcularMin
  );
  const maxCapacidadTotal = pasadoCat.filter(
    (evento) => evento.capacity === capacidadMax
  );

  eventoConMayorAsistencia.innerHTML = `<p>${cantMaxDeEventos[0].name} (${cantMaxDeEventos[0].porc} %)</p>`;
  eventosConMenorAsistencia.innerHTML = `<p>${cantMinDeEventos[0].name} (${cantMinDeEventos[0].porc} %)</p>`;
  eventosConMaximaCapacidad.innerHTML = `<p>${maxCapacidadTotal[0].name} (${maxCapacidadTotal[0].capacity})</p>`;
}

const eventoConMayorAsistencia = document.getElementById("primera-tabla");
const eventosConMenorAsistencia = document.getElementById("segunda-tabla");
const eventosConMaximaCapacidad = document.getElementById("tercera-tabla");

// --- ESTA FUNCION DETERMINA LAS ESTADISTICAS PARA CADA CATEGORIA --- //

function estadisticasPorCategorias(arr, contenedor) {
  let categorias = arr.map((evento) => evento.category);
  let setCategoria = new Set(categorias);
  let setArrCategoria = Array.from(setCategoria);
  let eventosCategoria = setArrCategoria.map((cat) =>
    arr.filter((evento) => evento.category == cat)
  );
  

  let saveEvent = eventosCategoria.map((eventoCategoria) => {
    let eventReduce = eventoCategoria.reduce(
      (acc, evento) => {
        acc.category = evento.category;
        acc.Ganancias += evento.price * (evento.estimate || evento.assistance);
        acc.assistance +=
          ((evento.estimate || evento.assistance) * 100) / evento.capacity;

        return acc;
      },
      {
        category: "",
        Ganancias: 0,
        assistance: 0
      }
    );
    eventReduce.assistance = eventReduce.assistance / eventoCategoria.length;

    return eventReduce;
  });
  return saveEvent;
}

function dibujarTablaResult(arr, id) {
  const contenedor = document.getElementById(id);
  const arrayHtml = arr.map((eventos) => {
    return `
    <tr>
      <td>${eventos.category}</td>
      <td>${eventos.Ganancias}</td>
      <td>${eventos.assistance.toFixed(2)} %</td>
    </tr>
    `;
  });
  contenedor.innerHTML = arrayHtml.join("");
}
