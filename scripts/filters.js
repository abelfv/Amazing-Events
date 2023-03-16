const form = document.querySelector("form");
const inputT = document.querySelector("#inputT")

form.addEventListener("submit", () => {
  conjuntoFiltro();
});

checkContainer.addEventListener("change", conjuntoFiltro);

function conjuntoFiltro() {
  let primerFiltro = filtrarPorTexto(data.events, inputT.value);
  let segundoFiltro = filtrarPorCategoria(primerFiltro);
  crearCards(segundoFiltro);
}

function filtrarPorTexto(array, texto) {
  let arrayFiltrado = array.filter((elemento) =>
    elemento.name.toLowerCase().includes(texto.toLowerCase())
  );
  return arrayFiltrado;
}

function filtrarPorCategoria(array) {
  let checkbox = document.querySelectorAll("input[type='checkbox']");
  let arrayChecks = Array.from(checkbox);
  let checksareChecked = arrayChecks.filter((check) => check.checked);
  if (checksareChecked.length == 0) {
    return array;
  }
  let category = checksareChecked.map((check) => check.value);
  let arrayFiltrado = array.filter((elemento) =>
    category.includes(elemento.category)
  );
  return arrayFiltrado;
}
