<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Corona live data
        </v-card-title>
        <v-chip class="ma-2" color="yellow" text-color="black">
          {{ `Confirmed infections: ${overview.confirmed}` }}
        </v-chip>
        <v-chip class="ma-2" color="green" text-color="black">
          {{ `Recovered: ${overview.recovered}` }}
        </v-chip>
        <v-chip class="ma-2" color="red" text-color="white">
          {{ `Deaths: ${overview.deaths}` }}
        </v-chip>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/numeric">
            Continue
          </v-btn>
        </v-card-actions>
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
  }
}
</script>
