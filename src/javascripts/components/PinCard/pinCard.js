import './pinCard.scss';

const makeAPin = (pins) => {
  let domString = '';
  domString += `<div class="card pin-card">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${pins.imageUrl}" class="card-img pin-card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${pins.name}</h5>
        <p class="card-text">${pins.description}</p>
        <a href="${pins.url}" target="_blank"><button type="button" class="btn btn-outline-success">Visit Site</button></a>
        <button type="button" class="btn btn-outline-danger delete-pin" id="delete-${pins.id}">Delete Pin</button>
      </div>
    </div>
  </div>
</div>`;
  return domString;
};

export default { makeAPin };
