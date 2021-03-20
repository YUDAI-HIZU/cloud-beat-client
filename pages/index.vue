<template>
  <v-row class="mt-n10">
    <v-col cols="12" class="mt-n16 d-flex justify-space-between">
      <h1 class="title font-weight-bold">
        ピックアップ
      </h1>
      <v-btn text color="primary">
        <strong>もっと見る</strong>
      </v-btn>
    </v-col>
    <v-col>
      <v-row class="d-flex scroller flex-nowrap py-3">
        <v-col v-for="track in tracks" :key="track.id" >
          <app-music-card :track="track" />
        </v-col>
      </v-row>
      <v-divider />
    </v-col>
    <v-col cols="12" class="d-flex justify-space-between">
      <h1 class="title font-weight-bold">
        ニューリリース
      </h1>
      <v-btn text color="primary">
        <strong>もっと見る</strong>
      </v-btn>
    </v-col>
    <v-col>
      <v-row class="d-flex scroller flex-nowrap py-3">
        <v-col v-for="track in tracks" :key="track.id" >
          <app-music-card :track="track" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { app } = useContext()
    const tracks = ref([])
    useAsync(async () => {
      const response = await app.$trackRepository.tracks()
      tracks.value = response.tracks
    })
    return {
      tracks
    }
  }
})
</script>