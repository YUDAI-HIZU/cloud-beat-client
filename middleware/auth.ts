import { defineNuxtMiddleware} from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((ctx) => {
  ctx.app.$auth.onAuthStateChanged((user: any) => {
    if (user) {
      if (ctx.route.path == '/auth/sign-in' || ctx.route.path == '/auth/sign-up') {
        ctx.redirect('/')
      }
    } else {
      ctx.redirect('/auth/sign-in')
    }
  })
})