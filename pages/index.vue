<template>
  <v-layout>
    <v-flex>
      <v-row justify="center">
        <v-col cols="12" sm="4">
          <v-card color="#999660" dark>
            <v-card-title class="headline">Confirmed cases</v-card-title>
            <v-card-text>
              <p class="display-1 text--primary text-center">
                {{ overview.latest.confirmed }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card color="#60996b" dark>
            <v-card-title class="headline">Recovered</v-card-title>
            <v-card-text>
              <p class="display-1 text--primary text-center">
                {{ overview.latest.recovered }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card color="#854d56" dark>
            <v-card-title class="headline">Deaths</v-card-title>
            <v-card-text>
              <p class="display-1 text--primary text-center">
                {{ overview.latest.deaths }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div id="map-wrap" style="height: 65vh; width: 100%;">
        <client-only>
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
        </client-only>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const cData = await $axios.$get(
      'https://coronavirus-tracker-api.herokuapp.com/all'
    )
    return { overview: cData }
  },
  computed: {
    markers() {
      return this.overview.confirmed.locations.map((l, index) => {
        return { ...l.coordinates, cases: l.latest, index }
      })
    }
  },
  mounted() {
    this.$axios
      .get('https://coronavirus-tracker-api.herokuapp.com/all')
      .then((res) => (this.overview = res.data))
  }
}
</script>
