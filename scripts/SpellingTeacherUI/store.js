/* global NODE_ENV */
/* eslint global-require: "off", import/no-dynamic-require: "off" */

import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { reducerNames, combinedReducers } from './reducers'
import {
  getInitState as getSettingsInitState,
  serializeState as serializeSettingsState,
} from './ducks/settings'
import {
  getInitState as getDictionaryInitState,
  serializeState as serializeDictionaryState,
} from './ducks/dictionary'
import saga from './redux/saga'

import api from './middlewares/api'

export function makeStore(data) {
  const initState = deserialize(data)
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = compose(getMiddleware(sagaMiddleware))
  const store = createStore(combinedReducers, initState, middlewares)

  sagaMiddleware.run(saga)

  if (NODE_ENV === 'development') {
    window.store = store
  }

  return store
}

function getMiddleware(sagaMiddleware) {
  if (NODE_ENV === 'development') {
    return applyMiddleware(api, sagaMiddleware, createLogger())
  }

  return applyMiddleware(api, sagaMiddleware)
}

function deserialize(data = {}) {
  const reducerStates = reducerNames.map(reducerName => {
    const { getInitState } = require(`./reducers/${reducerName}`)
    const state = getInitState(data[reducerName] || {})

    return {reducerName, state}
  })

  reducerStates.push({
    reducerName: 'settings',
    state: getSettingsInitState(data.settings),
  })

  reducerStates.push({
    reducerName: 'dictionary',
    state: getDictionaryInitState(data.dictionary),
  })

  const state = reducerStates.reduce((res, item) => ({
    ...res,
    [item.reducerName]: item.state,
  }), {})

  return state
}

export function serializeAppState(state) {
  const reducerData = reducerNames.map(reducerName => {
    const { serializeState } = require(`./reducers/${reducerName}`)
    const data = serializeState(state[reducerName])

    return {reducerName, data}
  })

  reducerData.push({
    reducerName: 'settings',
    data: serializeSettingsState(state.settings)
  })

  reducerData.push({
    reducerName: 'dictionary',
    data: serializeDictionaryState(state.dictionary)
  })

  const data = reducerData.reduce((res, item) => ({
    ...res,
    [item.reducerName]: item.data,
  }), {})

  return data
}
