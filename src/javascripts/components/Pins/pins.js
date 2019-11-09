import utils from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import pinCard from '../PinCard/pinCard';
import './pins.scss';


const printPins = (boardId) => {
  pinData.getPins(boardId)
    .then((pins) => {
      let domString = `<div id="pin-header">
      <h2>Pins</h2>
      </div>`;
      domString += '<div id="pin-section">';
      pins.forEach((pin) => {
        domString += pinCard.makeAPin(pin);
      });
      domString += '<div class="d-flex justify-content-center"><button class="btn btn-primary">Go back to boards</button></div></div>';
      utils.printToDom('pins', domString);
    })
    .catch((error) => console.error(error));
};

export default { printPins };
