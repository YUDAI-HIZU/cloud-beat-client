<template>
  <v-app-bar
    color="background"
    fixed
    height="75"
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
      <v-toolbar-title class="mr-2 pc">
        <v-btn icon color="white">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-menu offset-y min-width="200">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              x-large
              v-bind="attrs"
              v-on="on"
              color="white"
            >
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
            </v-btn>
          </template>
          <v-list
            nav
            dense
          >
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in firstItems"
                :key="`first-${i}`"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text">プロフィール</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                @click="onClickSignOut"
              >
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>ログアウト</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-toolbar-title>
    </template>
    <template v-else>
      <v-toolbar-title class="mr-2 pc">
        <v-btn class="text-capitalize" to="/auth/sign-up" text >Sign up</v-btn>
        <v-btn class="text-capitalize" to="/auth/sign-in" color="secondary" >login</v-btn>
      </v-toolbar-title>
    </template>
    <v-toolbar-title class="mobile">
      <v-btn icon class="mr-2">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-btn>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, useContext, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, ctx) {
    const { app } = useContext()
    const firstItems = reactive([
      { text: 'プロフィール', icon: 'mdi-account-circle-outline' }
    ])
    const onClickSignOut = async () => {
      try {
        await app.$auth.signOut()
        ctx.root.$router.push('/auth/sign-in')
      } catch (error) {
        console.error(error)
      }
    }
    const authenticated = computed(() => {
      return app.$auth.idToken ? true : false
    })
    return {
      authenticated,
      firstItems,
      onClickSignOut
    }
  }
})
</script>
