<template>
  <v-app>
    <app-header />
    <app-top-visual />
    <v-container style="margin-top: 80px;">
      <Nuxt />
    </v-container>
    <app-music-player />
    <app-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AppMusicPlayer from '~/components/molecules/AppMusicPlayer.vue'
import AppHeader from '~/components/organisms/AppHeader.vue'
import AppTopVisual from '~/components/organisms/AppTopVisual.vue'
import AppFooter from '~/components/organisms/AppFooter.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppTopVisual,
    AppMusicPlayer,
    AppFooter
  },
})
</script>
