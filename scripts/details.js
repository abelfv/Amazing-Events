let detalles = document.getElementById("details-main-container");
const queryString = window.location.search;
const paramsQuery = new URLSearchParams(queryString);
const idQuery = paramsQuery.get("id");
const eventos = data.events;
const id = data.events.find((eventos) => eventos._id == idQuery);

detalles.innerHTML = `
<div class="detail-image-container">
        <img src="${id.image}" alt="">
</div>

<div class="details-text-container">
        <h3>${id.name}</h3>
        <p class="card-text">${id.description}</p>
        <p class="card-text"><b>DATE</b> ${id.date}</p>
        <p class="card-text"><b>CATEGORY</b> ${id.category}</p>
        <p class="card-text"><b>PLACE</b> ${id.place}</p>
        <p class="card-text"><b>CAPACITY</b> ${id.capacity}</p>
        <p class="card-text"><b>ASSISTANCE</b> ${id.assistance}</p>
        <p class="card-text"><b>PRICE</b> $ ${id.price}</p>
</div>`;
