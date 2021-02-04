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
  methods: {
    login() {
      this.$fire.auth.signInWithPopup(provider).then(function(result) {
        const user = result.user;
        console.log('success : ' + user)
      }).catch(function(error) {
        var errorCode = error.code;
        console.log('error : ' + errorCode)
      });
      }
  },
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
  created() {
    console.log(process.env.STAGE)
  }
})
</script>
