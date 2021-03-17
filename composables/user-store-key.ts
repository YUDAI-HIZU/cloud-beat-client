import { InjectionKey } from '@nuxtjs/composition-api'
import { UserStore } from '~/composables/user-store'

const UserStoreKey: InjectionKey<UserStore> = Symbol('UserStore')
export default UserStoreKey