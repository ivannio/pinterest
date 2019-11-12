import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import boards from '../../components/Boards/boards';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#boards').removeClass('hide');
      $('#pins').removeClass('hide');
      $('#navbar-button-logout').removeClass('hide');
      $('#auth').addClass('hide');
      boards.buildBoards(user.uid);
    } else {
      $('#boards').addClass('hide');
      $('#navbar-button-logout').addClass('hide');
      $('#auth').removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
