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
    return ''
  }
}

export const actions = {
  async fetchCoronaData({ commit }) {
    commit('setIsFetchingData', true)
    const response = await this.$axios.get('https://corona.ndo.dev/api/daily')
    commit('setIsFetchingData', false)
    commit('setCornaData', response.data)
  }
}
