<template>
  <div>
    <track-tabs />
    <v-card color="black" max-width="900px" class="mx-auto py-4">
      <v-list two-line color="black">
      <v-list-item-group
        color="white"
      >
        <v-list-item
          v-for="track in tracks"
          :key="track.id"
        >
          <v-list-item-avatar rounded>
            <v-img :src="track.thumbnailUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="track.title"></v-list-item-title>
            <v-list-item-subtitle v-text="track.title"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="lighten-1">mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list width="150px" class="pa-0">
              <v-list-item>
                <v-list-item-title>編集</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>シェア</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title style="color: red;">削除</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync, computed, ref, useRouter, useFetch } from '@nuxtjs/composition-api'
import TrackTabs from '~/components/molecules/tracks/TrackTabs.vue'
export default defineComponent({
  components: { TrackTabs },
  middleware: 'auth',
  setup() {
    const { app } = useContext()
    const tracks = ref([])
    useAsync(async () => {
      const response = await app.$trackRepository.tracksByUserID({userID: 2})
      tracks.value = response.tracksByUserID
    })
    return {
      tracks
    }
  }
})
</script>
