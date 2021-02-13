import { Plugin } from '@nuxt/types'
import { UserRepository } from '~/repository/user'

const RepositoryPlugin: Plugin = (ctx, inject) => {
  inject('userRepository', new UserRepository(ctx.app.apolloProvider.defaultClient))
}

export default RepositoryPlugin