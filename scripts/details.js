fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    const detalles = document.getElementById("details-main-container");
    const queryString = window.location.search;
    const paramsQuery = new URLSearchParams(queryString);
    const idQuery = paramsQuery.get("id");
    const id = data.events.find((eventos) => eventos._id == idQuery);

    detalles.innerHTML = `
      <div class="detail-image-container">
        <img src="${id.image}" alt="" class="img-fluid">
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
      </div>
    `;
  })
  .catch(error => console.error(error));
