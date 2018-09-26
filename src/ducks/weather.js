import {put, takeEvery, all} from 'redux-saga/effects'
import {appName} from '../config' 
import {Record, OrderedMap} from 'immutable'
import {fetchWeatherByName, fetchWeatherByCoordinates} from './api';
import {getCurrentPosition} from './utils'

export const moduleName = 'weather'

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false
})

const CityRecord = Record({
  name: null,
  weather: {}
})

export const DELETE_CITY = `${appName}/${moduleName}/DELETE_CITY`
export const FETCH_WEATHER_REQUEST = `${appName}/${moduleName}/FETCH_WEATHER_REQUEST`
export const FETCH_WEATHER_SUCCESS = `${appName}/${moduleName}/FETCH_WEATHER_SUCCESS`
export const GET_LOCATION_START = `${appName}/${moduleName}/GET_LOCATION_START`
export const GET_LOCATION_END = `${appName}/${moduleName}/GET_LOCATION_END`

export const citiesSelector = state => state[moduleName].entities.valueSeq().toJS()

export default function reducer(state = new ReducerState(), action) {
  const {type, payload} = action

  switch (type) {
    case FETCH_WEATHER_REQUEST:
      return state.set('loading', true)
    case FETCH_WEATHER_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['entities', payload.name], new CityRecord(payload))
    case DELETE_CITY:
      return state.set('entities', state.get('entities').delete(payload))
    default:
      return state
  } 
}

export const addCity = ({name}) => {
  return {
    type: FETCH_WEATHER_REQUEST,
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

function * fetchWeatherSaga(action) {
  const {name} = action.payload
  try {
    const weather = yield fetchWeatherByName(name)

    yield put({
      type: FETCH_WEATHER_SUCCESS,
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
      type: FETCH_WEATHER_SUCCESS,
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

export const saga = function * () {
  yield all([
    takeEvery(FETCH_WEATHER_REQUEST, fetchWeatherSaga),
    takeEvery(GET_LOCATION_START, getLocationSaga)
  ])
}