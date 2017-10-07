import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducer from './reducers'

import {
  getInitState as getInternalInitState,
  serializeState as serializeInternalState,
} from './reducers/internal'

import {
  getInitState as getFormInitState,
  serializeState as serializeFormState,
} from './reducers/form'

import api from './middlewares/api'

export function makeStore(data) {
  const initState = deserialize(data)
  const middlewares = compose(getMiddleware())
  const store = createStore(reducer, initState, middlewares)

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

function deserialize(data) {
  const {
    internal={},
    form={},
  } = data || {}

  return {
    internal: getInternalInitState(internal),
    form: getFormInitState(form),
  }
}

export function serializeAppState(state) {
  return {
    internal: serializeInternalState(state.internal),
    form: serializeFormState(state.form),
  }
}
