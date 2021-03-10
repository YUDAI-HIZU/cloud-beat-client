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
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
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
                  src="~/assets/images/icons/account.png"
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
              <app-list-item
                icon="mdi-account-circle-outline"
                title="プロフィール"
                link="/account"
              />
              <v-divider></v-divider>
              <app-list-item
                icon="mdi-logout"
                title="ログアウト"
                @click="onClickSignOut"
              />
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-toolbar-title>
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
    <v-navigation-drawer
      v-model="drawer"
      absolute
      width="100%"
      height="1000vh"
    >
      <v-list-item class="d-flex justify-end mt-4">
        <v-btn icon @click.stop="onClickMenu">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item>
      <v-list>
        <v-list-item-group
          color="primary"
        >
          <template v-if="authenticated">
            <app-list-item
              icon="mdi-account-circle-outline"
              title="プロフィール"
              link="/account"
            />

            <app-list-item
              icon="mdi-bell"
              title="お知らせ"
              to="/notice"
            />

            <app-list-item
              icon="mdi-magnify"
              title="検索"
              to="/search"
            />

            <app-list-item
              icon="mdi-logout"
              title="ログアウト"
              @click="onClickSignOut"
            />
          </template>
          <template v-else>
            <app-list-item
              icon="mdi-account-circle-outline"
              title="新規登録"
              link="/auth/sign-up"
            />

            <app-list-item
              icon="mdi-login"
              title="ログイン"
              link="/auth/sign-in"
            />
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed, useContext, ref } from '@nuxtjs/composition-api'
import AppListItem from '../atoms/AppListItem.vue'

export default defineComponent({
  components: { AppListItem },
  setup(_, ctx) {
    const { app } = useContext()
    const drawer = ref(false)
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
    const onClickMenu = () => {
      drawer.value = !drawer.value
    }
    return {
      authenticated,
      drawer,
      onClickSignOut,
      onClickMenu
    }
  }
})
</script>
