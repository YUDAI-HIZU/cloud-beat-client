<template>
  <v-card max-width="900px" class="mx-auto">
    <v-img
      height="200px"
      :src="coverUrl"
      :lazy-src="coverUrl"
    >
      <v-card-title class="white--text" style="margin-top: 100px;">
        <v-avatar size="56">
          <v-img
            alt="user"
            :src="iconUrl"
            :lazy-src="iconUrl"
          />
        </v-avatar>
        <p class="ml-3 mt-10">
          <strong>{{ user.displayName }}</strong>
        </p>
      </v-card-title>
    </v-img>
    <v-card-actions class="mt-2">
      <v-spacer />
      <v-btn
        color="primary"
        rounded
        outlined
        to="/account/edit"
      >
        <strong>編集</strong>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">
        自己紹介
      </div>
      <div class="mb-2 mx-8">
        <template v-if="!user.introduction">未設定</template>
        <p style="white-space: pre-wrap;">{{ user.introduction }}</p>
      </div>
      <v-divider />
      <div class="font-weight-bold mt-4 ml-8 mb-2">
        Webサイト
      </div>
      <div class="mx-8 d-flex mb-4">
        <template v-if="!user.webUrl">未設定</template>
        <a :href="user.webUrl" target="_blank">{{ user.webUrl }}</a>
      </div>
      <v-divider />
      <div class="font-weight-bold mt-4 ml-8 mb-2">
        Tracks
      </div>
      <div class="mt-4 mx-8 mb-2 d-flex scroller flex-nowrap">
        <template v-for="i in 10">
          <app-music-card :key="i" />
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch, computed } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'
import { User } from '~/apollo/model/generated'

export default defineComponent({
  middleware: 'auth',
  setup() {
    const { app } = useContext()
    const user: Ref<User> = ref({
      id:"",
      uid: "",
      displayName: "",
      introduction: "",
      webUrl: "",
      iconUrl: "",
      coverUrl: ""
    })
    useFetch(async() => {
      try {
        const response = await app.$userRepository.currentUser()
        user.value = response.currentUser
      } catch (error) {
        console.error(error)
      }
    })
    const iconUrl = computed(() => user.value.iconUrl || require("~/assets/images/icons/account.png"))
    const coverUrl = computed(() => user.value.coverUrl || "https://beiz.jp/images_P/black/black_00080.jpg")
    return {
      user,
      iconUrl,
      coverUrl
    }
  }
})
</script>