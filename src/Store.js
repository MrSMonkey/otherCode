import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const reduxRouterMiddleware = routerMiddleware(history)
const logMiddleware = store => next => action => {
  let result = next(action)
  // console.log('next state', store.getState())
  return result
}
const devMiddlewares = [logMiddleware]
let middlewares = [reduxRouterMiddleware, sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares = middlewares.concat(devMiddlewares)
}

const enhancers = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(
  connectRouter(history)(reducers),
  /* preloadedState, */ enhancers
)

sagaMiddleware.run(rootSaga)
/* enable hot module reload */
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(connectRouter(history)(reducers))
  )
}

export { history }
export default store
