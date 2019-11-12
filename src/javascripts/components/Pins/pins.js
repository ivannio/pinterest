import utils from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import pinCard from '../PinCard/pinCard';
import './pins.scss';
import '../../../styles/main.scss';


const printPins = (boardId) => {
  pinData.getPins(boardId)
    .then((pins) => {
      let domString = `<div id="pin-header">
      <h2 class="header-text">Pins</h2>
      <button class="btn btn-primary" id="back-to-boards">Go back to boards</button>
      </div>`;
      domString += '<div id="pin-section">';
      pins.forEach((pin) => {
        domString += pinCard.makeAPin(pin);
      });
      domString += '</div>';
      utils.printToDom('pins', domString);
    })
    .catch((error) => console.error(error));
};

export default { printPins };
