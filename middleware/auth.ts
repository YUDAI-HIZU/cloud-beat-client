import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((ctx) => {
  if (!ctx.app.$auth.idToken) {
    if (ctx.route.path == '/auth/sign-in' || ctx.route.path == '/auth/sign-up') {
      ctx.redirect('/')
    } else {
      ctx.redirect('/auth/sign-in')
    }
  }
})
