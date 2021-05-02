import Vue from 'vue'
import { Plugin, Context } from '@nuxt/types'
import { Base64 } from 'js-base64'
import firebase  from '~/plugins/firebase'

type State = {
  idToken: string | null | undefined
}

class AuthComponent {
  private readonly auth: firebase.auth.Auth
  private readonly ctx: Context
  private readonly state: State
  private readonly cookieName = 'idToken'

  constructor(ctx: Context) {
    this.auth = firebase.auth()
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

  get user() {
    const idToken = this.idToken
    if (idToken) {
      const part = idToken.split('.')[1]
      const claims = JSON.parse(Base64.decode(part))
      return claims
    }
  }

  initFromCookie() {
    const idToken = this.ctx.app.$cookies.get(this.cookieName)
    this.state.idToken = idToken
  }

  async signUp(email: string, pasword: string, displayName: string) {
    const response = await this.auth.createUserWithEmailAndPassword(email, pasword)
    const user = response.user
    if (user) {
      const uid = user.uid
      await this.ctx.app.$userRepository.createUser({ displayName, uid })
      await this.sendEmailVerification()
    }
  }

  async signInWithProvider(provider: firebase.auth.AuthProvider) {
    // NOTE: sign up or sign in
    const response = await this.auth.signInWithPopup(provider)
    const userInfo = response.additionalUserInfo
    const user = response.user

    if (!userInfo || !user) return

    // NOTE: create user when new user
    if (userInfo.isNewUser) {
      const uid = user.uid
      const displayName = user.displayName
      await this.ctx.app.$userRepository.createUser({ displayName, uid })
    }

    // NOTE: sign in again because backend user id was set to claims
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken(true)
        this.ctx.app.$cookies.set(this.cookieName, idToken, { path: '/', httpOnly: false })
        this.state.idToken = idToken
      }
    })
  }

  async signIn(email: string, password: string) {
    const response = await this.auth.signInWithEmailAndPassword(email, password)
    const user = response.user
    if (user && user.emailVerified) {
      const idToken = await user.getIdToken()
      this.ctx.app.$cookies.set(this.cookieName, idToken, { path: '/', httpOnly: false })
      this.state.idToken = idToken
    }
  }

  async signOut() {
    await this.auth.signOut()
    this.ctx.app.$cookies.remove(this.cookieName)
    this.state.idToken = null
  }

  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    await this.signInWithProvider(provider)
  }

  async signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider()
    await this.signInWithProvider(provider)
  }

  async signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    await this.signInWithProvider(provider)
  }

  async sendEmailVerification() {
    this.auth.onAuthStateChanged(user => {
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
