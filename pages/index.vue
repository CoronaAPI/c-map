<template>
  <v-container>
    <client-only>
      <v-layout>
        <v-flex>
          <v-alert dense type="info">
            <strong>Last update:</strong>&nbsp;
            {{ formatedDate }}
            <p>
              <strong>Disclaimer:</strong> The following values are based on a
              constantly changing data collection. The values presented here
              should not be considered complete or accurate. See
              <a href="https://www.corona-api.org/" target="_blank">here</a> for
              further information
            </p>
          </v-alert>
          <v-row class="mb-12" justify="center">
            <v-col cols="12" sm="3">
              <v-card color="#999660" dark>
                <v-card-title class="headline">Cases</v-card-title>
                <v-card-text>
                  <v-progress-circular
                    v-if="isFetchingData"
                    indeterminate
                    color="white"
                  />
                  <p v-else class="display-1 text--primary text-center">
                    {{ totalNumbers.cases }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card color="#b59670" dark>
                <v-card-title class="headline">Active</v-card-title>
                <v-card-text>
                  <v-progress-circular
                    v-if="isFetchingData"
                    indeterminate
                    color="white"
                  />
                  <p v-else class="display-1 text--primary text-center">
                    {{ totalNumbers.active }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card color="#60996b" dark>
                <v-card-title class="headline">Recovered</v-card-title>
                <v-card-text>
                  <v-progress-circular
                    v-if="isFetchingData"
                    indeterminate
                    color="white"
                  />
                  <p v-else class="display-1 text--primary text-center">
                    {{ totalNumbers.recovered }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card color="#854d56" dark>
                <v-card-title class="headline">Deaths</v-card-title>
                <v-card-text>
                  <v-progress-circular
                    v-if="isFetchingData"
                    indeterminate
                    color="white"
                  />
                  <p v-else class="display-1 text--primary text-center">
                    {{ totalNumbers.deaths }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <div v-if="$vuetify.breakpoint.mdAndUp && !isFetchingData">
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-switch
                  v-model="showRelativeRatio"
                  label="Show the number of cases in relation to the population of a country (cases / population)"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedData"
                  style="z-index: 99999999;"
                  :items="listOfSources"
                  label="sources"
                ></v-select>
              </v-col>
            </v-row>
            <p class="caption">
              Click on the points on the map to get more information
            </p>
            <v-lazy>
              <div id="map-wrap" style="height: 60vh; width: 100%;">
                <l-map
                  :zoom="2"
                  :min-zoom="2"
                  :max-zoom="13"
                  :center="[50.0, 8.4]"
                >
                  <l-tile-layer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
                  ></l-tile-layer>
                  <l-circle-marker
                    v-for="(marker, index) in markers"
                    :key="index"
                    :lat-lng="[marker.coordinates[1], marker.coordinates[0]]"
                    :radius="getRadius(marker)"
                    color="#999660"
                  >
                    <l-popup>
                      <div
                        v-for="prop in Object.entries(marker).sort()"
                        :key="prop[0]"
                      >
                        <p
                          v-if="typeof prop[1] !== 'object'"
                          class="marker-text"
                        >
                          <strong>{{ prop[0] }}</strong
                          >&nbsp;{{ prop[1] }}
                        </p>
                      </div>
                    </l-popup>
                  </l-circle-marker>
                </l-map>
              </div>
            </v-lazy>
          </div>
        </v-flex>
      </v-layout>
    </client-only>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectedSource: '',
      showRelativeRatio: false
    }
  },
  computed: {
    ...mapGetters({
      overview: 'getCoronaData',
      reducedOverview: 'reducedCoronaData',
      formatedDate: 'confirmedUpdatedAt',
      dataSource: 'getDataSources',
      totalNumbers: 'getTotalNumbers',
      isFetchingData: 'isFetchingData'
    }),
    markers() {
      let list =
        this.selectedData === 'all' ? this.reducedOverview : this.overview
      if (this.showRelativeRatio) {
        list = list.filter((l) => {
          return l.population !== undefined
        })
      }
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
      if (this.showRelativeRatio) {
        return (
          (marker.cases / this.totalNumbers.cases / marker.population) *
          2000000000
        )
      }
      return (marker.cases / this.totalNumbers.cases) * 400
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
