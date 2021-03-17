import Vue from 'vue'
import { Plugin, Context } from '@nuxt/types'
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

  initFromCookie() {
    const idToken = this.ctx.app.$cookies.get(this.cookieName)
    this.state.idToken = idToken
  }

  async signUp(email: string, pasword: string, displayName: string) {
    const response = await this.auth.createUserWithEmailAndPassword(email, pasword)
    if (response.user) {
      const uid = response.user.uid
      await this.ctx.app.$userRepository.createUser({ displayName, uid })
      await this.sendEmailVerification()
    }
  }

  async signInWithProvider(providerName: string) {
    const provider = this.getProvider(providerName)
    if (provider) {
      const response = await this.auth.signInWithPopup(provider)
      if (response.additionalUserInfo?.isNewUser) {
        const uid = response.user?.uid
        const displayName = response.user?.displayName
        await this.ctx.app.$userRepository.createUser({ displayName, uid })
      }
      this.auth.onAuthStateChanged(async (user) => {
        const idToken = await user?.getIdToken(/* forceRefresh */ true)
        this.ctx.app.$cookies.set(this.cookieName, idToken, { path: '/', httpOnly: false })
        this.state.idToken = idToken
      })
    }
  }

  async signIn(email: string, password: string) {
    const response = await this.auth.signInWithEmailAndPassword(email, password)
    if (response.user?.emailVerified) {
      const idToken = await response.user?.getIdToken(/* forceRefresh */ true)
      this.ctx.app.$cookies.set(this.cookieName, idToken, { path: '/', httpOnly: false })
      this.state.idToken = idToken
    }
  }

  async signOut() {
    await this.auth.signOut()
    this.ctx.app.$cookies.remove(this.cookieName)
    this.state.idToken = null
  }

  getProvider(providerName: String) {
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
