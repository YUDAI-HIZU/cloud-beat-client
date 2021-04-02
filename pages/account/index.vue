<template>

  <v-card color="black" class="mx-auto rounded-0">
    <v-img
      height="200px"
      gradient="to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2)"
    >
      <v-col class="d-flex pa-8">
        <v-avatar size="140">
          <v-img
            alt="user"
            :src="iconUrl"
          />
        </v-avatar>
        <v-col>
          <h1 class="ml-5 font-weight-bold text-h4">
            {{user.displayName}}
          </h1>
          <div class="mb-2 ml-5 mt-2">
        <v-btn
          class="mr-2"
          color="#1DA1F2"
          small
          :disabled="!user.twitter"
          dark
          fab
        >
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#FE5000"
          small
          :disabled="!user.soundCloud"
          dark
          fab
        >
          <v-icon>mdi-soundcloud</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#3B5998"
          small
          :disabled="!user.facebook"
          dark
          fab
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#FF0000"
          small
          :disabled="!user.youtube"
          dark
          fab
        >
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#D93177"
          :disabled="!user.instagram"
          small
          dark
          fab
        >
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </div>
        </v-col>
      </v-col>
    </v-img>
    <v-card-actions class="mt-2">
      <v-spacer />
      <v-btn
        color="primary"
        text
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
        SNS
      </div>
      <div class="mb-2 mx-8">
        <v-btn
          class="mr-2"
          color="#1DA1F2"
          small
          :disabled="!user.twitter"
          dark
          fab
        >
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#FE5000"
          small
          :disabled="!user.soundCloud"
          dark
          fab
        >
          <v-icon>mdi-soundcloud</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#3B5998"
          small
          :disabled="!user.facebook"
          dark
          fab
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#FF0000"
          small
          :disabled="!user.youtube"
          dark
          fab
        >
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn
          class="mr-2"
          color="#D93177"
          :disabled="!user.instagram"
          small
          dark
          fab
        >
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync , ref, computed, useFetch } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'
import { User } from '~/apollo/model/generated'
import AppMusicCard from '~/components/molecules/AppMusicCard.vue'

export default defineComponent({
  components: { AppMusicCard },
  middleware: 'auth',
  setup() {
    const { app } = useContext()
    const user: Ref<User> = ref({
      id:"",
      uid: "",
      displayName: "",
      introduction: "",
      webUrl: "",
      twitter: "",
      soundCloud: "",
      facebook: "",
      youtube: "",
      instagram: "",
      iconUrl: "",
    })
    useFetch(async () => {
      user.value = await app.$userRepository.currentUser()
    })
    const iconUrl = computed(() => user.value.iconUrl || require("~/assets/images/icons/icon.png"))
    return {
      user,
      iconUrl,
    }
  }
})
</script>
