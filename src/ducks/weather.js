import {appName} from '../config' 
import {Record, OrderedMap} from 'immutable'

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false
})

const CityRecord = Record({
  name: null,
  weather: {}
})

export const moduleName = 'weather'

export const ADD_CITY = `${appName}/${moduleName}/ADD_CITY`
export const DELETE_CITY = `${appName}/${moduleName}/DELETE_CITY`

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

export function addCity(city) {
  return {
    type: ADD_CITY,
    payload: city
  }
}

export function deleteCity(city) {
  return {
    type: DELETE_CITY,
    payload: city
  }
}