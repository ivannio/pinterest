
const makeAPin = (pins) => {
  let domString = '';
  domString += `<div class="card Pin-card">
  <img src="${pins.imageUrl}" class="card-img-top" alt="${pins.name}">
  <div class="card-body">
    <h5 class="card-title">${pins.name}</h5>
    <p class="card-text">Category: ${pins.category}</p>
    <p class="card-text">${pins.description}</p>
<button type="button" id="pins-${pins.id}" class="btn btn-outline-success see-pins">See pins</button>
            <button type="button" id="delete-${pins.id}" class="btn btn-outline-danger">Delete pin</button>
  </div>
</div>`;
  return domString;
};

export default { makeAPin };
