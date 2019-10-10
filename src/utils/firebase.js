import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import store from "../store";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID
};

let firebaseApp;

export default {
  init() {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    console.log(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  login() {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var uid = result.user.uid;
          store.dispatch("user/login", { uid, status: true });
          resolve(true);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          store.dispatch("user/error", `${errorCode}: ${errorMessage}`);
          reject(false);
        });
    });
  },
  logout() {
    firebase.auth().signOut();
  },
  checkLoggedIn() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          store.dispatch("user/login", { uid: user.uid, loggedIn: true });
          resolve(true);
        } else {
          store.dispatch("user/logout");
          resolve(false);
        }
      });
    });
  },
  dbInit() {
    return firebaseApp.firestore();
  }
};
