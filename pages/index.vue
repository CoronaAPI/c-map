<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="mb-4" color="#999660" dark>
        <v-card-title class="headline">Confirmed cases</v-card-title>
        <v-card-text>
          <p class="display-1 text--primary text-center">
            {{ overview.confirmed }}
          </p>
        </v-card-text>
      </v-card>
      <v-card class="mb-4" color="#60996b" dark>
        <v-card-title class="headline">Recovered</v-card-title>
        <v-card-text>
          <p class="display-1 text--primary text-center">
            {{ overview.recovered }}
          </p>
        </v-card-text>
      </v-card>
      <v-card class="mb-4" color="#854d56" dark>
        <v-card-title class="headline">Deaths</v-card-title>
        <v-card-text>
          <p class="display-1 text--primary text-center">
            {{ overview.deaths }}
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const cData = await $axios.$get(
      'https://coronavirus-tracker-api.herokuapp.com/all'
    )
    return { overview: cData.latest }
  },
  mounted() {
    this.$axios
      .get('https://coronavirus-tracker-api.herokuapp.com/all')
      .then((res) => (this.overview = res.data.latest))
  }
}
</script>
