export function reduceData(cData) {
  const reducedOverview = []
  for (let index = 0; index < cData.length; index++) {
    const element = cData[index]
    if (element.state === undefined) {
      if (!cData.find((l, i) => l.country === element.country && i !== index)) {
        reducedOverview.push(element)
      }
    } else if (element.county === undefined) {
      if (!cData.find((l, i) => l.state === element.state && i !== index)) {
        reducedOverview.push(element)
      }
    } else if (element.city === undefined) {
      if (!cData.find((l, i) => l.county === element.county && i !== index)) {
        reducedOverview.push(element)
      }
    } else {
      reducedOverview.push(element)
    }
  }
  return reducedOverview
}
