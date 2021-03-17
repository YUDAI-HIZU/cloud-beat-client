<template>
  <div>
    <v-card-text class="white--text">
      <v-img
        class="mx-auto"
        width="200"
        :src="require('~/assets/images/icons/upload.png')"
      />
      <h1 class="font-weight-bold text-h6 text-center">動画をアップロードしてください</h1>
      <p class="text-center mt-3">
        自分の作品を共有してユーザーにアプローチしましょう。<br>
        アップロードした音源はここに表示されます。
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn 
        color="primary"
        class="mx-auto font-weight-bold"
        @click="$refs.fileRef.click()"
      >
        音源をアップロード
      </v-btn>
      <input
        class="d-none"
        type="file"
        ref="fileRef"
        accept="audio/*"
        @change="selectedAudio"
      >
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, ctx) {
    const fileRef = ref<HTMLInputElement>()
    const selectedAudio = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        ctx.emit('upload-audio', files[0])
      }
    }
    return {
      fileRef,
      selectedAudio
    }
  }
})
</script>
