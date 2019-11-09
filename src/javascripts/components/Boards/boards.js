import './boards.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';
import pins from '../Pins/pins';

const showPins = (e) => {
  const boardId = e.target.id.split('pins-')[1];
  pins.printPins(boardId);
};

const buildBoards = () => {
  const { uid } = firebase.auth().currentUser;
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = '<h2>Boards</h2>';
      domString += '<div id="board-section">';
      boards.forEach((board) => {
        domString += boardCard.makeABoard(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('#boards').on('click', '.see-pins', showPins);
    })
    .catch((error) => console.error(error));
};

export default { buildBoards };
