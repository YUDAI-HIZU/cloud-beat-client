import { Plugin, Context } from '@nuxt/types'
import firebase from '~/plugins/firebase'

class PushComponent {
  private readonly messaging: firebase.messaging.Messaging
  private readonly vapidKey: string | undefined

  constructor(ctx: Context) {
    this.messaging = firebase.messaging()
    this.vapidKey = process.env.FIREBASE_VAPID_KEY
  }

  async getToken() {
    const token = await this.messaging.getToken({ vapidKey: this.vapidKey })
    return token
  }
}

const PushPlugin: Plugin = async (ctx, inject) => {
  inject('push', new PushComponent(ctx))
}

export default PushPlugin
