<template>
  <div>
    <h1 class="title">
      private
    </h1>
  </div>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
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
