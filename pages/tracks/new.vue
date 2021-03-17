<template>
  <v-card max-width="900px" class="mx-auto py-4">
    <template v-if="input.sound">
      <track-form
        :audio="input.sound"
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
      sound: null as File | null,
      thumbnail: null as File | null
    })
    const uploadAudio = async (file: File) => {
      input.value.sound = file
    }
    return {
      input,
      uploadAudio
    }
  }
})
</script>