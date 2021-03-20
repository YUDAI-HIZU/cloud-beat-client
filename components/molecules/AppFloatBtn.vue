<template>
  <v-card>
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="true"
      fixed
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
          x-large
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-music
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        color="green darken-1"
      >
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        color="pink darken-1"
      >
        <v-icon>mdi-account-music-outline</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        color="orange darken-1"
        to="/tracks/new"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      fab: false,
    }),
  }
</script>
