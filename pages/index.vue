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
        <div id="map-wrap" style="height: 65vh; width: 100%;">
          <l-map :zoom="2" :min-zoom="2" :max-zoom="13" :center="[50.0, 8.4]">
            <l-tile-layer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-circle
              v-for="marker in markers"
              :key="marker.key"
              :lat-lng="[marker.lat, marker.long]"
              :radius="marker.cases * 15"
              :color="activeIndice.color"
            >
              <l-popup>{{ `cases: ${marker.cases}` }}</l-popup>
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
      }
    }
  },
  computed: {
    ...mapGetters({
      overview: 'getCoronaData'
    }),
    markers() {
      return this.overview[this.activeIndice.tag].locations
        .map((l, index) => {
          return { ...l.coordinates, cases: l.latest, index }
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
    }
  }
}
</script>
