<template>
  <v-app-bar
    class="mx-auto"
    color="black"
    fixed
    height="75"
    outlined
  >
    <v-toolbar-title>
      <nuxt-link to="/">
        <img
          class="mt-1 d-none d-sm-block d-md-block d-lg-block"
          :src="require('~/assets/images/logos/main.png')"
          height="60"
        />
        <img
          class="mt-1 d-xs-block d-sm-none d-md-none d-lg-none"
          :src="require('~/assets/images/logos/sub.png')"
          height="60"
        />
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="authenticated">
      <app-account-menu v-on:onClickSignOut="onClickSignOut" />
    </template>
    <template v-else>
      <v-toolbar-title class="mr-2">
        <v-btn class="text-capitalize" to="/auth/sign-up" text ><strong>新規登録</strong></v-btn>
        <v-btn class="text-capitalize" to="/auth/sign-in" color="secondary" ><strong>ログイン</strong></v-btn>
      </v-toolbar-title>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed, useContext, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import AppAccountMenu from '../atoms/AppAccountMenu.vue'

export default defineComponent({
  components: { AppAccountMenu },
  setup(_, ctx) {
    const { app } = useContext()
    const router = useRouter()
    const drawer = ref(false)
    const authenticated = computed(() => {
      return app.$auth.idToken ? true : false
    })
    const onClickMenu = () => {
      drawer.value = !drawer.value
    }
    const onClickSignOut = async () => {
      try {
        await app.$auth.signOut()
        router.push('/auth/sign-in')
        app.$toast.success('ログアウトしました。')
      } catch (error) {
        app.$toast.error('ログアウトに失敗しました。')
        console.error(error)
      }
    }
    return {
      authenticated,
      drawer,
      onClickMenu,
      onClickSignOut
    }
  }
})
</script>
