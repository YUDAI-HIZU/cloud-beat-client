<template>
  <v-app-bar
    color="black"
    fixed
    height="75"
    outlined
  >
    <v-toolbar-title>
      <nuxt-link to="/">
        <img
          class="mt-1"
          :src="require('~/assets/images/logo.png')"
          height="60"
        />
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="authenticated">
      <app-account-menu
        v-on:onClickSignOut="onClickSignOut"
      />
    </template>
    <template v-else>
      <v-toolbar-title class="mr-2 pc">
        <v-btn class="text-capitalize" to="/auth/sign-up" text ><strong>新規登録</strong></v-btn>
        <v-btn class="text-capitalize" to="/auth/sign-in" color="secondary" ><strong>ログイン</strong></v-btn>
      </v-toolbar-title>
    </template>
    <v-toolbar-title class="mobile">
      <v-btn icon class="mr-2">
        <v-app-bar-nav-icon @click.stop="onClickMenu"></v-app-bar-nav-icon>
      </v-btn>
    </v-toolbar-title>
    <app-navigation
      :drawer="drawer"
      :authenticated="authenticated"
      v-on:onClickMenu="onClickMenu"
      v-on:onClickSignOut="onClickSignOut"
    />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed, useContext, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import AppNavigation from '../atoms/AppNavigation.vue'
import AppAccountMenu from '../atoms/AppAccountMenu.vue'

export default defineComponent({
  components: { AppNavigation, AppAccountMenu },
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
