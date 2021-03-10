<template>
  <v-card max-width="550" class="mx-auto">
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
          @change="selectedIcon"
        >
        <v-avatar @click="$refs.fileRef.click()" size="60">
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
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, computed, ref, useFetch } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'
import { User, UpdateUserInput } from '~/apollo/model/generated'

export default defineComponent({
  middleware: 'auth',
  setup(_, ctx) {
    const { app } = useContext()
    const fileRef = ref<HTMLInputElement>()
    const iconRef = ref<HTMLImageElement>()
    const user: Ref<User> = ref({
      id:"",
      uid: "",
      displayName: "",
      introduction: "",
      webUrl: "",
      iconUrl: "",
      coverUrl: ""
    })
    const input: Ref<UpdateUserInput> = ref({
      displayName: "",
      introduction: "",
      webUrl: "",
      iconImage: null,
      coverImage: null
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
    const selectedIcon = async (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        input.value.iconImage = files[0]
      }
    }
    const onClickSave = async () => {
      input.value.displayName = user.value.displayName
      input.value.introduction = user.value.introduction
      input.value.webUrl = user.value.webUrl
      try {
        await app.$userRepository.updateUser(input.value)
        ctx.root.$router.push('/account')
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
      selectedIcon,
      onClickSave
    }
  }
})
</script>