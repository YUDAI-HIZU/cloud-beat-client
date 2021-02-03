<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Firebase v2
      </h1>
       <div class="container">
        <button class="button is-primary is-rounded" @click="login">
          ログイン
        </button>
      </div>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
