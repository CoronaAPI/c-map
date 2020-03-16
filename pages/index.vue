<template>
  <v-layout>
    <client-only>
      <v-flex>
        <v-row justify="center">
          <v-col v-for="(i, index) in indices" :key="index" cols="12" sm="4">
            <v-card :color="i.color" dark>
              <v-card-title class="headline">{{ i.headline }}</v-card-title>
              <v-card-text>
                <p class="display-1 text--primary text-center">
                  {{ i.value }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
              color="red"
            />
          </l-map>
        </div>
      </v-flex>
    </client-only>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      overview: 'getCoronaData'
    }),
    markers() {
      return this.overview.confirmed.locations.map((l, index) => {
        return { ...l.coordinates, cases: l.latest, index }
      })
    },
    indices() {
      return [
        {
          headline: 'Confirmed cases',
          color: '#999660',
          value: this.overview.latest.confirmed
        },
        {
          headline: 'Recovered',
          color: '#60996b',
          value: this.overview.latest.recovered
        },
        {
          headline: 'Deaths',
          color: '#854d56',
          value: this.overview.latest.deaths
        }
      ]
    }
  }
}
</script>
