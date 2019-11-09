import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const myPins = response.data;
      const pins = [];
      Object.keys(myPins).forEach((fbId) => {
        myPins[fbId].id = fbId;
        pins.push(myPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

export default { getPins };
