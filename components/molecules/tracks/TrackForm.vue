<template>
  <div>
    <v-list-item three-line>
      <v-list-item-avatar
        tile
        size="200"
        color="grey"
      >
        <v-img
          :src="thumbnailUrl"
          @click="$refs.fileRef.click()"
        >
        <input
          class="d-none"
          type="file"
          ref="fileRef"
          accept="image/jpeg, image/jpg, image/png"
          @change="onChangeFile"
        >
        </v-img>
      </v-list-item-avatar>
      <v-card-text>
        <div class="font-weight-bold mt-4">
          タイトル
        </div>
        <div>
          <v-text-field
            hint="100文字"
            v-model="input.title"
          ></v-text-field>
        </div>
        <div class="font-weight-bold mt-2">
          ジャンル
        </div>
        <div>
          <v-autocomplete
            chips
            :items="genres"
            item-text="name"
            item-value="id"
            v-model="input.genreID"
          ></v-autocomplete>
        </div>
        <div class="font-weight-bold mt-2">
          Youtube URL
        </div>
        <div>
          <v-text-field
            v-model="input.youtubeLink"
          ></v-text-field>
        </div>
        <div class="font-weight-bold mt-2">
          詳細
        </div>
        <div>
          <v-textarea
            hint="255文字"
            v-model="input.description"
          ></v-textarea>
        </div>
      </v-card-text>
    </v-list-item>

    <v-card-actions class="d-flex justify-end mx-6">
      <v-btn
        color="primary"
        text
      >
        <strong>キャンセル</strong>
      </v-btn>
      <v-btn
        color="primary"
        rounded
        @click="onClickSave"
      >
        <strong>保存</strong>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'
import { CreateTrackInput, Genre } from '~/apollo/model/generated'

export default defineComponent({
  props: {
    audio: {
      type: File
    }
  },
  setup(props, ctx) {
    const { app } = useContext()
    const input: Ref<CreateTrackInput> = ref({
      title: "",
      audio: props.audio as File | null,
      thumbnail: null as File | null,
      description: "",
      youtubeLink: "",
      genreID: ""
    })
    const genres = ref([])
    useAsync(async () => {
      genres.value = await app.$genreRepository.genres()
    })
    const thumbnailUrl = ref(require('~/assets/images/icons/thumbnail.png'))
    const onChangeFile = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        input.value.thumbnail = files[0]
        thumbnailUrl.value = URL.createObjectURL(files[0])
      }
    }
    const onClickSave = async () => {
      console.log(input.value)
      try {
        const response = await app.$trackRepository.createTrack(input.value)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    return {
      input,
      genres,
      thumbnailUrl,
      onChangeFile,
      onClickSave
    }
  }
})
</script>
