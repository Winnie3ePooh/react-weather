import axios from "axios";

export function getCitiesList(cityName) {
  return axios.get(`/api/v1/citiesList`);
}

export function getCitySuggestion(cityName) {
  return axios.get(`/api/v1/citiesVariants?city=${cityName}`);
}

export function getTodaysCityWeather(cityName, term) {
  return axios.get(`/api/v1/todaysWeather?city=${cityName}&term=${term}`);
}
