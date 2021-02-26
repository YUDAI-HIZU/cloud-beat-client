import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: `${process.env.FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: `${process.env.FIREBASE_SEND_ID}`,
    appId: `${process.env.FIREBASE_APP_ID}`,
    measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`
  })
}

export default firebase