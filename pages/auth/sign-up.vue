<template>
  <v-card class="pb-5 mx-auto" max-width="500px">
    <v-card-text>
      <h2 class="text-center title font-weight-bold">新規登録</h2>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-text-field
        filled
        label="ユーザー名"
        v-model="state.displayName"
      ></v-text-field>
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
      <v-text-field
        filled
        label="パスワード確認"
      ></v-text-field>
      <v-checkbox
        v-model="state.agreement"
        value="1"
        type="checkbox"
      >
        <template class="text-box" v-slot:label>
          <nuxt-link class="small-text" to="#">利用規約</nuxt-link>
          <span class="small-text">と</span>
          <nuxt-link class="small-text" to="#">プライバシーポリシー</nuxt-link>
          <span class="small-text">に同意する</span>
        </template>
      </v-checkbox>
    </v-card-text>
    <v-card-actions class="px-5">
      <v-btn
        class="text-capitalize"
        width="100%"
        color="secondary"
        large
        @click="onClickSignUp"
      >
        SignUp
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
        @click="signUpWithProvider('twitter')"
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
        @click="signUpWithProvider('facebook')"
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
        @click="signUpWithProvider('google')"
      >
        <img src="~assets/images/icons/google.png" alt="google-logo" height="20" width="20" style="position: absolute; left: 5px;">
        Sign up with Google
      </v-btn>
    </v-card-actions>
    <v-card-actions class="px-5 my-2">
      <v-btn class="font-weight-bold" width="100%" color="primary" large text to="/auth/sign-in">
        既にアカウントをお持ちの方はこちら
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'
import { SignUp } from '~/types/auth'

export default defineComponent({
  setup(_, ctx) {
    const { app } = useContext()
    const state = reactive<SignUp>({
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      agreement: null,
    })
    const onClickSignUp = async () => {
      try {
        await app.$auth.signUp(state.email, state.password, state.displayName)
        ctx.root.$router.push('/auth/send-email')
      } catch (error) {
        console.error(error)
      }
    }
    const signUpWithProvider = async (providerName: string) => {
      try {
        await app.$auth.signInWithProvider(providerName)
        ctx.root.$router.push('/')
      } catch(error) {
        console.error(error)
      }
    }
    return {
      state,
      onClickSignUp,
      signUpWithProvider
    }
  }
})

</script>