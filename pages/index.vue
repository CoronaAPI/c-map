<template>
  <v-container>
    <v-layout>
      <v-flex>
        <client-only>
          <p>Click on the points on the map to get more information</p>
          <div id="map-wrap" style="height: 60vh; width: 100%;">
            <l-map :zoom="2" :min-zoom="2" :max-zoom="13" :center="[50.0, 8.4]">
              <l-tile-layer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-circle
                v-for="marker in markers"
                :key="marker.key"
                :lat-lng="[marker.coordinates[1], marker.coordinates[0]]"
                :radius="marker.cases * 10"
                color="red"
              >
                <l-popup>
                  <p><strong>country:</strong>&nbsp;{{ marker.country }}</p>
                  <p><strong>cases:</strong>&nbsp;{{ marker.cases }}</p>
                  <p><strong>active:</strong>&nbsp;{{ marker.active }}</p>
                  <p><strong>recovered:</strong>&nbsp;{{ marker.recovered }}</p>
                  <p><strong>deaths:</strong>&nbsp;{{ marker.deaths }}</p>
                  <p><strong>tested:</strong>&nbsp;{{ marker.tested }}</p>
                  <p><strong>county:</strong>&nbsp;{{ marker.county }}</p>
                  <p><strong>state:</strong>&nbsp;{{ marker.state }}</p>
                  <p>
                    <strong>population:</strong>&nbsp;{{ marker.population }}
                  </p>
                  <p><strong>rating:</strong>&nbsp;{{ marker.rating }}</p>
                  <p><strong>url:</strong>&nbsp;{{ marker.url }}</p>
                </l-popup>
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
        .filter((l) => l.coordinates && l.coordinates[0] !== undefined)
        .map((l, index) => {
          return {
            ...l,
            key: index,
            cases: l.cases,
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
