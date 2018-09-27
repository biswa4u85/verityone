import * as firebase from 'firebase';
// import * as Vision from '@google-cloud/vision';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAHsGPOHBgvK2l-hdOYSUOuQrMp2PZwo-k",
    authDomain: "verity-ebd35.firebaseapp.com",
    databaseURL: "https://verity-ebd35.firebaseio.com",
    projectId: "verity-ebd35",
    storageBucket: "verity-ebd35.appspot.com",
    messagingSenderId: "874376514949"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
// export const vision = new Vision();