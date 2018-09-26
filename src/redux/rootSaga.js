import {saga as weatherSaga} from '../ducks/weather'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
    yield all([
      weatherSaga()
    ])
}