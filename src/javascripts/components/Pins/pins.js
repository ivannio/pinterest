import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import pinCard from '../PinCard/pinCard';
import './pins.scss';
import '../../../styles/main.scss';
import boardData from '../../helpers/data/boardData';

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

const getPinModal = (e) => {
  const pinId = e.target.id.split('update-')[1];
  const { uid } = firebase.auth().currentUser;
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        domString += `<div class="pin-radios">
        <input class="form-check-input" type="radio" name="exampleRadios" id="${board.name}-radio" value="${board.id}">
        <label class="form-check-label" for="exampleRadios1">
          ${board.name}
          </label>
          </div>`;
      });
      utils.printToDom('board-update-radios', domString);
    });
  $('.update-pin').attr('id', pinId);
};

const moveAPin = (e) => {
  e.stopImmediatePropagation();
  const pinId = e.target.id;
  const boardId = $('.pin-header')[0].id;
  console.log(boardId);
  const selectedBoard = $('input:checked').val();
  const { uid } = firebase.auth().currentUser;
  pinData.getPinById(pinId)
    .then((response) => {
      const thisPin = response.data;
      const newPin = {
        name: thisPin.name,
        description: thisPin.description,
        url: thisPin.url,
        imageUrl: thisPin.imageUrl,
        boardId: `${selectedBoard}`,
        uid,
        pinId: `${pinId}`,
      };
      console.log(newPin);
      pinData.updatePin(pinId, newPin);
      $('#update-pin-modal').modal('hide');
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
      $('.update-pin-modal').click(getPinModal);
      $('#add-new-pin').click(addAPin);
      $('.update-pin').click(moveAPin);
    })
    .catch((error) => console.error(error));
};

export default { printPins };
