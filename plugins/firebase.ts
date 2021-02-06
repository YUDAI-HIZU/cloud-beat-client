import  Firebase from 'firebase/app'
import 'firebase/auth'
import { Config } from '~/types/credentials'

const config: Config = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.FIREBASE_SEND_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
  measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`
}

export const firebase: Firebase.app.App = Firebase.initializeApp(config)

export const auth: Firebase.auth.Auth = firebase.auth()