import { reactive, computed } from '@nuxtjs/composition-api'
import { User } from '~/apollo/model/generated'

export default function userStore() {
  const state = reactive({
    user: null as User | null,
  })
  const user = computed(() => state.user)
  const setUser = (user: User) => state.user = user
  const removeUser = () => state.user = null

  return {
    user,
    setUser,
    removeUser
  }
}
export type UserStore = ReturnType<typeof userStore>
