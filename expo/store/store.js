import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import backend from '../lib/backend'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ api: backend }))
)

export default store
