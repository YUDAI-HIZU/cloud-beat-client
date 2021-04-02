<template>
  <v-card max-width="900px" class="mx-auto py-4">
    <template v-if="input.audio">
      <track-form
        :audio="input.audio"
      />
    </template>
    <template v-else>
      <track-upload
        @upload-audio="uploadAudio"
      />
    </template>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch, computed } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'
import { CreateTrackInput } from '~/apollo/model/generated'
import TrackUpload from '~/components/molecules/TrackUpload.vue'
import TrackForm from '~/components/molecules/TrackForm.vue'

export default defineComponent({
  components: { TrackUpload, TrackForm },
  middleware: 'auth',
  setup() {
    const input: Ref<CreateTrackInput> = ref({
      title: "",
      audio: null as File | null,
      thumbnail: null as File | null,
      description: "",
      youtubeLink: "",
      genreID: "",
    })
    const uploadAudio = async (file: File) => {
      input.value.audio = file
    }
    return {
      input,
      uploadAudio
    }
  }
})
</script>