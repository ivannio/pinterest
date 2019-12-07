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

const getPinById = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updatePin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

export default {
  getPins,
  deletePin,
  addNewPin,
  updatePin,
  getPinById,
};
