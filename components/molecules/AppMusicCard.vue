<template>
  <v-card
    width="240"
    class="mb-6"
    color="#952175"
    dark
  >
    <v-img
      height="240px"
      width="240px"
      src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
    >
      <v-card-actions class="mt-3 ml-2">
        <v-btn
          class="ml-16 mt-16"
          fab
          icon
          x-large
        >
          <v-icon x-large>mdi-play</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title class="white--text" style="margin-top: 0px;">
        <v-avatar
          size="50"
        >
          <img
            alt="user"
            src="~/assets/images/icons/account.png"
          >
        </v-avatar>
        <p class="ml-3 mt-3 ellipsis">
          Ellie Goulding
        </p>
      </v-card-title>
    </v-img>
    <div>
      <div>
        <v-card-title>
          <h2 class="ellipsis">chil out music</h2>
        </v-card-title>
        <v-card-subtitle class="ellipsis" v-text="`ellipsis`">
        </v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, ctx) {
    
  }
})
</script>
