const maxCitiesCount = 3

export const saveCity = id => {
  if (localStorage.length === maxCitiesCount) {
    const firstCityKey = localStorage.key(0)
    localStorage.removeItem(firstCityKey)
  }
  localStorage.setItem(id, '')
}

export const getCities = () => {
  return Object.keys(localStorage)
}