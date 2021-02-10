<template>
  <div>
    <h1 class="title">
      Firebase v2
      {{envType}}
    </h1>
  </div>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
  computed: {
    envType() {
      console.log(process.env.BASE_URL)
    }
  },
  apollo: {
    auth: gql`
      query {
        auth {
          name
          id
        }
      }
    `
  },
})
</script>
