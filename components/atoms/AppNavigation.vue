<template>
  <v-navigation-drawer
    :value="drawer"
    absolute
    right
    color="#000"
    width="100%"
    height="1000vh"
  >
    <v-list-item class="d-flex justify-end mt-4">
      <v-btn class="mr-2" icon @click.stop="onClickMenu">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-list-item>
    <v-list>
      <v-list-item-group
        color="primary"
      >
        <template v-if="authenticated">
          <app-list-item
            class="font-weight-bold"
            icon="mdi-account-circle-outline"
            title="プロフィール"
            link="/account"
          />

          <app-list-item
            class="font-weight-bold"
            icon="mdi-bell"
            title="お知らせ"
            to="/notice"
          />

          <app-list-item
            class="font-weight-bold"
            icon="mdi-magnify"
            title="検索"
            to="/search"
          />

          <app-list-item
            class="font-weight-bold"
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
</template>

<script>
import { defineComponent, computed, reactive, useContext, ref } from '@nuxtjs/composition-api'
import AppListItem from './AppListItem.vue'
export default defineComponent({
  components: { AppListItem },
  props: {
    drawer: {
      type: Boolean,
      require: true
    },
    authenticated: {
      type: Boolean,
      require: true
    }
  },
  setup(props, ctx) {
    const onClickMenu = () => {
      ctx.emit('onClickMenu')
    }
    const onClickSignOut = () => {
      ctx.emit('onClickSignOut')
    }
    return {
      onClickMenu,
      onClickSignOut
    }
  }
})
</script>

<style>

</style>