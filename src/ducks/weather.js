import {appName} from '../config' 

export const moduleName = 'weather'

export const ADD_CITY = `${appName}/${moduleName}/ADD_CITY`
export const DELETE_CITY = `${appName}/${moduleName}/DELETE_CITY`

export const citiesSelector = state => state[moduleName]

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_CITY:
      return [action.payload, ...state]
    case DELETE_CITY:
      return state.filter(x => x !== action.payload)
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