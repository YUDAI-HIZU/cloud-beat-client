import  Firebase from "firebase/app"
import "firebase/auth"

const config = {
  appId: 'AIzaSyCQ35LnhgTIB9qJAZvIjVYyvPtU_WImr5A',
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  messagingSenderId: process.env.FIREBASE_SEND_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
}

const firebase: Firebase.app.App = Firebase.apps.length ? Firebase.app() : Firebase.initializeApp(config)

export default firebase