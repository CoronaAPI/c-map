import population from '~/data/world-population.json'

export function reduceProvincesToCountries(locations) {
  const countries = []
  const alreadyMapped = []
  for (const province of locations) {
    if (!alreadyMapped.includes(province.country_code)) {
      const allProvinces = locations.filter(
        (p) => p.country_code === province.country_code
      )
      const country = allProvinces.reduce(
        (result, current) => {
          return {
            ...current,
            ...result,
            latest: result.latest + current.latest
          }
        },
        {
          latest: 0
        }
      )
      const provinceMostCases = allProvinces.reduce((prev, current) =>
        prev.latest > current.latest ? prev : current
      )
      countries.push({
        ...country,
        coordinates: provinceMostCases.coordinates
      })
      alreadyMapped.push(country.country_code)
    }
  }
  return countries
    .filter((l) => {
      return population.find((p) => p.code === l.country_code)
    })
    .map((l) => {
      const pop = population.find((p) => p.code === l.country_code)
      return {
        ...l,
        population: pop.z * 1000,
        ratioPopCases: (l.latest * 100) / (pop.z * 1000)
      }
    })
}

export function addDailyIncrease(locations) {
  const date = new Date(Date.now() - 48 * 3600 * 1000)
  return locations
    .map((l) => {
      const lastIncrease =
        l.history[
          `${date.getMonth() + 1}/${date.getDate()}/${date
            .getFullYear()
            .toString()
            .slice(-2)}`
        ]
      return {
        ...l,
        increaseToday: l.latest - lastIncrease
      }
    })
    .sort((a, b) => b.latest - a.latest)
}
