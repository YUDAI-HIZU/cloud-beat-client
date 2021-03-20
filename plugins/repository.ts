import { Plugin } from '@nuxt/types'
import { UserRepository } from '~/repository/user'
import { TrackRepository } from '~/repository/track'

const RepositoryPlugin: Plugin = (ctx, inject) => {
  ctx.app.apolloProvider.defaultClient.defaultOptions = {
    query: { fetchPolicy: 'no-cache' },
  }
  inject('userRepository', new UserRepository(ctx.app.apolloProvider.defaultClient))
  inject('trackRepository', new TrackRepository(ctx.app.apolloProvider.defaultClient))
}

export default RepositoryPlugin