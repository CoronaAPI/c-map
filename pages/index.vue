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
                  <div
                    v-for="prop in Object.entries(marker).sort()"
                    :key="prop[0]"
                  >
                    <p v-if="typeof prop[1] !== 'object'" class="marker-text">
                      <strong>{{ prop[0] }}</strong
                      >&nbsp;{{ prop[1] }}
                    </p>
                  </div>
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
      reducedOverview: 'reducedCoronaData',
      formatedDate: 'confirmedUpdatedAt',
      dataSource: 'getDataSources'
    }),
    markers() {
      const list =
        this.selectedData === 'all' ? this.reducedOverview : this.overview
      return list.filter(
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
          ? this.listOfSources[0]
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
