<template>
  <v-app>
    <app-header />
    <app-top-visual />
    <v-container style="margin-top: 80px;">
      <Nuxt />
    </v-container>
    <app-float-btn />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AppFloatBtn from '~/components/molecules/AppFloatBtn.vue'
import AppHeader from '~/components/organisms/AppHeader.vue'
import AppTopVisual from '~/components/organisms/AppTopVisual.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppTopVisual,
    AppFloatBtn
  },
})
</script>
