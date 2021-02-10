<template>
  <v-card class="pb-5 mx-auto" max-width="500px">
    <v-card-text>
      <p class="text-center"><v-icon class="display-2">mdi-email</v-icon></p>
      <h2 class="text-center title font-weight-bold">メールをご確認ください</h2>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <p>
        メールに記載されたURLをクリックの上、会員登録を完了してください。<br>
        もしメールが届かない場合は、迷惑メールをご確認いただき、<br>「@cloud-beat-pro.firebaseapp.com」からのメール受信を許可してください。
      </p>
    </v-card-text>
    <v-card-actions class="px-5">
      <v-btn
        class="text-capitalize"
        width="100%"
        color="secondary"
        large
        @click="onClickSendEmail"
      >
        <strong>確認メールを再送</strong>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { app } = useContext()
    const onClickSendEmail = async () => {
      try {
        await app.$auth.sendEmailVerification()
      } catch (error) {
        console.error(error)
      }
    }
    return {
      onClickSendEmail
    }
  }
})
</script>

