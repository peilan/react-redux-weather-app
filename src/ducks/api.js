import {apiKey} from '../config'

export function fetchWeather(name) {
  const link = 'http://api.openweathermap.org/data/2.5/weather'
  return fetch(`${link}?q=${name}&appid=${apiKey}`)
      .then(resp => resp.json())
}