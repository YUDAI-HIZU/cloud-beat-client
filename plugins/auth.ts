import { Plugin } from '@nuxt/types'
import  Firebase from 'firebase/app'
import { firebase } from '~/plugins/firebase'

type AuthType = {
  user: Firebase.User | null
  token: string | undefined
}

const AuthPlugin: Plugin = async (ctx, inject) => {
  const state: AuthType = {
    token: "",
    user: null
  }
  const auth = {
    get token() {
      return state.token
    },
    async onAuthStateChanged() {
      
    },
    async signUp(email: string, pasword: string) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, pasword)
      } catch (error) {
        console.error(error)
      }
    },
    async signIn(email: string, password: string) {
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        const token = await response.user?.getIdToken()
        state.user = response.user
        state.token = token
        ctx.redirect('/')
      } catch (error) {
        console.error(error)
      }
    },
    async signOut() {
      try {
        await firebase.auth().signOut()
        state.user = null
        state.token = ""
      } catch (error) {
        console.error(error)
      }
    }
  }
  await (async () => {
    try {
      const user = firebase.auth().currentUser
      const token = await user?.getIdToken()
      state.user = user
      state.token = token
    } catch (error) {
      console.error(error)
    }
  })()
  inject('auth', auth)
}

export default AuthPlugin