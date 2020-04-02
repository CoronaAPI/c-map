import { reduceData } from '~/services/coronaDataParser'

export const state = () => ({
  cData: undefined,
  reducedCData: undefined,
  metaData: undefined,
  totalNumbers: undefined,
  dataSources: [],
  isFetchingData: false
})

export const mutations = {
  setCornaData(state, data) {
    state.cData = data
  },
  setReducedCornaData(state, data) {
    state.reducedCData = data
  },
  setMetaData(state, data) {
    state.metaData = data
  },
  setDataSources(state, data) {
    state.dataSources = data
  },
  setTotalNumbers(state, data) {
    state.totalNumbers = data
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
  getDataSources(state) {
    return state.dataSources
  },
  confirmedUpdatedAt(state) {
    return state.metaData ? state.metaData.lastUpdate : ''
  },
  reducedCoronaData(state) {
    return state.reducedCData
  },
  getTotalNumbers(state) {
    return state.totalNumbers
  }
}

export const actions = {
  async fetchCoronaData({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/daily'
    )
    commit('setCornaData', response.data)
    commit('setReducedCornaData', reduceData(response.data))
    commit('setIsFetchingData', false)
  },
  async fetchMetaData({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/meta'
    )
    commit('setMetaData', response.data)
    commit('setIsFetchingData', false)
  },
  async fetchDataSource({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/datasources'
    )
    commit('setDataSources', response.data)
    commit('setIsFetchingData', false)
  },
  async fetchTotalNumbers({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/total'
    )
    commit('setTotalNumbers', response.data)
    commit('setIsFetchingData', false)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchCoronaData')
    await dispatch('fetchMetaData')
    await dispatch('fetchDataSource')
    await dispatch('fetchTotalNumbers')
  }
}
