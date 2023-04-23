import { createStore, applyMiddleware, compose } from 'redux'
import { reducer, initialState} from './reducers'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
const middleware = []

// For Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware, loggerMiddleware))
  )
}