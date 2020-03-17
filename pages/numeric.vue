<template>
  <v-layout column justify-center>
    <v-card class="mb-4">
      <v-chip class="ma-2" color="green" text-color="black">
        <v-avatar left>
          <v-icon>mdi-clock</v-icon>
        </v-avatar>
        <strong>Last update:</strong>&nbsp;
        {{ formatedDate }}
      </v-chip>
      <v-chip class="ma-2" color="yellow" text-color="black">
        <strong>Cases:</strong>&nbsp;
        {{ cases }}
      </v-chip>
    </v-card>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="locations"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.ratioPopCases="{ item }">
        {{ item.ratioPopCases.toFixed(4) }}
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'country', value: 'country' },
        { text: 'cases', value: 'latest' },
        { text: 'population', value: 'population' },
        {
          text: '(cases * 100)/population',
          value: 'ratioPopCases'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      formatedDate: 'confirmedUpdatedAt',
      cases: 'confirmedCases',
      locations: 'confirmedCountries'
    })
  }
}
</script>
