import {put, takeEvery, all} from 'redux-saga/effects'
import {appName} from '../config' 
import {Record, OrderedMap} from 'immutable'
import {fetchWeatherByName, fetchWeatherByCoordinates, fetchWeatherByIds} from './api';
import {getCurrentPosition} from './utils'
import {getCities, saveCity} from './localStorage'

export const moduleName = 'weather'


/**
 * Models
 */
const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false
})
// TODO: more names...
const CityRecord = Record({
  name: null,
  weather: {}
})


/**
 * Constants
 */
export const DELETE_CITY = `${appName}/${moduleName}/DELETE_CITY`
export const FETCH_WEATHER_CITY_REQUEST = `${appName}/${moduleName}/FETCH_WEATHER_CITY_REQUEST`
export const FETCH_WEATHER_CITY_SUCCESS = `${appName}/${moduleName}/FETCH_WEATHER_CITY_SUCCESS`
export const FETCH_WEATHER_CITIES_REQUEST = `${appName}/${moduleName}/FETCH_WEATHER_CITIES_REQUEST`
export const FETCH_WEATHER_CITIES_SUCCESS = `${appName}/${moduleName}/FETCH_WEATHER_CITIES_SUCCESS`
export const GET_LOCATION_START = `${appName}/${moduleName}/GET_LOCATION_START`
export const GET_LOCATION_END = `${appName}/${moduleName}/GET_LOCATION_END`
export const GET_CITIES_FROM_LOCAL_STORAGE = `${appName}/${moduleName}/GET_CITIES_FROM_LOCAL_STORAGE`


/**
 * Selectors
 */
export const citiesSelector = state => state[moduleName].entities.valueSeq().toJS()
export const loadingSelector = state => state[moduleName].loading 


/**
 * Reducer
 */
export default function reducer(state = new ReducerState(), action) {
  const {type, payload} = action

  switch (type) {
    case FETCH_WEATHER_CITIES_REQUEST:
    case FETCH_WEATHER_CITY_REQUEST:
      return state.set('loading', true)
    case FETCH_WEATHER_CITY_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['entities', payload.name], new CityRecord(payload))
    case FETCH_WEATHER_CITIES_SUCCESS:
      return state
        .set('loading', false)
        .set('entities', new OrderedMap(payload))
    case DELETE_CITY:
      return state.set('entities', state.get('entities').delete(payload))
    default:
      return state
  } 
}


/**
 * Actions
 */
export const addCity = ({name}) => {
  return {
    type: FETCH_WEATHER_CITY_REQUEST,
    payload: {name}
  }
}

export const deleteCity = (name) => {
  return {
    type: DELETE_CITY,
    payload: name
  }
}

export const getWeatherByCurrentLocation = () => {
  return {
    type: GET_LOCATION_START
  }
} 

export const getFromLocalStorage = () => {
  return {
    type: GET_CITIES_FROM_LOCAL_STORAGE
  }
}


/**
 * Sagas
 */
function * fetchWeatherSaga(action) {
  const {name} = action.payload
  try {
    const weather = yield fetchWeatherByName(name)

    saveCity(weather.id)

    yield put({
      type: FETCH_WEATHER_CITY_SUCCESS,
      payload: {
        weather,
        name
      }
    })
  }
  catch (e) {
    console.error(e)
  }
}

function * getLocationSaga(action) {
  try {
    const location = yield getCurrentPosition()
    const weather = yield fetchWeatherByCoordinates(location)
    
    yield put({
      type: FETCH_WEATHER_CITY_SUCCESS,
      payload: {
        weather,
        name: weather.name
      }
    })
  }
  catch (e) {
    console.error(e)
  }
}

function * getCitiesFromLocalStorageSaga(action) {
  try {
    const cities = getCities()
    yield put({
      type: FETCH_WEATHER_CITIES_REQUEST
    })

    const weathers = yield fetchWeatherByIds(cities)
    const payload = weathers.list.reduce((result, weather) => {
      // TODO: more names...
      result[weather.name] = {
        name: weather.name,
        weather
      }
      
      return result
    }, {})

    yield put({
      type: FETCH_WEATHER_CITIES_SUCCESS,
      payload
    })
  }
  catch (e) {
    console.error(e)
  }
}

export const saga = function * () {
  yield all([
    takeEvery(FETCH_WEATHER_CITY_REQUEST, fetchWeatherSaga),
    takeEvery(GET_LOCATION_START, getLocationSaga),
    takeEvery(GET_CITIES_FROM_LOCAL_STORAGE, getCitiesFromLocalStorageSaga)
  ])
}