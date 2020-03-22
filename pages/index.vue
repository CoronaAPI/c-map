<template>
  <v-container>
    <v-layout>
      <v-flex>
        <client-only>
          <div id="map-wrap" style="height: 60vh; width: 100%;">
            <l-map :zoom="2" :min-zoom="2" :max-zoom="13" :center="[50.0, 8.4]">
              <l-tile-layer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-circle
                v-for="marker in markers"
                :key="marker.key"
                :lat-lng="[marker.lat, marker.long]"
                :radius="getRadius(marker)"
                :color="red"
              >
                <l-popup>{{
                  `country: ${marker.country}, cases: ${marker.cases}`
                }}</l-popup>
              </l-circle>
            </l-map>
          </div>
        </client-only>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      overview: 'getCoronaData'
    }),
    markers() {
      return this.overview
        .filter((l) => l.coordinates !== undefined)
        .map((l, index) => {
          return {
            ...l.coordinates,
            coordinates: {
              lat: l.coordinates[1],
              long: l.coordinates[0]
            },
            country: l.country,
            cases: l.active,
            index
          }
        })
        .filter((l) => l.cases > 0)
    }
  },
  methods: {
    getRadius(marker) {
      return marker.cases * 15
    }
  }
}
</script>
