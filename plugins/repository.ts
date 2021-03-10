import { Plugin } from '@nuxt/types'
import { UserRepository } from '~/repository/user'
import { TrackRepository } from '~/repository/track'

const RepositoryPlugin: Plugin = (ctx, inject) => {
  inject('userRepository', new UserRepository(ctx.app.apolloProvider.defaultClient))
  inject('trackRepository', new TrackRepository(ctx.app.apolloProvider.defaultClient))
}

export default RepositoryPlugin