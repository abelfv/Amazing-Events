const form = document.querySelector("form");
const inputT = document.querySelector("#inputT");
let checkbox = document.querySelectorAll("input[type='checkbox']");

form.addEventListener("change", (event) => {
  event.preventDefault();
  conjuntoFiltro();
});

checkContainer.addEventListener("change", conjuntoFiltro);

function conjuntoFiltro() {
  checkbox = document.querySelectorAll("input[type='checkbox']");
  console.log(checkbox);
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      const primerFiltro = filtrarPorTexto(data.events, inputT.value);
      const segundoFiltro = filtrarPorCategoria(primerFiltro);
      crearCards(segundoFiltro);
    })
    .catch((error) => {
      console.error(error);
      alert("Error al cargar los eventos. Por favor, inténtalo de nuevo más tarde.");
    });
}

function filtrarPorTexto(array, texto) {
  const arrayFiltrado = array.filter((elemento) =>
    elemento.name.toLowerCase().includes(texto.toLowerCase())
  );
  return arrayFiltrado;
}

function filtrarPorCategoria(array) {
  let checksareChecked = Array.from(checkbox).filter((check) => check.checked);
  if (checksareChecked.length === 0) {
    return array;
  }
  const category = checksareChecked.map((check) => check.value.toLowerCase());
  const arrayFiltrado = array.filter((elemento) =>
    category.includes(elemento.category.toLowerCase())
  );
  return arrayFiltrado;
}
