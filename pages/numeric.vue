<template>
  <v-container>
    <v-layout column justify-center>
      <v-alert dense type="info">
        <strong>Last update:</strong>&nbsp;
        {{ formatedDate }}
      </v-alert>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="sortedList"
        :search="search"
        class="elevation-1"
      />
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'country', value: 'country' },
        { text: 'cases', value: 'cases' },
        { text: 'active', value: 'active' },
        { text: 'recovered', value: 'recovered' },
        { text: 'deaths', value: 'deaths' },
        { text: 'tested', value: 'tested' },
        { text: 'county', value: 'county' },
        { text: 'state', value: 'state' },
        { text: 'population', value: 'population' },
        { text: 'rating', value: 'rating' },
        { text: 'url', value: 'url' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      formatedDate: 'confirmedUpdatedAt',
      overview: 'getCoronaData'
    }),
    sortedList() {
      return [...this.overview]
        .filter((l) => l.cases > 0)
        .sort((a, b) => b.cases - a.cases)
    }
  }
}
</script>
