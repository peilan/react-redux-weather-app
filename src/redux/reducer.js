import {combineReducers} from 'redux'
import weatherReducer, {moduleName as weatherModule} from '../ducks/weather'

export default combineReducers({
    [weatherModule]: weatherReducer
})