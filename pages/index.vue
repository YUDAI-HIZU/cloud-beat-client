<template>
  <v-row>
    <v-col class="d-flex justify-space-between">
      <h1 class="title font-weight-bold">
        ピックアップ
      </h1>
      <v-btn text color="primary">
        <strong>もっと見る</strong>
      </v-btn>
    </v-col>
    <v-col>
      <v-row class="d-flex scroller flex-nowrap py-3">
        <v-col v-for="i in 10" :key="i" >
          <app-music-card />
        </v-col>
      </v-row>
      <v-divider />
    </v-col>
    <v-col class="d-flex justify-space-between">
      <h1 class="title font-weight-bold">
        ニューリリース
      </h1>
      <v-btn text color="primary">
        <strong>もっと見る</strong>
      </v-btn>
    </v-col>
    <v-col>
      <v-row class="d-flex scroller flex-nowrap py-3">
        <v-col v-for="i in 10" :key="i" >
          <app-music-card />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
