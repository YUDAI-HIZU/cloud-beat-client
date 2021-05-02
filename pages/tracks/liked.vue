<template>
  <div>
    <track-tabs />
    <v-card color="black" max-width="900px" class="mx-auto py-4">
      <h1>liked</h1>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import TrackTabs from '~/components/molecules/tracks/TrackTabs.vue'

export default defineComponent({
  components: { TrackTabs },
  setup() {
    
  },
})
</script>
