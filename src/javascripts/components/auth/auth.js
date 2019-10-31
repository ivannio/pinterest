import $ from 'jquery';
import firebase from 'firebase/app';
import utils from '../../helpers/utilities';
import loginButton from './btn_google_signin_dark_pressed_web@2x.png';

import 'firebase/auth';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loadLoginButton = () => {
  const domString = `<button id="google-auth">
    <img src="${loginButton}">
  </button>`;
  utils.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loadLoginButton };
