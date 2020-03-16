export default function({ store }) {
  // Check if there is corona data
  if (!store.state.cData) {
    return store.dispatch('fetchCoronaData')
  }
}
