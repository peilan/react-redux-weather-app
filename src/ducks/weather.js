import {appName} from '../config' 
import {Record, OrderedMap} from 'immutable'
import { fetchWeather } from './api';

export const moduleName = 'weather'

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false
})

const CityRecord = Record({
  name: null,
  weather: {}
})

export const ADD_CITY = `${appName}/${moduleName}/ADD_CITY`
export const DELETE_CITY = `${appName}/${moduleName}/DELETE_CITY`
export const FETCH_WEATHER_REQUEST = `${appName}/${moduleName}/FETCH_WEATHER_REQUEST`
export const FETCH_WEATHER_SUCCESS = `${appName}/${moduleName}/FETCH_WEATHER_SUCCESS`

export const citiesSelector = state => state[moduleName].entities.valueSeq().toJS()

export default function reducer(state = new ReducerState(), action) {
  const {type, payload} = action

  switch (type) {
    case ADD_CITY:
      return state.setIn(['entities', payload.name], new CityRecord(payload))
    case DELETE_CITY:
      return state.set('entities', state.get('entities').delete(payload))
    default:
      return state
  } 
}

export function addCity({name}) {
  return dispatch => {
    fetchWeather(name).then(weather => {
      dispatch({
        type: ADD_CITY,
        payload: {
          name,
          weather
        }
      })
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export function deleteCity(name) {
  return {
    type: DELETE_CITY,
    payload: name
  }
}