<template>
  <v-layout>
    <v-flex>
      <v-row justify="center">
        <v-col v-for="(i, index) in indices" :key="index" cols="12" sm="4">
          <v-card
            :color="i.indice.color"
            dark
            @click="setActiveIndice(i.indice)"
          >
            <v-card-title class="headline">{{ i.headline }}</v-card-title>
            <v-card-text>
              <p class="display-1 text--primary text-center">
                {{ i.value }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <client-only>
        <v-switch
          v-model="showRelativeRatio"
          class="ma-2"
          label="Show number of cases in relation to population (cases / population)"
        ></v-switch>
        <div id="map-wrap" style="height: 65vh; width: 100%;">
          <l-map :zoom="2" :min-zoom="2" :max-zoom="13" :center="[50.0, 8.4]">
            <l-tile-layer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-circle
              v-for="marker in markers"
              :key="marker.key"
              :lat-lng="[marker.lat, marker.long]"
              :radius="getRadius(marker)"
              :color="activeIndice.color"
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeIndice: {
        tag: 'confirmed',
        color: '#999660'
      },
      indiceConfig: {
        confirmed: {
          tag: 'confirmed',
          color: '#999660'
        },
        recovered: {
          tag: 'recovered',
          color: '#60996b'
        },
        deaths: {
          tag: 'deaths',
          color: '#854d56'
        }
      },
      showRelativeRatio: false
    }
  },
  computed: {
    ...mapGetters({
      overview: 'getCoronaData',
      confirmedCountries: 'confirmedCountries',
      recoveredCountries: 'recoveredCountries',
      deathsCountries: 'deathsCountries'
    }),
    markers() {
      if (this.showRelativeRatio) {
        let locations = this.confirmedCountries
        switch (this.activeIndice.tag) {
          case this.indiceConfig.recovered.tag:
            locations = this.recoveredCountries
            break
          case this.indiceConfig.deaths.tag:
            locations = this.deathsCountries
            break
          default:
            break
        }
        return locations
          .map((l, index) => {
            return {
              ...l.coordinates,
              country: l.country,
              cases: l.latest,
              ratioPopCases: l.ratioPopCases,
              index
            }
          })
          .filter((l) => l.cases > 0)
      }
      return this.overview[this.activeIndice.tag].locations
        .map((l, index) => {
          return {
            ...l.coordinates,
            country: l.country,
            cases: l.latest,
            index
          }
        })
        .filter((l) => l.cases > 0)
    },
    indices() {
      return [
        {
          headline: 'Confirmed cases',
          indice: this.indiceConfig.confirmed,
          value: this.overview.latest.confirmed
        },
        {
          headline: 'Recovered',
          indice: this.indiceConfig.recovered,
          value: this.overview.latest.recovered
        },
        {
          headline: 'Deaths',
          indice: this.indiceConfig.deaths,
          value: this.overview.latest.deaths
        }
      ]
    }
  },
  methods: {
    setActiveIndice(indice) {
      this.activeIndice = indice
    },
    getRadius(marker) {
      if (this.showRelativeRatio) {
        return marker.ratioPopCases * 1000000
      }
      return marker.cases * 15
    }
  }
}
</script>
