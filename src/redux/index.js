import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const enchancer = applyMiddleware(sagaMiddleware, logger)

const store = createStore(reducer, enchancer)

sagaMiddleware.run(rootSaga)

window.store = store

export default store