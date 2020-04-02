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
    state.cData = data
    const reducedOverview = []
    for (let index = 0; index < state.cData.length; index++) {
      const element = state.cData[index]
      if (element.state === undefined) {
        if (
          !state.cData.find(
            (l, i) => l.country === element.country && i !== index
          )
        ) {
          reducedOverview.push(element)
        }
      } else if (element.county === undefined) {
        if (
          !state.cData.find((l, i) => l.state === element.state && i !== index)
        ) {
          reducedOverview.push(element)
        }
      } else if (element.city === undefined) {
        if (
          !state.cData.find(
            (l, i) => l.county === element.county && i !== index
          )
        ) {
          reducedOverview.push(element)
        }
      } else {
        reducedOverview.push(element)
      }
    }
    state.reducedCData = reducedOverview
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
  async fetchCoronaData({ commit, dispatch }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/daily'
    )
    commit('setIsFetchingData', false)
    commit('setCornaData', response.data)
    commit('setReducedCornaData', response.data)
  },
  async fetchMetaData({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/meta'
    )
    commit('setIsFetchingData', false)
    commit('setMetaData', response.data)
  },
  async fetchDataSource({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/datasources'
    )
    commit('setIsFetchingData', false)
    commit('setDataSources', response.data)
  },
  async fetchTotalNumbers({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get(
      'https://data.corona-api.org/api/total'
    )
    commit('setIsFetchingData', false)
    commit('setTotalNumbers', response.data)
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchCoronaData')
    await dispatch('fetchMetaData')
    await dispatch('fetchDataSource')
    await dispatch('fetchTotalNumbers')
  }
}
