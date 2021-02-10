import { Context } from '@nuxt/types'
import { onError } from 'apollo-link-error'

export default (ctx: Context) => {
  const errorHandler = onError(({ networkError, graphQLErrors }) => {
    console.error(networkError, graphQLErrors)
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        if (err.extensions) {
          if (err.extensions.status === 401) {
            ctx.redirect('/auth/sign-in')
          }
        }
      })
    }
  })
  return {
    httpEndpoint: `http://localhost:8080/query`,
    getAuth: () => `Bearer ${ctx.app.$auth.idToken}`,
    link: errorHandler
  }
}