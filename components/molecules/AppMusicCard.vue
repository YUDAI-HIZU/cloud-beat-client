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
          <v-icon v-if="play" @click.stop="onClickStopAudio" x-large>
            mdi-motion-pause-outline
          </v-icon>
          <v-icon v-else @click.stop="onClickPlayAudio" x-large>
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
import { Ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const play = ref(false)
    const thumbnailUrl = ref(props.track.thumbnailUrl ? props.track.thumbnailUrl : require('~/assets/images/icons/thumbnail.png'))
    const audio: Ref<null | HTMLAudioElement> = ref(null)
    const onClickShow = () => {
      console.log('OK')
    }
    const onClickPlayAudio = () => {
      if (!audio.value) {
        audio.value = new Audio(props.track.soundUrl)
      }
      audio.value.play()
      play.value = true
    }
    const onClickStopAudio = () => {
      if (!audio.value) return
      audio.value.pause()
      play.value = false
    }
    return {
      thumbnailUrl,
      play,
      onClickShow,
      onClickPlayAudio,
      onClickStopAudio
    }
  }
})
</script>
