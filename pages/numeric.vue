<template>
  <v-layout class="ma-5" column justify-center>
    <v-alert dense type="info">
      <strong>Last update:</strong>&nbsp;
      {{ formatedDate }}
    </v-alert>
    <v-card>
      <v-switch
        v-model="showProvinces"
        class="ma-2"
        label="Show numbers for provinces"
      ></v-switch>
    </v-card>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="getTableHeader"
      :items="getTableData"
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
      showProvinces: false,
      headers: [
        { text: 'country', value: 'country' },
        { text: 'cases', value: 'latest' },
        { text: 'increase', value: 'increaseToday' },
        { text: 'population', value: 'population' },
        {
          text: '(cases * 100)/population',
          value: 'ratioPopCases'
        }
      ],
      headersProvinces: [
        { text: 'country', value: 'country' },
        { text: 'province', value: 'province' },
        { text: 'cases', value: 'latest' },
        { text: 'increase', value: 'increaseToday' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      formatedDate: 'confirmedUpdatedAt',
      cases: 'confirmedCases',
      countries: 'confirmedCountries',
      provinces: 'confirmedProvinces'
    }),
    getTableData() {
      if (this.showProvinces) {
        return this.provinces
      }
      return this.countries
    },
    getTableHeader() {
      if (this.showProvinces) {
        return this.headersProvinces
      }
      return this.headers
    }
  }
}
</script>
