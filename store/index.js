export const state = () => ({
  cData: undefined,
  metaData: undefined,
  dataSources: [],
  isFetchingData: false
})

export const mutations = {
  setCornaData(state, data) {
    state.cData = data
  },
  setMetaData(state, data) {
    state.metaData = data
  },
  setDataSources(state, data) {
    state.dataSources = data
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
  }
}

export const actions = {
  async fetchCoronaData({ commit, dispatch }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get('https://corona.ndo.dev/api/daily')
    commit('setIsFetchingData', false)
    commit('setCornaData', response.data)
  },
  async fetchMetaData({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get('https://corona.ndo.dev/meta')
    commit('setIsFetchingData', false)
    commit('setMetaData', response.data)
  },
  async fetchDataSource({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://corona.ndo.dev/api/datasources'
    )
    commit('setIsFetchingData', false)
    commit('setDataSources', response.data)
  }
}
