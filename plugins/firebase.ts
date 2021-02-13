import Vue from 'vue'
import { Plugin, Context } from '@nuxt/types'
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

type State = {
  idToken: string | null | undefined
}

class AuthComponent {
  private readonly ctx: Context
  private readonly state: State
  private readonly cookieName = 'idToken'

  constructor(ctx: Context) {
    this.ctx = ctx
    this.state = Vue.observable({ idToken: null } as State)
  }
  get idToken() {
    if (this.state.idToken) {
      return this.state.idToken
    }
    this.initFromCookie()
    return this.state.idToken
  }

  initFromCookie() {
    const idToken = this.ctx.app.$cookies.get(this.cookieName)
    this.state.idToken = idToken
  }

  async signUp(email: string, pasword: string, displayName: string) {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, pasword)
    if (response.user) {
      const uid = response.user.uid
      await this.ctx.app.$userRepository.createUser({ displayName, uid })
      await this.sendEmailVerification()
    }
  }

  async signInWithProvider(providerName: string) {
    const provider = this.genProvider(providerName)
    if (provider) {
      const response = await firebase.auth().signInWithPopup(provider)
      if (response.additionalUserInfo?.isNewUser) {
        const uid = response.user?.uid
        const displayName = response.user?.displayName
        await this.ctx.app.$userRepository.createUser({ displayName, uid })
      }
      const idToken = await response.user?.getIdToken()
      this.ctx.app.$cookies.set(this.cookieName, idToken, { path: '/', httpOnly: false })
      this.state.idToken = idToken
    }
  }

  async signIn(email: string, password: string) {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    if (response.user?.emailVerified) {
      const idToken = await response.user?.getIdToken()
      this.ctx.app.$cookies.set(this.cookieName, idToken, { path: '/', httpOnly: false })
      this.state.idToken = idToken
    }
  }

  async signOut() {
    await firebase.auth().signOut()
    this.ctx.app.$cookies.remove(this.cookieName)
    this.state.idToken = ""
  }

  genProvider(providerName: String) {
    switch (providerName) {
      case 'google':
        return new firebase.auth.GoogleAuthProvider()
      case 'twitter':
        return new firebase.auth.TwitterAuthProvider()
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider()
    }
  }

  async sendEmailVerification() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.sendEmailVerification({
          url: `${process.env.BASE_URL}/auth/sign-in`,
          handleCodeInApp: false,
        })
      }
    })
  }
}

const AuthPlugin: Plugin = async (ctx, inject) => {
  inject('auth', new AuthComponent(ctx))
}

export default AuthPlugin