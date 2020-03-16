<template>
  <v-layout column justify-center>
    <v-chip class="ma-2" color="green" text-color="black">
      {{ `last update at: ${formatedDate}` }}
    </v-chip>
    <v-chip class="ma-2" color="yellow" text-color="black">
      {{ `Total confirmed infections: ${cases}` }}
    </v-chip>
    <v-data-table
      :headers="headers"
      :items="locations"
      class="elevation-1"
    ></v-data-table>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: 'country', value: 'country' },
        { text: 'province', value: 'province' },
        { text: 'cases', value: 'latest' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      overview: 'getCoronaData',
      formatedDate: 'confirmedUpdatedAt',
      cases: 'confirmedCases',
      locations: 'confirmedLocations'
    })
  }
}
</script>
