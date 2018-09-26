import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const enchancer = applyMiddleware(thunk, logger)

const store = createStore(reducer, enchancer)

window.store = store

export default store