let contenedor = document.getElementById("contenedor");
let strToHtml = "";


for (const event of data.events) {
  strToHtml += `
  <div class="card col-md-12" style="width: 18rem;">
    <img src="${event.image}">
    <div class="card-body">
      <h5 class="card-title"><b>${event.name}</b></h5>
      <p class="card-text">${event.description}</p>
      <p class="card-text"><b>DATE</b> ${event.date}</p>
      <p class="card-text"><b>CATEGORY</b> ${event.category}</p>
      <p class="card-text"><b>PLACE</b> ${event.place}</p>
      <p class="card-text"><b>CAPACITY</b> ${event.capacity}</p>
      <p class="card-text"><b>ASSISTANCE</b> ${event.assistance}</p>
      <p class="card-text"><b>PRICE</b> $ ${event.price}</p>
      <a href="#" class="btn btn-primary">MORE INFORMATION</a>
    </div>
  </div>
  `;
}

contenedor.innerHTML = strToHtml