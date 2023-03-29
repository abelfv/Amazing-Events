let contenedor = document.getElementById("contenedor");

let datos

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data)=> {
      datos = data.events
      crearCards(datos)
    }) 

function crearCards(array){
  if(array.length == 0){
      contenedor.innerHTML = "<h2>No coincide la busqueda</h2>"
      return
  }
  let cards = ''
  array.forEach(elemento => {
      cards += `
      <div class="card col-md-12" style="width: 18rem;">
      <img src="${elemento.image}">
      <div class="card-body">
      <h5 class="card-title"><b>${elemento.name}</b></h5>
      <p class="card-text">${elemento.description}</p>
      <p class="card-text"><b>DATE</b> ${elemento.date}</p>
      <p class="card-text"><b>CATEGORY</b> ${elemento.category}</p>
      <p class="card-text"><b>PLACE</b> ${elemento.place}</p>
      <p class="card-text"><b>CAPACITY</b> ${elemento.capacity}</p>
      <p class="card-text"><b>ASSISTANCE</b> ${elemento.assistance}</p>
      <p class="card-text"><b>PRICE</b> $ ${elemento.price}</p>
      <a href="./details.html?id=${elemento._id}" class="btn btn-primary">MORE INFORMATION</a>
    </div>
    </div>
  `
  })
  contenedor.innerHTML = cards
}