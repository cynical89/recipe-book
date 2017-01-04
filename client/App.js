import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas/index'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

sagaMiddleware.run(rootSaga)

// Routes are all in a separate file
import Router from './router'

// Router's root element
ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('root')
)
