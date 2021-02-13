<template>
  <v-card max-width="550" class="mx-auto">
    <v-img
      height="200px"
      src="https://i.gyazo.com/e95618ed2c4ccce100d0ee6dc9260f6f.png"
    >
      <v-card-title class="white--text" style="margin-top: 100px;">
        <v-avatar size="56">
          <img
            alt="user"
            src="~/assets/images/account.png"
          >
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
import { defineComponent, useContext, ref, useAsync } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'
import { User } from '~/apollo/model/generated'

export default defineComponent({
  middleware: 'auth',
  setup(_, ctx) {
    const { app } = useContext()
    const user: Ref<User> = ref({
      id: "",
      uid: "",
      displayName: "",
      webUrl: "",
      introduction: "",
      createdAt: "",
      updatedAt: ""
    })
    useAsync(async() => {
      user.value = await app.$userRepository.currentUser()
    })
    const onClickSave = async () => {
      try {
        await app.$userRepository.updateUser(user.value)
        ctx.root.$router.push('/account')
      } catch(error) {
        console.error(error)
      }
    }
    return {
      user,
      onClickSave
    }
  }
})
</script>