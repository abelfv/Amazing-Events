let checkContainer = document.getElementById("checkContainer");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    crearChkboxes(data.events);
  })
  .catch((error) => console.error(error));

function crearChkboxes(array) {
  let arrayCategory = array.map((elemento) => elemento.category);

  let setCategories = new Set(
    arrayCategory.sort((a, b) => a.localeCompare(b)));

  /*let arrayChecks = Array.from(setCategories);*/
  
  let casilla = "";
  setCategories.forEach((elemento) => {
    casilla += `<div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${elemento}" value="${elemento}"></input>
        <label id="labelCheck" for="${elemento}">${elemento}</label>
    </div>  `;
  });
  checkContainer.innerHTML = casilla;
}
