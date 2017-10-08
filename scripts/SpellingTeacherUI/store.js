/* global NODE_ENV */
/* eslint global-require: "off", import/no-dynamic-require: "off" */

import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import { reducerNames, combinedReducers } from './reducers'

import api from './middlewares/api'

export function makeStore(data) {
  const initState = deserialize(data)
  const middlewares = compose(getMiddleware())
  const store = createStore(combinedReducers, initState, middlewares)

  if (NODE_ENV === 'development') {
    window.store = store
  }

  return store
}

function getMiddleware() {
  if (NODE_ENV === 'development') {
    return applyMiddleware(api, createLogger())
  }

  return applyMiddleware(api)
}

function deserialize(data = {}) {
  const reducerStates = reducerNames.map(reducerName => {
    const { getInitState } = require(`./reducers/${reducerName}`)
    const state = getInitState(data[reducerName] || {})

    return {reducerName, state}
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

  const data = reducerData.reduce((res, item) => ({
    ...res,
    [item.reducerName]: item.data,
  }), {})

  return data
}
