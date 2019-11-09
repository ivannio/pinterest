import './boardCard.scss';

const makeABoard = (boards) => {
  let domString = '';
  domString += `<div class="card mb-3 board-card">
  <img src="${boards.imageUrl}" class="card-img-top" alt="${boards.name}">
  <div class="card-body">
    <h5 class="card-title">${boards.name}</h5>
    <p class="card-text">Category: ${boards.category}</p>
    <p class="card-text">${boards.description}</p>
<button type="button" class="btn btn-outline-success">See Pins</button>
            <button type="button" class="btn btn-outline-danger">Delete Board</button>
  </div>
</div>`;
  return domString;
};

export default { makeABoard };
