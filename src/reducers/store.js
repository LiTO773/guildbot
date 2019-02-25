import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import readyReducer from './readyReducer'
import roomsReducer from './roomsReducer'
import pollsReducer from './pollsReducer'

const rootReducer = combineReducers({
  ready: readyReducer,
  rooms: roomsReducer,
  polls: pollsReducer
})

const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export default store
