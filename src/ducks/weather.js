import {put, takeEvery, all} from 'redux-saga/effects'
import {appName} from '../config' 
import {Record, OrderedMap} from 'immutable'
import {fetchWeather} from './api';

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

export function addCity({name}) {
  return {
    type: FETCH_WEATHER_REQUEST,
    payload: {name}
  }
}

export function deleteCity(name) {
  return {
    type: DELETE_CITY,
    payload: name
  }
}

function * fetchWeatherSaga(action) {
  const {name} = action.payload
  try {
    const weather = yield fetchWeather(name)

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

export const saga = function * () {
  yield all([
    takeEvery(FETCH_WEATHER_REQUEST, fetchWeatherSaga),
  ])
}