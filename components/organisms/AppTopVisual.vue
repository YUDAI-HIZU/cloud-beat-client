<template>
  <v-col cols=12 v-if="isTopPage">
    <v-card
      style="margin-top: 65px;"
      class="d-none d-sm-block d-md-block d-lg-block rounded-0"
      width="100%"
    >
      <v-img
        class="d-flex align-center"
        height="450px"
        gradient="to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2)"
        :src="require('~/assets/images/kvs/main.png')"
      >
        <app-top-text />
      </v-img>
    </v-card>
    <v-card
      style="margin-top: 65px;"
      class="d-xs-block d-sm-none d-md-none d-lg-none rounded-0"
      width="100%"
    >
      <v-img
        class="d-flex align-center"
        height="450px"
        gradient="to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2)"
        :src="require('~/assets/images/kvs/sub.png')"
      >
        <app-top-text />
      </v-img>
    </v-card>
  </v-col>
</template>

<script>
import { defineComponent, ref, useRouter, watch } from '@nuxtjs/composition-api'
import AppTopText from '../atoms/AppTopText.vue'
export default defineComponent({
  components: { AppTopText },
  setup(_, ctx) {
    const router = useRouter()
    const isTopPage = ref(router.currentRoute.path === '/')
    watch(() => ctx.root.$route, () => isTopPage.value = router.currentRoute.path === '/')
    return {
      isTopPage
    }
  }
})
</script>