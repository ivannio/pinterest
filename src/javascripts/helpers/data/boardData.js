import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const myBoards = response.data;
      const boards = [];
      Object.keys(myBoards).forEach((fbId) => {
        myBoards[fbId].id = fbId;
        boards.push(myBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

export default { getBoards };
