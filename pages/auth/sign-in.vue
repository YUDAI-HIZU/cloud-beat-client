<template>
  <v-card class="pb-5 mx-auto" max-width="500px">
    <v-card-text>
      <h2 class="text-center title font-weight-bold">ログイン</h2>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-text-field
        filled
        label="メールアドレス"
        v-model="state.email"
      ></v-text-field>
      <v-text-field
        filled
        label="パスワード"
        v-model="state.password"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="px-5">
      <v-btn
        class="text-capitalize"
        width="100%"
        color="secondary"
        large
        @click="onClickSignIn"
      >
        login
      </v-btn>
    </v-card-actions>
    <v-divider class="mx-4 my-4"></v-divider>
    <v-card-actions class="px-5 my-2">
      <v-btn
        class="font-weight-bold text-capitalize"
        color="#55acee"
        width="100%"
        large
        dark
        @click="signInWithProvider('twitter')"
      >
        <v-icon right dark style="position: absolute; left: 0;">mdi-twitter</v-icon>
        Twitter
      </v-btn>
    </v-card-actions>
    <v-card-actions class="px-5 my-2">
      <v-btn
        class="font-weight-bold text-capitalize"
        color="#3b5998"
        width="100%"
        large
        dark
        @click="signInWithProvider('facebook')"
      >
        <v-icon right dark style="position: absolute; left: 0;">mdi-facebook</v-icon>
        Facebook
      </v-btn>
    </v-card-actions>
    <v-card-actions class="px-5 my-2">
      <v-btn
        class="font-weight-bold text-capitalize"
        color="white"
        width="100%"
        large
        style="color: black;"
        @click="signInWithProvider('google')"
      >
        <img src="~assets/images/socials/google.png" alt="google-logo" height="20" width="20" style="position: absolute; left: 5px;">
        Sign in with Google
      </v-btn>
    </v-card-actions>
    <v-card-actions class="px-5 my-2">
      <v-btn class="font-weight-bold" width="100%" color="primary" large text to="/auth/password">
        パスワードを忘れた方はこちら
      </v-btn>
    </v-card-actions>
    <v-card-actions class="px-5 my-2">
      <v-btn class="font-weight-bold" width="100%" color="primary" large text to="/auth/sign-up">
        新規登録はこちら
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'
import { SignIn } from '~/types/auth'

export default defineComponent({
  setup(_, ctx) {
    const { app } = useContext()
    const state = reactive<SignIn>({
      email: "",
      password: ""
    })
    const onClickSignIn = async () => {
      try {
        await app.$auth.signIn(state.email, state.password)
        ctx.root.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
    const signInWithProvider = async (providerName: string) => {
      try {
        await app.$auth.signInWithProvider(providerName)
        ctx.root.$router.push('/')
      } catch(error) {
        console.error(error)
      }
    }
    return {
      state,
      onClickSignIn,
      signInWithProvider
    }
  }
})
</script>
