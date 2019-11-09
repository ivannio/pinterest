import utils from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import pinCard from '../PinCard/pinCard';


const printPins = (boardId) => {
  pinData.getPins(boardId)
    .then((pins) => {
      let domString = '<h2>Pins</h2>';
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
