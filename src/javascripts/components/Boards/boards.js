import utils from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';

const buildBoards = () => {
  boardData.getBoards()
    .then((boards) => {
      let domString = '<h2>Boards</h2>';
      domString += '<div id="board-section" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardCard.makeABoard(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildBoards };
