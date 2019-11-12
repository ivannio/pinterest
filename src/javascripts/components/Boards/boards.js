import './boards.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';
import pinData from '../../helpers/data/pinData';
import pins from '../Pins/pins';

const showPins = (e) => {
  const boardId = e.target.id.split('pins-')[1];
  pins.printPins(boardId);
  $('#boards').html('');
};

const deleteABoard = (e) => {
  e.preventDefault();
  const boardId = e.target.id.split('delete-')[1];
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.getPins(boardId)
        .then((thesePins) => {
          thesePins.forEach((pin) => {
            pinData.deletePin(pin.id);
          });
          // eslint-disable-next-line no-use-before-define
          buildBoards();
        })
        .catch((error) => console.error(error));
    });
};

const buildBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = `<div id="board-header">
      <h2 class="header-text">Boards</h2>
      </div>`;
      domString += '<div id="board-section">';
      boards.forEach((board) => {
        domString += boardCard.makeABoard(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('#boards').on('click', '.see-pins', showPins);
      $('#boards').on('click', '.delete-board', deleteABoard);
    })
    .catch((error) => console.error(error));
};

export default { buildBoards };
