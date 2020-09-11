import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from '../reducers/index'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

const configStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      )
      : applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default configStore