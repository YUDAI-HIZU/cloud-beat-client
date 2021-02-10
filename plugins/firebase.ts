import Vue from 'vue'
import { Plugin, Context } from '@nuxt/types'
import firebase from 'firebase'
import Firebase from 'firebase/app'

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

type State = {
  user: Firebase.User | null
  idToken: string | null | undefined
}
class AuthComponent {
  private readonly ctx: Context
  private readonly state: State
  private readonly cookieName = 'idToken'

  constructor(ctx: Context) {
    this.ctx = ctx
    this.state = Vue.observable({ idToken: null, user: null } as State)
  }
  get idToken() {
    if (this.state.idToken) {
      return this.state.idToken
    }
    this.initFromCookie()
    return this.state.idToken
  }

  initFromCookie() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('ログイン済み')
        if (user.emailVerified) {
          user.getIdToken()
            .then(idToken => {
              this.state.user = user
              this.state.idToken = idToken
            })
            .catch(error => {
              console.error(error)
            })
        }
      }
    })
    const idToken = this.ctx.app.$cookies.get(this.cookieName)
    this.state.idToken = idToken
  }

  async signUp(email: string, pasword: string) {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, pasword)
    await response.user?.sendEmailVerification({
      url: `${process.env.BASE_URL}/auth/sign-in`,
      handleCodeInApp: false,
    })
    this.state.user = response.user
  }

  async signIn(email: string, password: string) {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    if(response.user?.emailVerified) {
      const idToken = await response.user?.getIdToken()
      this.ctx.app.$cookies.set(this.cookieName, idToken, { path: '/', httpOnly: false })
      this.state.user = response.user
      this.state.idToken = idToken
    }
  }

  async signOut() {
    await firebase.auth().signOut()
    this.ctx.app.$cookies.remove(this.cookieName)
    this.state.user = null
    this.state.idToken = ""
  }

  async authMiddleware() {
    firebase.auth().onAuthStateChanged(user => {
      return user
    })
  }
}

const AuthPlugin: Plugin = async (ctx, inject) => {
  inject('auth', new AuthComponent(ctx))
}

export default AuthPlugin