import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
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

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export default { getBoards, deleteBoard };
