<template>
  <v-row>
    <v-col class="d-flex justify-space-between">
      <h1 class="title font-weight-bold">
        ピックアップ
      </h1>
      <v-btn text color="primary" @click="onClick">
        <strong>もっと見る</strong>
      </v-btn>
    </v-col>
    <v-col>
      <v-row class="d-flex scroller flex-nowrap py-3">
        <v-col v-for="i in 10" :key="i" >
          <app-music-card />
        </v-col>
      </v-row>
      <v-divider />
    </v-col>
    <v-col class="d-flex justify-space-between">
      <h1 class="title font-weight-bold">
        ニューリリース
      </h1>
      <v-btn text color="primary">
        <strong>もっと見る</strong>
      </v-btn>
    </v-col>
    <v-col>
      <v-row class="d-flex scroller flex-nowrap py-3">
        <v-col v-for="i in 10" :key="i" >
          <app-music-card />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, ctx) {
    const { app } = useContext()
    const onClick = async () => {
      try {
        const permission = await Notification.requestPermission()
        if (permission == 'granted') {
          const token = await app.$push.getToken()
          console.log(token)
        }
      } catch(error) {
        console.error(error)
      }
    }
    return {
      onClick
    }
  }
})
</script>