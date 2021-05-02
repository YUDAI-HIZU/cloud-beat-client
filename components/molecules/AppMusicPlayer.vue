<template>
  <v-bottom-navigation
    v-if="track"
    class="mx-auto"
    fixed
    height="80px"
  >
    <v-card tile width="100%">
      <v-slider
        class="ma-0 pa-0"
        :value="currentTime"
        @change="onChangeProgress"
        :min="0"
        :max="duration"
        hide-details
        height="0"
        dense
        color="red"
      ></v-slider>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ track.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ track.user.displayName }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn>
            <v-icon>mdi-rewind</v-icon>
          </v-btn>
          <v-btn v-if="playing" @click="onClickStop">
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn v-else @click="onClickPlay">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-fast-forward</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useAsync, computed } from '@nuxtjs/composition-api'
import { reactive, Ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const { app } = useContext()
    const playing = computed(() => app.$audio.playing)
    const track = computed(() => app.$audio.track)
    const currentTime = computed(() => app.$audio.currentTime)
    const duration = computed(() => app.$audio.duration)
    const onClickPlay = () => {
      app.$audio.play()
    }
    const onClickStop = () => {
      app.$audio.stop()
    }
    const onChangeProgress = (time: number) => {
      app.$audio.timeOperation(time)
    }
    return {
      playing,
      track,
      currentTime,
      duration,
      stop,
      onClickPlay,
      onClickStop,
      onChangeProgress
    }
  },
})
</script>
