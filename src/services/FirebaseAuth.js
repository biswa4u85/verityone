import { auth, database } from '@common/Firebase';
import Expo from 'expo';
import * as firebase from 'firebase';

import { Config } from '@common';
const url = Config.apiUrl;
const facebookId = "288648678174508";
const androidGoogleClientId = '31022361841-7431bfbrm8qidpd9l7m9cldn1vd3nl65.apps.googleusercontent.com';
const iosGoogleClientId = '31022361841-ms9vr5360tbsfa06tmd8dr1duf493e1o.apps.googleusercontent.com';

class FirebaseAuth {
    checkAuth(callback) {
        auth.onAuthStateChanged(user => callback(user))
    };
    doSignOut() {
        auth.signOut()
    };
    authPhone(details, callback) {
        const { mobile } = details;
        auth.signInWithPhoneNumber(mobile)
            .then((confirmResult) =>
                callback(true, confirmResult, null))
            .catch((error) =>
                callback(false, null, error));
    };
    verificationCode(details, callback) {
        const { confirmResult, verificationCode } = details;
        confirmResult.confirm(verificationCode)
            .then((user) =>
                callback(true, user, null))
            .catch((error) =>
                callback(false, null, error));
    };
    loginWithEmail(data, callback) {
        const { email, password } = data;
        auth.signInWithEmailAndPassword(email, password)
            .then((resp) => {
                this.getUser(resp._user.uid, callback)
            })
            .catch((error) => {
                callback(false, null, error)
            });
    };
    registerWithEmail(userDetails, callback) {
        const { email, password } = userDetails;
        auth.createUserWithEmailAndPassword(email, password)
            .then((resp) => {
                let userData = userDetails
                userData['uid'] = resp.user.uid
                this.loginApi(userData, callback)
            })
            .catch((error) => {
                callback(false, null, error)
            });
    };
    async  onLoginOrRegisterWithFacebook(callback) {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(facebookId, { permissions: ['public_profile', 'email'] });
        if (type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture`);
            const fbData = await response.json();
            const credential = await firebase.auth.FacebookAuthProvider.credential(token);
            await auth.signInAndRetrieveDataWithCredential(credential)
                .then((result) => {
                    const users = fbData
                    users['firebaseId'] = result.user.uid
                    this.loginApi(users, callback)
                })
                .catch((error) => callback(false, null, { message: error }));
        } else {
            callback(false, null, { cancelled: true })
        }
    };
    async onLoginOrRegisterWithGoogle(callback) {
        const result = await Expo.Google.logInAsync({ androidClientId: androidGoogleClientId, iosClientId: iosGoogleClientId, scopes: ['profile', 'email'] });
        if (result.type === 'success') {
            const { idToken, accessToken } = result;
            const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            auth.signInAndRetrieveDataWithCredential(credential)
                .then((firebaseUserData) => {
                    const users = result.user
                    users['firebaseId'] = firebaseUserData.user.uid
                    this.loginApi(users, callback)
                })
                .catch((error) => callback(false, null, { message: error }));
        } else {
            callback(false, null, { cancelled: true })
        }
    };
    createUser(user, callback) {
        const userRef = database.ref().child('users');
        userRef.child(user.uid).update({ ...user })
            .then(() => callback(true, user, null))
            .catch((error) => callback(false, null, { message: error }));
    };
    getUser(uid, callback) {
        database.ref('users').child(uid).once('value')
            .then((snapshot) => {
                const exists = (snapshot.val() !== null);
                if (exists) user = snapshot.val();
                const data = { exists, user, uid }
                callback(true, data, null);
            })
            .catch(error => callback(false, uid, error));
    };
    forgetPassword(email, callback) {
        auth.sendPasswordResetEmail(email)
            .then((data) => {
                callback(true, data, null);
            })
            .catch(error => callback(false, null, error));
    };
    loginApi(users, callback) {
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
                profileImage: users.photo
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
    };
    normalLoginApi(users, callback) {
        return fetch(`${url}normalLogin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: users.email,
                password: users.password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success === 1) {
                    callback(true, responseJson, null)
                } else {
                    return Promise.reject(responseJson)
                }
            })
            .catch((error) => {
                console.log(error)
                callback(false, null, error)
            });
    };
};
export default new FirebaseAuth;