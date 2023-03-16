let checkContainer = document.getElementById("checkContainer");
let datos1 = data.events;

crearChkboxes(datos1);

function crearChkboxes(array) {
  let arrayCategory = array.map((elemento) => elemento.category);

  let setCategories = new Set(
    arrayCategory.sort((a, b) => a.localeCompare(b)))
 
  /*let arrayChecks = Array.from(setCategories);*/
  
  let casilla = "";
  setCategories.forEach((elemento) => {
    casilla += `<div class="check">
        <input type="checkbox" name="posicion" id="${elemento}" value="${elemento}">
        <label for="${elemento}">${elemento}</label>
    </div>  `;
  });
  checkContainer.innerHTML = casilla;
}
