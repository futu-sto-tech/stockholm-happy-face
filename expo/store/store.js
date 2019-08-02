import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import backend from '../lib/backend'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ api: backend })))
)

export default store
