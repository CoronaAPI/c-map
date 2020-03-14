<template>
  <v-layout>
    <div class="d-flex flex-column">
      <v-chip class="ma-2" color="green" text-color="black">
        {{ `last update at: ${formatedDate}` }}
      </v-chip>
      <v-chip class="ma-2" color="yellow" text-color="black">
        {{ `Total confirmed infections: ${cases}` }}
      </v-chip>
      <v-data-table
        :headers="headers"
        :items="locations"
        :items-per-page="100"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const cData = await $axios.$get(
      'https://coronavirus-tracker-api.herokuapp.com/confirmed'
    )
    return {
      date: cData.last_updated,
      cases: cData.latest,
      locations: cData.locations
        .map((l) => ({
          country: l.country,
          country_code: l.country_code,
          province: l.province,
          latest: l.latest
        }))
        .sort((a, b) => b.latest - a.latest)
    }
  },
  data() {
    return {
      headers: [
        { text: 'country', value: 'country' },
        { text: 'code', value: 'country_code' },
        { text: 'province', value: 'province' },
        { text: 'cases', value: 'latest' }
      ]
    }
  },
  computed: {
    formatedDate() {
      return new Date(this.date).toLocaleDateString('en-EN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    }
  }
}
</script>
