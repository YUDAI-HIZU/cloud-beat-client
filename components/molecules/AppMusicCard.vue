<template>
  <v-card
    width="240"
    class="pa-0 ma-0 mb-6"
    color="black"
    @click="onClickShow"
  >
    <v-img
      class="rounded"
      height="240"
      width="240"
      :src="thumbnailUrl"
    >
      <v-card-actions class="mt-5 ml-5">
        <v-btn
          class="ml-16 mt-16"
          fab
          icon
        >
          <v-icon v-if="playing" @click.stop="onClickStop" x-large>
            mdi-motion-pause-outline
          </v-icon>
          <v-icon v-else @click.stop="onClickPlay" x-large>
            mdi-motion-play-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-img>
    <v-card-title class="pa-0 ma-0 mt-2">
      <h2 class="ellipsis text-subtitle-1 font-weight-bold">
        {{ track.title }}
      </h2>
    </v-card-title>
    <v-card-subtitle class="ellipsis pa-0 ma-0">
      <p class="font-weight-regular text--secondary">
        <small>{{ track.user.displayName }}</small>
      </p>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useAsync, computed } from '@nuxtjs/composition-api'
import { reactive, Ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const { app } = useContext()
    const thumbnailUrl = ref(props.track.thumbnailUrl ? props.track.thumbnailUrl : require('~/assets/images/icons/thumbnail.png'))
    const onClickShow = () => {
      // TODO: router push
    }
    const playing = computed(() => props.track === app.$audio.track && app.$audio.playing)
    const onClickPlay = () => {
      app.$audio.set(props.track)
    }
    const onClickStop = () => {
      app.$audio.stop()
    }
    return {
      playing,
      thumbnailUrl,
      onClickShow,
      onClickPlay,
      onClickStop
    }
  }
})
</script>
