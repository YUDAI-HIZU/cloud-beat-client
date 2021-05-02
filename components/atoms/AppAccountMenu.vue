<template>
  <v-toolbar-title class="mr-2">
    <v-btn icon color="white" to="/search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon color="white" to="/notifications">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-menu offset-y min-width="200">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
          color="white"
        >
          <v-avatar>
            <v-icon>
              mdi-account-outline
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
            icon="mdi-cloud-upload-outline"
            title="音源"
            link="/tracks/new"
          />
          <app-list-item
            icon="mdi-playlist-music-outline"
            title="プレイリスト"
            link="/playlists"
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
    <v-btn class="text-capitalize" color="primary" to="/tracks/new">
      <v-icon>mdi-cloud-upload-outline</v-icon>
      <h2 class="ml-1 font-weight-bold d-none d-sm-block d-md-block d-lg-block">Upload</h2>
    </v-btn>
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