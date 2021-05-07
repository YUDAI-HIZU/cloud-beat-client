import firebase from "firebase/app"
import "firebase/auth"

export const config = {
  apiKey: "AIzaSyDfvweMtlYAlLot3v_8wzyiP4TNyR-0-js",
  authDomain: "light-team-311512.firebaseapp.com",
  projectId: "light-team-311512",
  storageBucket: "light-team-311512.appspot.com",
  messagingSenderId: "908926756827",
  appId: "1:908926756827:web:545fe90dc666e809c3e9fe",
  measurementId: "G-YQR7NDF7M4"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export const auth = firebase.auth()
export const Firebase = firebase

export const Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// ログイン状態の検知
export const listenAuthState = (dispatch: any) => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      dispatch({
        type: "login",
        payload: {
          user,
        },
      });
    } else {
      // User is signed out.
      // ...
      dispatch({
        type: "logout",
      });
    }
  });
};

export const firebaseUser = () => {
  return firebase.auth().currentUser;
};

// Logout
export const Logout = () => {
  auth.signOut().then(() => {
    window.location.reload();
  });
};