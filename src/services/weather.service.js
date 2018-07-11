import axios from 'axios'

export async function getCitiesList (cityName) {
  const res = await axios.get(`/api/v1/citiesList`)
  return res.data
}

export async function getCitySuggestion (cityName) {
  const res = await axios.get(`/api/v1/citiesVariants?city=${cityName}`)
  return res.data
}

export async function getTodaysCityWeather (cityName, term) {
  const res = await axios.get(`/api/v1/todaysWeather?city=${cityName}&term=${term}`)
  return res.data
}
