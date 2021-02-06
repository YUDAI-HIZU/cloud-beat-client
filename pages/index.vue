<template>
  <div>
    <h1 class="title">
      Firebase v2
    </h1>
  </div>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
  apollo: {
    user: gql`
      query {
        user(id: "1") {
          name
          id
        }
      }
    `
  },
})
</script>
