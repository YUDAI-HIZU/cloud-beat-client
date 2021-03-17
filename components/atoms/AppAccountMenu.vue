<template>
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
            <v-icon>
              mdi-account
            </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list
        outlined
        nav
        dense
      >
        <v-list-item-group>
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

<script lang="ts">
import { defineComponent, computed, useContext, ref } from '@nuxtjs/composition-api'
import AppListItem from './AppListItem.vue'

export default defineComponent({
  components: { AppListItem },
  setup(_, ctx) {
    const onClickSignOut = () => {
      ctx.emit('onClickSignOut')
    }
    return {
      onClickSignOut
    }
  }
})
</script>