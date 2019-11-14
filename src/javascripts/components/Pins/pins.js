import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
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

const addAPin = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const boardId = $('.pin-header')[0].id;
  const newPin = {
    name: $('#pin-name').val(),
    description: $('#pin-description').val(),
    url: $('#pin-url').val(),
    imageUrl: $('#pin-image-url').val(),
    boardId,
    uid,
  };
  pinData.addNewPin(newPin)
    .then(() => {
      $('#pinModal').modal('hide');
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
      <button class="btn btn-primary" id="back-to-boards">Go back to boards</button>`;
      domString += `<button type="button" class="btn btn-success" id="add-pin-button" data-toggle="modal" data-target="#pinModal">
      Add Pin
    </button></div>`;
      domString += '<div id="pin-section">';
      pins.forEach((pin) => {
        domString += pinCard.makeAPin(pin);
      });
      domString += '</div>';
      utils.printToDom('pins', domString);
      $('#pins').on('click', '.delete-pin', deleteAPin);
      $('#add-new-pin').click(addAPin);
    })
    .catch((error) => console.error(error));
};

export default { printPins };
