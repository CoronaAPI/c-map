export default ({ store }) => {
  /* const dataDate = new Date(store.state.cData.confirmed.last_updated)
  const now = new Date(Date.now())
  const timeDiff = (now - dataDate) / 36e5
  if (timeDiff > 1) {
    store.dispatch('fetchCoronaData')
  } */
  //  TODO check if data is older than 1 day, if so fetch data
  store.dispatch('fetchCoronaData')
}
