import { Config } from '@common';
import { request } from './../Omni';

const url = Config.apiUrl;

const VerityAPI = {
  createUserApi: (users, callback) => {
    console.log(users)
    return fetch(`${url}signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: users.name,
        password: "",
        email: users.email,
        birthDay: "",
        mobileNumber: "",
        socialType: "0",
        isSocial: "YES",
        firebaseId: users.uid,
        profileImage: users.profileImage
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        callback(true, responseJson, null)
      })
      .catch((error) => {
        console.log(error)
        callback(false, null, error)
      });
  },
  getVerityTokenApi: async (userId) => {
    return await fetch(`${url}getVerityTokenForm`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return error;
      });
  },
  saveVerityTokenApi: async (userId, fields) => {
    return await fetch(`${url}saveVerityToken`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId, fields
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        callback(false, null, error)
      });
  },
  searchApi: (userId, searchword, callback) => {
    return fetch(`${url}search`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        searchword: searchword,
        offset: "0",
        isUpdated: "1"
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        callback(true, responseJson, null)
      })
      .catch((error) => {
        return error;
      });
  },
  appMessageApi: async (token) => {
    const _url = `${url}/appMessage/?token=${token}`;
    return await request(_url);
  },
  getConfigurationsApi: (users, callback) => {
    return fetch(`${url}getConfigurations`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageType: "1",
        userId: users.userId
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        callback(true, responseJson, null)
      })
      .catch((error) => {
        console.log(error)
        callback(false, null, error)
      });
  },
};

export default VerityAPI;