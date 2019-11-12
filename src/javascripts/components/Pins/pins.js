import $ from 'jquery';
import utils from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import pinCard from '../PinCard/pinCard';
import './pins.scss';
import '../../../styles/main.scss';

const deleteAPin = (e) => {
  e.preventDefault();
  const pinId = e.target.id.split('delete-')[1];
  const boardId = $('.pin-header')[0].id;
  pinData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(boardId);
    })
    .catch((error) => console.error(error));
};

const printPins = (boardId) => {
  pinData.getPins(boardId)
    .then((pins) => {
      let domString = `<div id="${boardId}" class="pin-header">
      <h2 class="header-text">Pins</h2>
      <button class="btn btn-primary" id="back-to-boards">Go back to boards</button>
      </div>`;
      domString += '<div id="pin-section">';
      pins.forEach((pin) => {
        domString += pinCard.makeAPin(pin);
      });
      domString += '</div>';
      utils.printToDom('pins', domString);
      $('#pins').on('click', '.delete-pin', deleteAPin);
    })
    .catch((error) => console.error(error));
};

export default { printPins };
