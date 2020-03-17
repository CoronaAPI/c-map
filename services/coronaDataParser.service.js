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
        (result, current) => ({
          ...result,
          ...current,
          coordinates: {
            lat: String(
              parseFloat(result.coordinates.lat) +
                parseFloat(current.coordinates.lat)
            ),
            long: String(
              parseFloat(result.coordinates.long) +
                parseFloat(current.coordinates.long)
            )
          },
          latest: result.latest + current.latest
        }),
        {
          coordinates: {
            lat: '0',
            long: '0'
          },
          latest: 0
        }
      )
      countries.push({
        ...country,
        coordinates: {
          lat: String(
            parseFloat(country.coordinates.lat) /
              parseFloat(allProvinces.length)
          ),
          long: String(
            parseFloat(country.coordinates.long) /
              parseFloat(allProvinces.length)
          )
        }
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
    .sort((a, b) => b.latest - a.latest)
}
