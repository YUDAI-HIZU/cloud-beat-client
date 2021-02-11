import { Plugin } from '@nuxt/types'
import { AuthRepository } from '~/repository/auth'
import { UserRepository } from '~/repository/user'

const RepositoryPlugin: Plugin = (ctx, inject) => {
  inject('authRepository', new AuthRepository(ctx.app.apolloProvider.defaultClient))
  inject('userRepository', new UserRepository(ctx.app.apolloProvider.defaultClient))
}

export default RepositoryPlugin