<template>
  <div class="mb-2 ml-5 mt-2">
    <v-btn
      class="mr-2"
      color="#1DA1F2"
      small
      :disabled="!externalLink.twitter"
      dark
      fab
    >
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
    <v-btn
      class="mr-2"
      color="#FE5000"
      small
      :disabled="!externalLink.soundCloud"
      dark
      fab
    >
      <v-icon>mdi-soundcloud</v-icon>
    </v-btn>
    <v-btn
      class="mr-2"
      color="#3B5998"
      small
      :disabled="!externalLink.facebook"
      dark
      fab
    >
      <v-icon>mdi-facebook</v-icon>
    </v-btn>
    <v-btn
      class="mr-2"
      color="#FF0000"
      small
      :disabled="!externalLink.youtube"
      dark
      fab
    >
      <v-icon>mdi-youtube</v-icon>
    </v-btn>
    <v-btn
      class="mr-2"
      color="#D93177"
      :disabled="!externalLink.instagram"
      small
      dark
      fab
    >
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    externalLink: {
      type: Object,
      required: true
    }
  }
})
</script>

<style>

</style>