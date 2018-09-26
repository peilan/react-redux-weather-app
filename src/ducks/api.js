import {apiKey} from '../config'

const link = 'http://api.openweathermap.org/data/2.5'

export const fetchWeatherByName = name => {
  return fetch(`${link}/weather?q=${name}&appid=${apiKey}`)
      .then(resp => resp.json())
}

export const fetchWeatherByCoordinates = ({lat, lng}) => {
  return fetch(`${link}/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`)
    .then(resp => resp.json())
}

export const fetchWeatherByIds= (ids) => {
  const idsAsString = ids.join(',')

  return fetch(`${link}/group?id=${idsAsString}&appid=${apiKey}`)
    .then(resp => resp.json())
}