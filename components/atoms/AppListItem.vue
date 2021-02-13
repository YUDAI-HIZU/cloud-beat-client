<template>
  <v-list-item :to="link" @click="onClick">
    <v-list-item-icon>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { defineComponent, computed, reactive, useContext, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    }
  },
  setup(_, ctx) {
    const onClick = (event) => {
      ctx.emit('click', event)
    }
    return {
      onClick
    }
  }
})
</script>

<style>

</style>