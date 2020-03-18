import {
  reduceProvincesToCountries,
  addDailyIncrease
} from '~/services/coronaDataParser.service'

export const state = () => ({
  cData: undefined,
  isFetchingData: false
})

export const mutations = {
  setCornaData(state, data) {
    state.cData = data
  },
  setIsFetchingData(state, isFecthing) {
    state.isFetchingData = isFecthing
  }
}

export const getters = {
  isFetchingData(state) {
    return state.isFetchingData
  },
  getCoronaData(state) {
    return state.cData
  },
  confirmedUpdatedAt(state) {
    return new Date(state.cData.confirmed.last_updated).toLocaleDateString(
      'en-EN',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    )
  },
  confirmedCases(state) {
    return state.cData.confirmed.latest
  },
  confirmedProvinces(state) {
    return addDailyIncrease(state.cData.confirmed.locations)
  },
  recoveredProvinces(state) {
    return addDailyIncrease(state.cData.recovered.locations)
  },
  deathsProvinces(state) {
    return addDailyIncrease(state.cData.deaths.locations)
  },
  confirmedCountries(state, getters) {
    return reduceProvincesToCountries(getters.confirmedProvinces)
  },
  recoveredCountries(state, getters) {
    return reduceProvincesToCountries(getters.recoveredProvinces)
  },
  deathsCountries(state, getters) {
    return reduceProvincesToCountries(getters.deathsProvinces)
  }
}

export const actions = {
  async fetchCoronaData({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://coronavirus-tracker-api.herokuapp.com/all'
    )
    commit('setIsFetchingData', false)
    commit('setCornaData', response.data)
  }
}
