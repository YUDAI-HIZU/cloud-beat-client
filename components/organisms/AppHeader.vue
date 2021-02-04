<template>
  <v-app-bar
    color="background"
    fixed
    height="75"
  >
    <v-toolbar-title>
      <nuxt-link to="/">
        <img
          class="mt-1"
          :src="require('~/assets/images/logo.png')"
          height="60"
        />
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="mr-2 pc">
      <v-btn class="text-capitalize" to="/auth/sign-up" text >Sign up</v-btn>
      <v-btn class="text-capitalize" to="/auth/sign-in" color="secondary" >login</v-btn>
    </v-toolbar-title>
    <v-toolbar-title class="mobile">
      <v-btn icon class="mr-2">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-btn>
    </v-toolbar-title>
  </v-app-bar>
</template>
