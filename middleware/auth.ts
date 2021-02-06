import { Middleware, Context } from '@nuxt/types'
import  Firebase from 'firebase/app'

const authMiddleware: Middleware = (ctx: Context) => {
  ctx.app.$auth.onAuthStateChanged((user: Firebase.User) => {
    if (user) {
      if (ctx.route.path == '/auth/sign-in' || ctx.route.path == '/auth/sign-up') {
        ctx.redirect('/')
      }
    } else {
      ctx.redirect('/auth/sign-in')
    }
  })
}

export default authMiddleware