<template>
  <v-container>
    <v-layout>
      <v-flex>
        <client-only>
          <v-alert dense type="info">
            <strong>Last update:</strong>&nbsp;
            {{ formatedDate }}
          </v-alert>
          <v-select
            v-model="selectedData"
            style="z-index: 99999999;"
            :items="listOfSources"
            label="sources"
          ></v-select>
          <p class="caption">
            Click on the points on the map to get more information
          </p>
          <div id="map-wrap" style="height: 60vh; width: 100%;">
            <l-map :zoom="2" :min-zoom="2" :max-zoom="13" :center="[50.0, 8.4]">
              <l-tile-layer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-circle
                v-for="(marker, index) in markers"
                :key="index"
                :lat-lng="[marker.coordinates[1], marker.coordinates[0]]"
                :radius="marker.cases * 10"
                color="red"
              >
                <l-popup>
                  <p v-if="marker.country" class="marker-text">
                    <strong>country:</strong>&nbsp;{{ marker.country }}
                  </p>
                  <p v-if="marker.cases" class="marker-text">
                    <strong>cases:</strong>&nbsp;{{ marker.cases }}
                  </p>
                  <p v-if="marker.active" class="marker-text">
                    <strong>active:</strong>&nbsp;{{ marker.active }}
                  </p>
                  <p v-if="marker.recovered" class="marker-text">
                    <strong>recovered:</strong>&nbsp;{{ marker.recovered }}
                  </p>
                  <p v-if="marker.deaths" class="marker-text">
                    <strong>deaths:</strong>&nbsp;{{ marker.deaths }}
                  </p>
                  <p v-if="marker.tested" class="marker-text">
                    <strong>tested:</strong>&nbsp;{{ marker.tested }}
                  </p>
                  <p v-if="marker.county" class="marker-text">
                    <strong>county:</strong>&nbsp;{{ marker.county }}
                  </p>
                  <p v-if="marker.state" class="marker-text">
                    <strong>state:</strong>&nbsp;{{ marker.state }}
                  </p>
                  <p v-if="marker.population" class="marker-text">
                    <strong>population:</strong>&nbsp;{{ marker.population }}
                  </p>
                  <p v-if="marker.rating" class="marker-text">
                    <strong>rating:</strong>&nbsp;{{ marker.rating.toFixed(3) }}
                  </p>
                  <p v-if="marker.url" class="marker-text">
                    <strong>source:</strong>&nbsp;{{ marker.url }}
                  </p>
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
  data() {
    return {
      selectedSource: ''
    }
  },
  computed: {
    ...mapGetters({
      overview: 'getCoronaData',
      formatedDate: 'confirmedUpdatedAt',
      dataSource: 'getDataSources'
    }),
    markers() {
      return this.overview.filter(
        (l) =>
          l.coordinates &&
          l.coordinates[0] !== undefined &&
          (l.url === this.selectedData || this.selectedData === 'all') &&
          l.cases > 0
      )
    },
    listOfSources() {
      return ['all', ...this.dataSource]
    },
    selectedData: {
      get() {
        return this.selectedSource === ''
          ? this.listOfSources[1]
          : this.selectedSource
      },
      set(val) {
        this.selectedSource = val
      }
    }
  },
  methods: {
    getRadius(marker) {
      return marker.cases * 15
    }
  }
}
</script>

<style scoped>
.marker-text {
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
