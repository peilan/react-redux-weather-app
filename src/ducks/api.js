import {apiKey} from '../config'

const link = 'http://api.openweathermap.org/data/2.5/weather'

export const fetchWeatherByName = name => {
  return fetch(`${link}?q=${name}&appid=${apiKey}`)
      .then(resp => resp.json())
}

export const fetchWeatherByCoordinates = ({lat, lng}) => {
  return fetch(`${link}?lat=${lat}&lon=${lng}&appid=${apiKey}`)
    .then(resp => resp.json())
}