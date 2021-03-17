<template>
  <v-card max-width="550px" class="mx-auto">
    <v-img
      height="200px"
      :src="coverUrl"
    >
      <v-card-title class="white--text" style="margin-top: 100px;">
        <input
          class="d-none"
          type="file"
          ref="fileRef"
          accept="image/jpeg, image/jpg, image/png"
          @change="onChangeFile"
        >
        <v-avatar @click="$refs.fileRef.click()" size="56">
          <v-img
            alt="icon"
            ref="iconRef"
            :src="iconUrl"
          />
        </v-avatar>
        <v-text-field
          class="ml-3 mt-6"
          label="ユーザー名"
          v-model="user.displayName"
        ></v-text-field>
      </v-card-title>
    </v-img>
    <v-card-actions class="mt-2">
      <v-spacer />
      <v-btn
        color="primary"
        rounded
        @click="onClickSave"
      >
        <strong>保存</strong>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">
        自己紹介
      </div>
      <div class="mb-2 mx-8">
        <v-textarea
          hint="255文字"
          v-model="user.introduction"
        ></v-textarea>
      </div>
      <v-divider />
      <div class="font-weight-bold mt-4 ml-8 mb-2">
        Webサイト
      </div>
      <div class="mx-8 d-flex mb-4">
        <v-text-field
          hint="100文字"
          v-model="user.webUrl"
        ></v-text-field>
      </div>
      <v-divider />
      <div class="font-weight-bold mt-4 ml-8 mb-2">
        SNS
      </div>
      <div class="mb-2 mx-5">
        <v-col class="d-flex">
          <v-btn
            class="mr-2"
            :color="`${user.twitter ? '#1DA1F2' : 'gray' }`"
            small
            dark
            fab
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-text-field
            dense
            class="ml-2"
            label="アカウント名"
            outlined
            v-model="user.twitter"
            />
        </v-col>

        <v-col class="d-flex">
          <v-btn
            class="mr-2"
            :color="`${user.soundCloud ? '#FE5000' : 'gray' }`"
            small
            dark
            fab
          >
            <v-icon>mdi-soundcloud</v-icon>
          </v-btn>
          <v-text-field
            dense
            class="ml-2"
            label="アカウント名"
            outlined
            v-model="user.soundCloud"
            />
        </v-col>

        <v-col class="d-flex">
          <v-btn
            class="mr-2"
            :color="`${user.facebook ? '#3B5998' : 'gray' }`"
            small
            dark
            fab
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-text-field
            dense
            class="ml-2"
            label="アカウント名"
            outlined
            v-model="user.facebook"
            />
        </v-col>

        <v-col class="d-flex">
          <v-btn
            class="mr-2"
            :color="`${user.youtube ? '#FF0000' : 'gray' }`"
            small
            dark
            fab
          >
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
          <v-text-field
            dense
            class="ml-2"
            label="アカウント名"
            outlined
            v-model="user.youtube"
            />
        </v-col>

        <v-col class="d-flex">
          <v-btn
            class="mr-2"
            :color="`${user.instagram ? '#D93177' : 'gray' }`"
            small
            dark
            fab
          >
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-text-field
            dense
            class="ml-2"
            label="アカウント名"
            outlined
            v-model="user.instagram"
            />
        </v-col>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, computed, ref, useRouter, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth',
  setup(_, ctx) {
    const { app } = useContext()
    const router = useRouter()
    const fileRef = ref<HTMLInputElement>()
    const iconRef = ref<HTMLImageElement>()
    const user = ref({
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
      icon: null as File | null,
      cover: null as File | null,
      iconUrl: "",
      coverUrl: ""
    })
    useFetch(async() => {
      user.value = await app.$userRepository.currentUser()
    })
    const iconUrl = computed(() => user.value.iconUrl || require("~/assets/images/icons/account.png"))
    const coverUrl = computed(() => user.value.coverUrl || "https://beiz.jp/images_P/black/black_00080.jpg")
    const onChangeFile = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        user.value.icon = files[0]
        user.value.iconUrl = URL.createObjectURL(files[0])
      }
    }
    const onClickSave = async () => {
      try {
        await app.$userRepository.updateUser(user.value)
        router.push('/account')
      } catch(error) {
        console.error(error)
      }
    }
    return {
      fileRef,
      iconRef,
      user,
      iconUrl,
      coverUrl,
      onChangeFile,
      onClickSave
    }
  }
})
</script>