<template>

  <v-card color="black" class="mx-auto rounded-0">
    <v-card-title>
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
          <v-btn class="mt-5 ml-5 text-capitalize" color="primary" to="/tracks/new">
            <v-icon>mdi-cloud-upload-outline</v-icon>
            <h2 class="ml-1 font-weight-bold d-none d-sm-block d-md-block d-lg-block">Upload</h2>
          </v-btn>
          <v-btn class="mt-5 ml-2 text-capitalize" color="primary" to="/tracks/new">
            <v-icon>mdi-cloud-upload-outline</v-icon>
            <h2 class="ml-1 font-weight-bold d-none d-sm-block d-md-block d-lg-block">Upload</h2>
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col>
          <app-external-links :externalLink="externalLink" />
          <app-external-links :externalLink="externalLink" />
        </v-col>
      </v-col>
    </v-card-title>
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
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync , ref, computed, useFetch } from '@nuxtjs/composition-api'
import { Ref } from '@vue/composition-api'
import { ExternalLink, User } from '~/apollo/model/generated'
import AppExternalLinks from '~/components/atoms/AppExternalLinks.vue'
import AppMusicCard from '~/components/molecules/AppMusicCard.vue'

export default defineComponent({
  components: { AppMusicCard, AppExternalLinks },
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
    })
    const externalLink: Ref<ExternalLink> = ref({
      twitter: "",
      soundCloud: "",
      facebook: "",
      youtube: "",
      instagram: "",
    })
    useFetch(async () => {
      const user = app.$auth.user
      const response = await Promise.all([
        app.$userRepository.currentUser(),
        app.$externalLinkRepository.externalLinkByUserID({ userID: user.id })
      ])
      user.value = response[0].currentUser
      externalLink.value = response[1].externalLinkByUserID
    })
    const iconUrl = computed(() => user.value.iconUrl || require("~/assets/images/icons/icon.png"))
    return {
      user,
      externalLink,
      iconUrl,
    }
  }
})
</script>
