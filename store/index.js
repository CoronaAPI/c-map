export const state = () => ({
  cData: undefined,
  metaData: undefined,
  isFetchingData: false
})

export const mutations = {
  setCornaData(state, data) {
    state.cData = data
  },
  setMetaData(state, data) {
    state.metaData = data
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
    return state.metaData ? state.metaData.lastUpdate : ''
  }
}

export const actions = {
  async fetchCoronaData({ commit, dispatch }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get('https://corona.ndo.dev/api/daily')
    commit('setIsFetchingData', false)
    commit('setCornaData', response.data)
    dispatch('fetchMetaData')
  },
  async fetchMetaData({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get('https://corona.ndo.dev/meta')
    commit('setIsFetchingData', false)
    commit('setMetaData', response.data)
  }
}
