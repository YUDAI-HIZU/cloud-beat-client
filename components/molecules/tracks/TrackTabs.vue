<template>
  <v-card max-width="900px" class="mx-auto">
    <v-tabs
      class="mb-10"
      dark
      background-color="black"
    >
      <v-tab exact to="/tracks/new">
        <strong>アップロード</strong>
      </v-tab>
      <v-tab exact to="/tracks">
        <strong>自分の音源</strong>
      </v-tab>
      <v-tab exact to="/tracks/liked">
        <strong>お気に入り</strong>
      </v-tab>
    </v-tabs>
  </v-card>
</template>
