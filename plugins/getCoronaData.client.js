export default ({ store }) => {
  store.dispatch('fetchCoronaData')
  store.dispatch('fetchMetaData')
  store.dispatch('fetchDataSource')
  store.dispatch('fetchTotalNumbers')
}
