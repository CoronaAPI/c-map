export function reduceData(cData) {
  let reducedOverview = []
  const countries = []

  const onlyCounties = cData.filter((l) => l.county && !l.city)
  const onlyStates = cData.filter((l) => l.state && !l.county && !l.city)
  const onlyCountries = cData.filter(
    (l) => l.country && !l.state && !l.county && !l.city
  )

  onlyCounties.forEach((c) => {
    if (!countries.includes(c.country)) {
      const allCountiesOfCountry = onlyCounties.filter(
        (county) => county.country === c.country
      )
      reducedOverview = reducedOverview.concat(allCountiesOfCountry)
      countries.push(c.country)
    }
  })

  onlyStates.forEach((s) => {
    if (!countries.includes(s.country)) {
      const allStatesOfCountry = onlyStates.filter(
        (state) => state.country === s.country
      )
      reducedOverview = reducedOverview.concat(allStatesOfCountry)
      countries.push(s.country)
    }
  })

  onlyCountries.forEach((c) => {
    if (!countries.includes(c.country)) {
      const allCountries = onlyCountries.filter(
        (country) => country.country === c.country
      )
      reducedOverview = reducedOverview.concat(allCountries)
      countries.push(c.country)
    }
  })

  return reducedOverview
}
